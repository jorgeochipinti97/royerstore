// pages/api/verifyPayment.js

import Stripe from "stripe";

export default async function handler(req, res) {
  // Asegúrate de usar tu clave secreta de Stripe aquí
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY
  );

  if (req.method === "POST") {
    const { session_id } = req.body; // Recibe el session_id enviado desde el cliente

    if (!session_id) {
      return res.status(400).json({ error: "session_id es requerido" });
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);

      // Aquí, simplemente verificamos si el estado de pago es 'paid'
      const isPaymentApproved = session.payment_status === "paid";

      // Devuelve solo el estado del pago como un booleano
      res.status(200).json({ success: true, isPaymentApproved });
    } catch (error) {
      console.error("Stripe error:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Método HTTP no soportado
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} No Permitido`);
  }
}
