# AI Toolbox Architecture

## Overview
AI Toolbox is a curated AI tools directory that helps users discover, compare, and review AI tools across multiple categories.

## Tech Stack
- **Framework**: Next.js 14 (App Router) + React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **i18n**: next-intl v3 (zh-CN + en, cookie-only)
- **Monorepo**: pnpm workspace + Turbo
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Deploy**: Vercel

## Architecture
```
ai-toolbox/
├── apps/web/              ← Next.js web application
│   └── src/
│       ├── app/           ← Pages & API routes
│       └── components/    ← UI components
├── shared/                ← Cross-platform code
│   ├── types/             ← TypeScript definitions
│   ├── constants/         ← App constants
│   ├── utils/             ← Utility functions
│   ├── validators/        ← Zod validation schemas
│   ├── api/               ← API client
│   └── hooks/             ← React hooks
├── packages/ui/           ← Shared UI component library
├── docs/                  ← Documentation
└── scripts/               ← Automation scripts
```

## Key Design Decisions
1. **Monorepo** — pnpm workspace + Turbo for multi-end support (web, weapp, app)
2. **Shared First** — All cross-platform logic in `shared/`, apps only contain UI
3. **Bilingual** — Built-in zh-CN + en with next-intl
4. **Auth Tiers** — Guest / Free / VIP access levels
5. **User Reviews** — Community-driven ratings and reviews for AI tools

## Data Flow
1. Browse categories → Fetch tools via API
2. View tool details → Reviews, screenshots, pricing
3. User submits review → Validated via Zod → Stored
4. Admin manages listings via dashboard