import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_mock');

export async function POST(req: Request) {
  const { amount, currency = 'usd' } = await req.json();

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ mock: true, checkoutUrl: '/dashboard/student?payment=mock-success' });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: amount,
          product_data: { name: 'Lesson booking' }
        }
      }
    ],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard/student?payment=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/student?payment=cancel`
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
