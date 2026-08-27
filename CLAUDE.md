# George's Attire

Premium custom apparel e-commerce website.

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Prisma 7 (SQLite) with @prisma/adapter-better-sqlite3
- NextAuth v4 (Credentials provider, JWT)
- Stripe (Checkout sessions, CAD)
- Zustand (client-side cart state)

## Getting Started
```bash
npm install
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

## Default Admin
- Email: admin@georgesattire.com
- Password: admin123

## Key Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run db:seed` - Seed database
- `npm run db:push` - Run migrations
