import Stripe from "stripe";
import {
  createPurchase,
  updateUserSubscription,
  updateUserSubscriptionByCustomer,
} from "@/lib/db";

export const runtime = "nodejs";

const planByPrice = {
  [process.env.STRIPE_STANDARD_PRICE_ID]: "standard",
  [process.env.STRIPE_PREMIUM_PRICE_ID]: "premium",
};

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  if (
    !process.env.STRIPE_SECRET_KEY ||
    !process.env.STRIPE_WEBHOOK_SECRET ||
    !signature
  ) {
    return Response.json(
      { error: "Faltan credenciales o firma de Stripe." },
      { status: 400 }
    );
  }

  let event;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook de Stripe no valido:", error.message);
    return Response.json({ error: "Firma no valida." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email || "sin email";
    const amount = session.amount_total || 0;
    const currency = (session.currency || "eur").toUpperCase();

    console.log(
      `Pago completado: email=${email}, importe=${amount / 100} ${currency}`
    );

    if (session.mode === "subscription" && session.metadata?.userId) {
      updateUserSubscription({
        userId: session.metadata.userId,
        customerId:
          typeof session.customer === "string" ? session.customer : session.customer?.id,
        subscriptionId:
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id,
        status: "active",
        plan: session.metadata.plan || "standard",
      });
    }

    if (session.mode === "payment") {
      createPurchase({
        userId: session.metadata?.userId || null,
        productId: session.metadata?.productId || "astralya-digital",
        stripeSessionId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id,
        customerEmail: session.customer_details?.email || session.customer_email,
        amountTotal: session.amount_total || 0,
        currency: session.currency || "eur",
        status: session.payment_status || "paid",
      });
    }
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object;
    const priceId = subscription.items?.data?.[0]?.price?.id;
    const plan =
      event.type === "customer.subscription.deleted"
        ? "client"
        : planByPrice[priceId] || subscription.metadata?.plan || "client";

    updateUserSubscriptionByCustomer({
      customerId:
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer?.id,
      subscriptionId: subscription.id,
      status: subscription.status,
      plan,
    });
  }

  return Response.json({ received: true });