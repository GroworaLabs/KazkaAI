# КазкоAI 🌙

AI-powered personalized fairy tale generator for children — stories in Ukrainian where your child is always the hero.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript strict
- **Tailwind CSS** + shadcn/ui + Framer Motion
- **Anthropic Claude** API (streaming)
- **NextAuth v5** (Google OAuth + magic link)
- **Prisma** + PostgreSQL
- **Stripe** (subscriptions)
- **Resend** (transactional email)
- **@react-pdf/renderer** (PDF download)

---

## Quick Start

### 1. Prerequisites

- Node.js 18+
- Docker (for local PostgreSQL)

### 2. Clone & install

```bash
git clone https://github.com/your-org/kazka-ai.git
cd kazka-ai
npm install
```

### 3. Environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in all values (see table below).

### 4. Start the database

```bash
docker compose up -d
```

### 5. Run migrations & seed

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 6. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret (≥32 chars, run `openssl rand -base64 32`) |
| `AUTH_URL` | Your app URL (`http://localhost:3000` for dev) |
| `AUTH_GOOGLE_ID` | Google OAuth client ID ([console.cloud.google.com](https://console.cloud.google.com)) |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `ANTHROPIC_API_KEY` | Anthropic API key ([console.anthropic.com](https://console.anthropic.com)) |
| `RESEND_API_KEY` | Resend API key ([resend.com](https://resend.com)) |
| `RESEND_FROM_EMAIL` | Sender address, e.g. `КазкоAI <hello@kazka.ai>` |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PREMIUM_PRICE_ID` | Price ID for the Premium subscription product |
| `NEXT_PUBLIC_APP_URL` | Public app URL (used for share links, OG tags) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same as `STRIPE_PUBLISHABLE_KEY` but public |

---

## Stripe Setup

1. Create a product in Stripe dashboard: **КазкоAI Преміум** · $3.99/month recurring
2. Copy the **Price ID** → `STRIPE_PREMIUM_PRICE_ID`
3. Set up a webhook endpoint pointing to `https://your-domain.com/api/stripe/webhook`
4. Subscribe to events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
5. Copy the **Webhook signing secret** → `STRIPE_WEBHOOK_SECRET`

Local webhook testing with Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## Google OAuth Setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID (Web application)
3. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID → `AUTH_GOOGLE_ID` and Client Secret → `AUTH_GOOGLE_SECRET`

---

## Deployment (Vercel)

```bash
npm i -g vercel
vercel
```

Set all environment variables in the Vercel dashboard. The `vercel.json` is already configured.

For PostgreSQL in production, use [Neon](https://neon.tech) (free tier available).

---

## Project Structure

```
kazka-ai/
├── prisma/              # Schema & seed
├── src/
│   ├── app/             # Next.js App Router pages & API routes
│   ├── components/      # React components (UI + feature)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Clients: Anthropic, Prisma, Stripe, Resend, Auth
│   └── types/           # TypeScript types
├── docker-compose.yml   # Local PostgreSQL
└── .env.example         # Environment variable template
```

---

## Estimated Monthly Cost (at ~500 users)

| Service | Plan | Cost/mo |
|---|---|---|
| Vercel | Hobby (free) or Pro | $0–$20 |
| Neon PostgreSQL | Free tier | $0 |
| Anthropic Claude | ~10k stories × 400 tokens × $3/1M | ~$12 |
| Resend | Free (100 emails/day) | $0 |
| Stripe | 2.9% + $0.30 per transaction | Variable |
| **Total** | | **~$12–$32/mo** |

At $3.99 × 50 paying users = **$199.50 MRR** → profitable from ~10 subscribers.

---

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed demo data
npm run db:studio    # Open Prisma Studio
```
