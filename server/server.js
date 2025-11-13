/**
 * server.js
 * Simple Node/Express server for Stripe Checkout + webhook
 * - Creates Checkout Session at POST /create-checkout-session
 * - Receives Stripe webhook at POST /webhook (verifies signature)
 * - Persists simple order record to server/orders.json (demo only)
 *
 * IMPORTANT: Do not commit real secret keys to GitHub.
 * Use environment variables (Render / Heroku / Vercel).
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // for JSON bodies

// Read secret from env
const stripeSecret = process.env.STRIPE_SECRET_KEY;
if(!stripeSecret) {
  console.warn('⚠️ STRIPE_SECRET_KEY not set in environment. Set it before using payments.');
}
const stripe = Stripe(stripeSecret);

// Simple server-side product/pricing catalog (amounts in smallest currency unit)
const PRODUCTS = {
  "p1": { name: "Premium Wireless Headphones", amount_inr: 19900, amount_gbp: 199, currency_inr: "inr", currency_gbp: "gbp" },
  "p2": { name: "Comfort Cotton Shirt",        amount_inr: 18000, amount_gbp: 180, currency_inr: "inr", currency_gbp: "gbp" },
  "p3": { name: "Stylish Tote Bag",            amount_inr: 21000, amount_gbp: 210, currency_inr: "inr", currency_gbp: "gbp" },
  "p4": { name: "Compact Bluetooth Speaker",   amount_inr: 22000, amount_gbp: 220, currency_inr: "inr", currency_gbp: "gbp" }
};

// Orders persistence (demo). File in server dir: orders.json
const ORDERS_FILE = path.join(__dirname, 'orders.json');
function saveOrder(order) {
  let data = [];
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const raw = fs.readFileSync(ORDERS_FILE);
      data = JSON.parse(raw || '[]');
    }
  } catch (err) {
    console.error('Error reading orders.json', err);
    data = [];
  }
  data.push(order);
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing orders.json', err);
  }
}

// Health
app.get('/', (req, res) => res.send('Messo Stripe server running'));

/**
 * Create Checkout Session
 * POST /create-checkout-session
 * body: { items: [{id, qty}], customer_email?: string, currency?: 'inr'|'gbp' }
 */
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items = [], customer_email = '', currency = 'inr' } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Build line_items for Stripe from product catalog
    const line_items = items.map(it => {
      const p = PRODUCTS[it.id];
      if (!p) throw new Error('Invalid product id: ' + it.id);
      const unit_amount = currency === 'gbp' ? p.amount_gbp : p.amount_inr;
      return {
        price_data: {
          currency: currency,
          product_data: { name: p.name },
          unit_amount: unit_amount
        },
        quantity: it.qty || 1
      };
    });

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Stripe Checkout will surface Google Pay when available
      mode: 'payment',
      line_items,
      customer_email: customer_email || undefined,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['IN','GB'] }, // allowed countries
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL
    });

    // Return the url for redirect
    res.json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Stripe webhook endpoint
 * Must use raw body and verify signature using STRIPE_WEBHOOK_SECRET
 */
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  if (!webhookSecret) {
    console.warn('STRIPE_WEBHOOK_SECRET not configured. Webhook signature not verified.');
    // If no webhook secret configured, attempt to parse body (not secure) — but prefer to configure the secret.
    try {
      event = JSON.parse(req.body.toString());
    } catch (err) {
      console.error('Failed parsing webhook JSON without secret:', err);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
  } else {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  // Handle the event types you care about
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('✅ checkout.session.completed:', session.id, session.payment_status, session.customer_email || session.customer_details);
      // Save basic order info
      const order = {
        id: session.id,
        email: session.customer_email || (session.customer_details && session.customer_details.email) || '',
        amount_total: session.amount_total || null,
        currency: session.currency || null,
        created: new Date().toISOString(),
        raw: session
      };
      saveOrder(order);
      // TODO: send confirmation email using SendGrid / SES (not included)
      break;
    }
    case 'payment_intent.succeeded': {
      const pi = event.data.object;
      console.log('payment_intent.succeeded:', pi.id);
      break;
    }
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.json({ received: true });
});

// Start server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
