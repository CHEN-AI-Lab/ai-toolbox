# AI Toolbox — AI Tools Aggregator

AI Toolbox is a curated directory of AI tools, organized by category with bilingual support (zh-CN + en), user reviews, and community ratings.

## Tech Stack
- **Framework**: Next.js 14 (App Router) + React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Monorepo**: pnpm workspace + Turbo
- **Testing**: Vitest (unit) + Playwright (E2E)
- **i18n**: next-intl v3
- **Deploy**: Vercel

## Project Structure
```
ai-toolbox/
├── apps/
│   └── web/            # Next.js web application
│       └── src/
│           ├── app/    # App Router pages
│           └── components/ # UI components
├── shared/             # Cross-platform code (types, utils, api, validators, constants, hooks)
├── packages/
│   └── ui/             # Shared UI components
├── docs/               # Architecture, progress, decisions
├── scripts/            # Setup, check, deploy scripts
├── tests/              # Unit & E2E tests
└── public/             # Static assets
```

## Commands
```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm test             # Run unit tests
pnpm lint             # Lint check
pnpm typecheck        # TypeScript check
bash scripts/check.sh # Full quality gate
```

## Quality Gates
- [ ] tsc --noEmit (no type errors)
- [ ] lint pass
- [ ] vitest run (all tests pass)
- [ ] pnpm build passes
- [ ] No console.log in production code
- [ ] No hardcoded secrets

## Deploy
- Production: Vercel auto-deploy on main branch push