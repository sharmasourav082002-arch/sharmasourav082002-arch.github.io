// server/server.js
require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
// Note: we will use express.json() for normal routes, but raw body for webhook below
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Simple health route
app.get('/', (req, res) => res.send('Messo Stripe server running'));

// Example: create checkout session endpoint used by frontend
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items = [], customer_email = '', currency = 'inr' } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'Cart is empty' });

    // Example products map — update / expand as needed
    const PRODUCTS = {
      "p1": { name: "Wireless Headphones", amount_inr: 19900, amount_gbp: 19900 }, // amounts in paise
      "p2": { name: "Cotton Shirt", amount_inr: 18000, amount_gbp: 18000 }
    };

    const line_items = items.map(it => {
      const p = PRODUCTS[it.id];
      if (!p) throw new Error('Invalid product id: ' + it.id);
      const unit_amount = (currency === 'gbp') ? p.amount_gbp : p.amount_inr;
      return {
        price_data: {
          currency: currency,
          product_data: { name: p.name },
          unit_amount: unit_amount
        },
        quantity: it.qty || 1
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: customer_email || undefined,
      shipping_address_collection: { allowed_countries: ['IN','GB'] },
      success_url: process.env.SUCCESS_URL + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: process.env.CANCEL_URL
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Create session error', err);
    res.status(500).json({ error: err.message });
  }
});

/*
  Webhook: use raw body parser for correct signature verification.
  Stripe requires the raw body when verifying the signature.
*/
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('✅ checkout.session.completed', session.id, session.customer_email || session.customer);
    // Save order to file (demo only)
    try {
      const ordersFile = path.join(__dirname, 'orders.json');
      const orders = fs.existsSync(ordersFile) ? JSON.parse(fs.readFileSync(ordersFile)) : [];
      orders.push({
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        email: session.customer_email,
        created: new Date().toISOString()
      });
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
      console.log('Order saved', session.id);
    } catch (e) {
      console.error('Failed to save order', e);
    }
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    console.log('💳 payment_intent.succeeded', pi.id, 'amount:', pi.amount);
    // optional: update DB or send email
  }

  // Acknowledge receipt of the event
  res.json({ received: true });
});

// Start server (Render provides PORT)
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
