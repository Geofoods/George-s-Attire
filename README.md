
# George's Attire

George's Attire is a custom apparel storefront for individuals, teams, businesses, and organizations in Canada. Customers can choose a garment, upload artwork, configure print locations, add items to a cart, and pay in CAD. The site also supports account-based order tracking and bulk quote requests.

## Features

- Custom t-shirt, sweatshirt, and hoodie configuration
- Artwork uploads in PNG, JPG/JPEG, and SVG formats up to 10 MB
- Front, back, and sleeve print placement options
- Standard and rush shipping options with CAD pricing
- Stripe Checkout payment flow
- Customer registration, login, and order history
- Bulk order quote requests for orders of 10 or more pieces
- Admin dashboard for orders, pricing, and bulk quotes
- Contact form email delivery through SMTP

## Tech Stack

- Next.js 16 App Router with Turbopack
- React 19 and TypeScript
- Tailwind CSS 4
- Prisma 7 with PostgreSQL
- NextAuth credentials authentication with JWT sessions
- Stripe Checkout
- Zustand for cart state
- Nodemailer for contact email

## Prerequisites

- Node.js 20 or newer
- npm
- A PostgreSQL database, such as Supabase or Neon
- A Stripe account for checkout

## Local Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Create `.env.local` in the project root:

	```env
	DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
	NEXTAUTH_SECRET="replace-with-a-long-random-secret"
	STRIPE_SECRET_KEY="sk_test_..."

	SMTP_HOST="smtp.gmail.com"
	SMTP_PORT="465"
	SMTP_SECURE="true"
	SMTP_USER="your-smtp-user"
	SMTP_PASS="your-smtp-password-or-app-password"
	SMTP_FROM="your-smtp-user"
	CONTACT_NOTIFY_EMAIL="you@example.com"
	```

	`DATABASE_URL`, `NEXTAUTH_SECRET`, and `STRIPE_SECRET_KEY` are required for the core application. SMTP variables are required for the contact form; the SMTP host, port, and secure settings have Gmail defaults.

3. Apply the Prisma migrations and seed development data:

	```bash
	npm run db:push
	npm run db:seed
	```

	The seed creates the three products, color and size variants, pricing configuration, and an admin account. The default development credentials are:

	```text
	Email: admin@georgesattire.com
	Password: admin123
	```

	Change or remove these credentials before deploying to a shared or production environment.

4. Start the development server:

	```bash
	npm run dev
	```

	Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate Prisma Client and create a production build |
| `npm start` | Start the production server after building |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Apply development Prisma migrations |
| `npm run db:seed` | Seed products, pricing, variants, and the admin user |
| `npm run db:generate` | Regenerate Prisma Client |

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Storefront homepage and pricing overview |
| `/shop` | All active apparel |
| `/shop/tshirts` | T-shirt catalog |
| `/shop/sweatshirts` | Sweatshirt catalog |
| `/shop/hoodies` | Hoodie catalog |
| `/custom-apparel` | Customization studio and cart entry point |
| `/cart` | Review configured items |
| `/checkout` | Customer details and payment redirect |
| `/bulk-orders` | Bulk quote request form |
| `/organizations` | Information for teams and organizations |
| `/account` | Signed-in customer order history |
| `/admin` | Admin order, pricing, and quote management |
| `/contact` | Contact form |

## Project Structure

```text
src/app/             Next.js pages and API routes
src/components/      Shared UI components
src/lib/             Auth, Prisma, Stripe, pricing, validation, and cart logic
prisma/schema.prisma Database schema
prisma/seed.ts       Development seed data
public/uploads/      Uploaded design files
shirts/              T-shirt product images
sweatshirts/         Sweatshirt product images
hoddies/             Hoodie product images
```

## Production Notes

- Use a production PostgreSQL database and production Stripe secret key.
- Generate a unique `NEXTAUTH_SECRET`; never reuse the development value.
- Configure SMTP with a provider and credentials intended for server-side email delivery.
- Uploaded designs are written to `public/uploads`, so production deployments should use persistent storage or replace the upload implementation with object storage.
- Run `npm run lint` and `npm run build` before deployment.

## Useful Documentation

- [Next.js documentation](https://nextjs.org/docs)
- [Prisma documentation](https://www.prisma.io/docs)
- [Stripe Checkout documentation](https://docs.stripe.com/checkout)
- [NextAuth.js documentation](https://next-auth.js.org/)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
