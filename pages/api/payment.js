import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { products } = req.body;
    const { orderId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: product.images, // Asumiendo que esto es un array de URLs
          },
          unit_amount: Math.round(product.price * 100), // Asegúrate que el precio esté en centavos
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: `https://royer.store/success?session_id={CHECKOUT_SESSION_ID}&orderid=${orderId}`,
      cancel_url: `https://royer.store/`,
    });

    return res.status(200).json(session.url);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
