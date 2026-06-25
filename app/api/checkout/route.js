export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: "Faltan variables de entorno de Stripe." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const sala = formData.get("sala") || "Escape Room";
  const plan = formData.get("plan") || "standard";
  const precios = {
    standard: process.env.STRIPE_STANDARD_PRICE_ID || process.env.STRIPE_PRICE_ID,
    premium: process.env.STRIPE_PREMIUM_PRICE_ID || process.env.STRIPE_PRICE_ID,
  };
  const priceId = precios[plan];

  if (!priceId) {
    return Response.json(
      { error: `Falta el precio de Stripe para el plan ${plan}.` },
      { status: 500 }
    );
  }

  const origin = request.headers.get("origin") || "http://localhost:3000";
  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: `${origin}/?pago=ok`,
    cancel_url: `${origin}/?pago=cancelado`,
    "metadata[sala]": sala,
    "metadata[plan]": plan,
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const session = await response.json();

  if (!response.ok) {
    return Response.json(
      { error: session.error?.message || "No se pudo crear el checkout." },
      { status: response.status }
    );
  }

  return Response.redirect(session.url, 303);
}
