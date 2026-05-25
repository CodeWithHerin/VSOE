\# Project Vitesse — VSOE Booking Experience



\## What This Is

Portfolio project demonstrating luxury frontend capability. NOT a real booking system. 

Branded as Belmond VSOE for educational/portfolio purposes only.



\## Tech Stack

\- Next.js 16 (App Router, Turbopack)

\- TypeScript strict mode

\- Tailwind CSS v4

\- Framer Motion for animations

\- Prisma ORM

\- Supabase PostgreSQL (production)

\- SQLite (local development only)

\- NextAuth v5

\- Groq API (llama-3.3-70b-versatile) for AI Concierge



\## Live URLs

\- Production: https://project-vitesse-one.vercel.app/en

\- GitHub: https://github.com/CodeWithHerin/VSOE



\## Critical Files

\- prisma/schema.prisma — database schema

\- src/components/booking/BookingWizard.tsx — booking flow

\- src/components/layout/Navbar.tsx — main navigation with mega menu

\- src/app/api/chat/route.ts — Groq AI concierge backend

\- src/data/journeys.ts — journey content

\- src/data/cabins.ts — cabin content



\## What's Working

\- Full website deployed

\- Supabase database connected

\- Booking flow end to end

\- AI Concierge with real DB queries

\- Custom card payment form

\- 10 authentic VSOE AI images

\- Navbar mega menu

\- Membership page redesigned



\## Current Blocker

prisma/schema.prisma provider must be "postgresql" not "sqlite". 

This breaks Vercel production. Local dev still uses SQLite via DATABASE\_URL.



\## Coding Rules

1\. Never break the booking flow

2\. Use Next.js Image component, never <img>

3\. All images live in /public/images/vsoe/

4\. Use existing Tailwind tokens: vsoe-midnight, vsoe-gold, vsoe-cream

5\. Match existing animation timings (Framer Motion 0.3-0.7s ease-out)

6\. Test build with `npm run build` before suggesting commit

7\. Never auto-approve changes

8\. Show before/after diffs for every code change



\## Active Priorities

1\. Fix schema.prisma provider mismatch (sqlite → postgresql)

2\. Page transition animations

3\. Interactive SVG route map on homepage

4\. Stories articles with editorial layout

5\. Profile/My Bookings session-aware

6\. Mobile responsiveness audit

7\. Performance optimization

