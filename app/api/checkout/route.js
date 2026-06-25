export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
    return Response.json(
      { error: "Faltan variables de entorno de Stripe." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const nombre = formData.get("nombre");
  const origin = request.headers.get("origin") || "http://localhost:3000";
  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][price]": process.env.STRIPE_PRICE_ID,
    "line_items[0][quantity]": "1",
    success_url: `${origin}/?pago=ok`,
    cancel_url: `${origin}/?pago=cancelado`,
    "metadata[sala]": nombre || "Escape Room",
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
