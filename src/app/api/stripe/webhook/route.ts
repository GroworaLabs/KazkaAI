import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const subId = session.subscription as string;

        if (userId && subId) {
          const sub = await stripe.subscriptions.retrieve(subId);
          await prisma.$transaction([
            prisma.user.update({
              where: { id: userId },
              data: { plan: "PREMIUM" },
            }),
            prisma.subscription.upsert({
              where: { userId },
              update: {
                stripeSubId: subId,
                status: sub.status,
                currentPeriodEnd: new Date(
                  (sub as unknown as { current_period_end: number })
                    .current_period_end * 1000
                ),
              },
              create: {
                userId,
                stripeCustomerId: session.customer as string,
                stripeSubId: subId,
                status: sub.status,
                currentPeriodEnd: new Date(
                  (sub as unknown as { current_period_end: number })
                    .current_period_end * 1000
                ),
              },
            }),
          ]);
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId;

        if (userId) {
          const isActive = sub.status === "active";
          await prisma.$transaction([
            prisma.user.update({
              where: { id: userId },
              data: { plan: isActive ? "PREMIUM" : "FREE" },
            }),
            prisma.subscription.updateMany({
              where: { userId },
              data: {
                status: sub.status,
                currentPeriodEnd: new Date(
                  (sub as unknown as { current_period_end: number })
                    .current_period_end * 1000
                ),
              },
            }),
          ]);
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[webhook] processing error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: { bodyParser: false },
};
