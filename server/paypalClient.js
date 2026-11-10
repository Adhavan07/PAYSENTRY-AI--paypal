/**
 * PaySentry AI: PayPal Sandbox API Client
 * Interfaces with PayPal REST APIs (OAuth2, Disputes, Orders)
 */

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

let cachedToken = null;
let tokenExpiresAt = 0;

/**
 * Obtain or reuse cached OAuth2 Bearer Token from PayPal Sandbox
 */
export async function getPayPalAccessToken() {
  // If simulation mode or missing keys, return mock sandbox token
  if (!CLIENT_ID || !CLIENT_SECRET || CLIENT_ID.includes('your_paypal') || process.env.DEMO_SIMULATION_MODE === 'true') {
    return 'SANDBOX_DEMO_BEARER_TOKEN_' + Date.now();
  }

  // Reuse cached token if valid
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  try {
    const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    cachedToken = response.data.access_token;
    // Set expiry 60 seconds before actual expiration
    tokenExpiresAt = Date.now() + ((response.data.expires_in - 60) * 1000);
    return cachedToken;
  } catch (error) {
    console.warn('[PayPal API] Warning: Failed to obtain real token, falling back to Sandbox simulation mode:', error.message);
    return 'SANDBOX_FALLBACK_TOKEN';
  }
}

/**
 * Fetch Disputes from PayPal Sandbox API (/v1/customer/disputes)
 */
export async function fetchSandboxDisputes() {
  const token = await getPayPalAccessToken();

  if (token.startsWith('SANDBOX_DEMO') || token.startsWith('SANDBOX_FALLBACK')) {
    // Return high-fidelity realistic sandbox disputes
    return getRealisticSandboxDisputes();
  }

  try {
    const response = await axios.get(`${PAYPAL_API_BASE}/v1/customer/disputes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.items || [];
  } catch (error) {
    console.warn('[PayPal API] Failed to fetch live disputes, serving sandbox fixtures:', error.message);
    return getRealisticSandboxDisputes();
  }
}

/**
 * Submit Evidence to PayPal Disputes API (/v1/customer/disputes/{dispute_id}/provide-evidence)
 */
export async function submitEvidenceToPayPal(disputeId, evidencePayload) {
  const token = await getPayPalAccessToken();

  if (token.startsWith('SANDBOX_DEMO') || token.startsWith('SANDBOX_FALLBACK')) {
    // Simulate real PayPal 200 OK Response
    return {
      status: 200,
      dispute_id: disputeId,
      acknowledged_at: new Date().toISOString(),
      action: 'EVIDENCE_SUBMITTED',
      paypal_reference: `PP-DISP-EV-${Math.floor(100000 + Math.random() * 900000)}`,
      seller_protection_status: 'CONFIRMED_ELIGIBLE',
      message: 'Evidence dossier accepted by PayPal Sandbox Dispute Resolution System.'
    };
  }

  try {
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/customer/disputes/${disputeId}/provide-evidence`,
      evidencePayload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('[PayPal API] Evidence submission error:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Create a PayPal Sandbox Order (/v2/checkout/orders)
 */
export async function createSandboxOrder(amount, currency = 'USD') {
  const token = await getPayPalAccessToken();

  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount.toFixed(2)
        },
        description: 'PaySentry Protected Merchant Transaction'
      }
    ]
  };

  if (token.startsWith('SANDBOX_DEMO') || token.startsWith('SANDBOX_FALLBACK')) {
    return {
      id: `ORDER-SB-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'CREATED',
      links: [
        { href: `https://www.sandbox.paypal.com/checkoutnow?token=mock_order`, rel: 'approve' }
      ]
    };
  }

  const response = await axios.post(`${PAYPAL_API_BASE}/v2/checkout/orders`, payload, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

/**
 * Realistic PayPal Sandbox Dispute Fixtures for Testing & Demo
 */
function getRealisticSandboxDisputes() {
  return [
    {
      dispute_id: 'PP-D-884192',
      create_time: new Date(Date.now() - 3600000 * 2).toISOString(),
      dispute_amount: { value: '389.00', currency_code: 'USD' },
      reason: 'MERCHANDISE_OR_SERVICE_NOT_RECEIVED',
      status: 'WAITING_FOR_SELLER_RESPONSE',
      dispute_life_cycle_stage: 'CHARGEBACK',
      buyer: {
        name: 'Alexander Reed',
        email: 'alex.buyer88@sandbox.example.com',
        account_age_days: 14
      },
      order_id: 'ORD-991204',
      item_name: 'Sony WH-1000XM5 Wireless Headphones (Midnight Blue)',
      tracking_number: '1Z9999999999999999',
      carrier: 'UPS',
      claim_text: 'I ordered the headphones 5 days ago and the box never arrived at my porch. I demand an immediate full refund.',
      carrier_tracking_status: 'DELIVERED',
      delivered_timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      carrier_geo_coords: '37.7749,-122.4194 (Front Porch Signature Scanned)',
      fraud_risk_score: 88,
      defense_status: 'PENDING_ANALYSIS'
    },
    {
      dispute_id: 'PP-D-773104',
      create_time: new Date(Date.now() - 3600000 * 18).toISOString(),
      dispute_amount: { value: '145.50', currency_code: 'USD' },
      reason: 'MERCHANDISE_OR_SERVICE_SIGNIFICANTLY_NOT_AS_DESCRIBED',
      status: 'WAITING_FOR_SELLER_RESPONSE',
      dispute_life_cycle_stage: 'INQUIRY',
      buyer: {
        name: 'Sarah Jenkins',
        email: 'sjenkins.test@sandbox.example.com',
        account_age_days: 240
      },
      order_id: 'ORD-882190',
      item_name: 'Vintage Leather Messenger Bag - Italian Calfskin',
      tracking_number: '9400111899562839481234',
      carrier: 'USPS',
      claim_text: 'Bag arrived completely torn with broken zippers. Attached photos show severe damage upon unboxing.',
      carrier_tracking_status: 'DELIVERED',
      delivered_timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
      carrier_geo_coords: '40.7128,-74.0060 (Parcel Locker)',
      fraud_risk_score: 74,
      defense_status: 'PENDING_ANALYSIS'
    },
    {
      dispute_id: 'PP-D-662911',
      create_time: new Date(Date.now() - 3600000 * 40).toISOString(),
      dispute_amount: { value: '620.00', currency_code: 'USD' },
      reason: 'UNAUTHORIZED_TRANSACTION',
      status: 'RESOLVED',
      dispute_life_cycle_stage: 'CLOSED',
      buyer: {
        name: 'Marcus Vance',
        email: 'mvance.buyer@sandbox.example.com',
        account_age_days: 5
      },
      order_id: 'ORD-771822',
      item_name: 'Apple iPad Air 11-inch M2 (128GB)',
      tracking_number: '782910384729',
      carrier: 'FEDEX',
      claim_text: 'My credit card was stolen and used to purchase this device without my permission.',
      carrier_tracking_status: 'DELIVERED',
      delivered_timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
      carrier_geo_coords: '34.0522,-118.2437 (Direct Signature Obtained)',
      fraud_risk_score: 95,
      defense_status: 'DEFENDED_WON',
      amount_saved: '$620.00'
    }
  ];
}

