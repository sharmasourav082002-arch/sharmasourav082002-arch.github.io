// server/server.js
require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Allow CORS from your frontend (replace with your GitHub Pages domain)
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// NOTE: Use STRIPE_SECRET_KEY in Render env (sk_live_... or sk_test_...)
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Serve any static frontend if you put it inside /public (optional)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Simple PRODUCTS map (example). Update or extend as needed.
const PRODUCTS = {
  "p001": { name: "Wireless Headphones", amount_inr: 19900 },
  "p002": { name: "Cotton Shirt", amount_inr: 18000 },
  "p003": { name: "Phone Case", amount_inr: 12900 },
  "p004": { name: "Travel Backpack", amount_inr: 99900 },
  "p005": { name: "LED Desk Lamp", amount_inr: 34900 }
  // add more products keyed by id (p001 etc.)
};

// Basic health
app.get('/', (req, res) => res.send('Backend running'));

// Endpoint: create checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items = [], currency = 'inr', customer_email } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: 'Cart empty' });

    // build line items
    const line_items = items.map(it => {
      const p = PRODUCTS[it.id];
      if (!p) throw new Error('Invalid product id: ' + it.id);
      const unit_amount = p.amount_inr; // in paise
      return {
        price_data: {
          currency,
          product_data: { name: p.name },
          unit_amount
        },
        quantity: it.qty || 1
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: customer_email || undefined,
      success_url: (process.env.SUCCESS_URL || 'https://example.com/success') + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: process.env.CANCEL_URL || 'https://example.com/cancel'
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Webhook endpoint - raw body required
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    if (!webhookSecret) {
      console.warn('No STRIPE_WEBHOOK_SECRET configured - skipping signature verification');
      event = JSON.parse(req.body.toString());
    } else {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('✅ checkout.session.completed', session.id);
      // Save order to orders.json (append)
      try {
        const ordersFile = path.join(__dirname, 'orders.json');
        const orders = fs.existsSync(ordersFile) ? JSON.parse(fs.readFileSync(ordersFile)) : [];
        orders.push({
          id: session.id,
          email: session.customer_email || null,
          amount_total: session.amount_total || null,
          currency: session.currency || null,
          created: new Date().toISOString()
        });
        fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
      } catch (e) {
        console.error('Failed to persist order', e);
      }
      break;
    }
    case 'payment_intent.succeeded': {
      const pi = event.data.object;
      console.log('💳 payment_intent.succeeded', pi.id, 'amount:', pi.amount);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Debug: list saved orders
app.get('/orders', (req, res) => {
  const ordersFile = path.join(__dirname, 'orders.json');
  if (!fs.existsSync(ordersFile)) return res.json([]);
  res.json(JSON.parse(fs.readFileSync(ordersFile)));
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
