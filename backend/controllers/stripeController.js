const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe checkout session
// @route   POST /api/create-checkout-session
// @access  Private
const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }));

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${clientUrl}/checkout-success`,
      cancel_url: `${clientUrl}/checkout-cancel`
    });

    return res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Stripe error' });
  }
};

module.exports = {
  createCheckoutSession
};

