# Telal Development — Luxury Real Estate Platform

> **"Where Vision Meets Legacy"** — An Awwwards-level luxury real estate platform with a Next.js 14 frontend and Express.js backend.

## Project Structure

```
telal-development/
├── frontend/          # Next.js 14 App (UI, Pages, Components)
│   ├── src/
│   │   ├── app/       # Pages, layouts, API routes
│   │   ├── components/# UI, animations, layout, sections
│   │   ├── hooks/     # Custom React hooks
│   │   └── store/     # Zustand state management
│   ├── public/        # Static assets
│   └── prisma/        # Database schema (shared)
├── backend/           # Express.js API Server
│   ├── src/
│   │   ├── routes/    # REST API endpoints
│   │   ├── middleware/ # Auth, validation
│   │   ├── lib/       # Data, utilities, DB
│   │   └── types/     # Shared TypeScript types
│   └── prisma/        # Database schema
├── .env.example       # Environment variables template
└── package.json       # Root scripts
```

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS v3 + Custom CSS Variables
- **Animation:** GSAP + ScrollTrigger, Framer Motion
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Auth:** NextAuth.js v5
- **Icons:** Lucide React
- **Fonts:** Cormorant Garamond, Inter, Noto Sans Arabic

### Backend
- **Runtime:** Node.js + Express.js
- **Language:** TypeScript
- **Database:** Prisma + PostgreSQL
- **Auth:** JWT (jsonwebtoken + bcryptjs)
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL (optional — works with static demo data)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/mohameddzaher/Telal-Real-estate.git
cd Telal-Real-estate

# Install all dependencies
cd frontend && npm install --legacy-peer-deps
cd ../backend && npm install
cd ..

# Copy environment variables
cp .env.example frontend/.env.local
cp .env.example backend/.env

# Start both servers
npm run dev:frontend   # http://localhost:3000
npm run dev:backend    # http://localhost:5000
```

### Database Setup (Optional)

```bash
cd backend
npx prisma generate
npx prisma db push
npm run db:seed
```

## Frontend Pages

### Public Routes
| Route | Description |
|-------|-------------|
| `/` | Homepage (14 cinematic sections) |
| `/properties` | Property listings with filters |
| `/properties/[slug]` | Property detail with gallery |
| `/projects` | Development projects |
| `/projects/[slug]` | Project detail |
| `/about` | Company story & values |
| `/team` | Leadership team |
| `/services` | Services overview |
| `/services/[slug]` | Service detail |
| `/insights` | Blog / market insights |
| `/insights/[slug]` | Article detail |
| `/contact` | Contact form + info |
| `/faq` | Searchable FAQ accordion |
| `/booking` | Meeting room booking (3-step flow) |
| `/locations` | Areas served |
| `/career` | Careers & open positions |
| `/sustainability` | ESG & sustainability |
| `/awards` | Awards & recognition |

### Protected Routes
| Route | Description |
|-------|-------------|
| `/portal` | Client portal dashboard |
| `/portal/properties` | Saved properties |
| `/portal/bookings` | My bookings |
| `/portal/documents` | Documents |
| `/portal/payments` | Payment tracker |
| `/portal/messages` | Agent messages |

### Admin Dashboard
| Route | Description |
|-------|-------------|
| `/admin` | Dashboard with KPIs |
| `/admin/properties` | Property CRUD |
| `/admin/bookings` | Booking calendar |
| `/admin/leads` | Lead pipeline (Kanban) |
| `/admin/clients` | CRM |
| `/admin/agents` | Agent management |
| `/admin/analytics` | Traffic analytics |
| `/admin/content` | Blog, FAQ management |
| `/admin/newsletter` | Subscriber management |
| `/admin/settings` | System settings |

## Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/properties` | List/create properties |
| GET/PATCH/DELETE | `/api/properties/:id` | Property CRUD |
| GET/POST | `/api/projects` | List/create projects |
| GET/POST | `/api/bookings` | List/create bookings |
| GET/POST | `/api/leads` | List/create leads |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter` | Subscribe |
| GET | `/api/newsletter/confirm` | Confirm subscription |
| GET/POST | `/api/analytics` | Analytics data |
| POST | `/api/auth/login` | Login (JWT) |
| POST | `/api/auth/register` | Register |
| GET | `/api/auth/me` | Current user |
| GET | `/api/health` | Health check |

## Design System

- **Theme:** Dark luxury — near-black (#050505), liquid gold (#C9A84C)
- **Typography:** Cormorant Garamond (display), Inter (body), Noto Sans Arabic (RTL)
- **Animation:** GSAP scroll reveals, parallax, magnetic cursor, preloader
- **Components:** 44 reusable components across UI, animation, layout, and booking

## User Roles

| Role | Access |
|------|--------|
| SUPER_ADMIN | Full access |
| ADMIN | All except system config |
| MANAGER | Properties, clients, bookings |
| AGENT | Own listings, assigned clients |
| CLIENT | Portal access |
| GUEST | Public pages |

## Scripts

```bash
# Root
npm run dev:frontend     # Start frontend (port 3000)
npm run dev:backend      # Start backend (port 5000)

# Frontend
cd frontend
npm run dev              # Development server
npm run build            # Production build
npm run lint             # ESLint

# Backend
cd backend
npm run dev              # Development server (tsx watch)
npm run build            # TypeScript compilation
npm run db:seed          # Seed demo data
npm run db:studio        # Prisma Studio GUI
```

## Environment Variables

See [`.env.example`](.env.example) for all required variables including:
- Database URL (PostgreSQL)
- NextAuth secret
- JWT secret
- Google OAuth credentials
- Resend API key (email)
- Mapbox token
- Cloudinary credentials

---

**Telal Development — تلال للتطوير العقاري** | *Where Vision Meets Legacy*
