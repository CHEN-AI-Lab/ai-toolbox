# AI Toolbox — Project Map

## Tech Stack
- **Framework**: Next.js 14 App Router + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **i18n**: next-intl v3 (cookie-only, no middleware)
- **Monorepo**: pnpm workspace + Turbo
- **Testing**: Vitest + Playwright
- **Auth**: User system with guest/free/VIP tiers

## Key Commands
| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm test` | Run unit tests |
| `pnpm check` | Quality gate check |
| `pnpm typecheck` | TypeScript check |

## Code Conventions
- TypeScript strict — no `any`
- Components max 200 lines
- Every async: handle loading/error/empty
- All text via `t('key')` (bilingual)
- Data flows: shared/ → apps/web/

## Multi-End Architecture
- `shared/` → types, utils, api, validators, constants, hooks, messages
- `apps/web` → Next.js UI (this project)
- `apps/weapp` → mini-program (future)
- `apps/app` → React Native (future)
- `packages/ui` → shared UI components

## Quality Gates
□ tsc --noEmit (no type errors)
□ lint (no style violations)
□ vitest run (all tests pass)
□ pnpm build (build passes)
□ No console.log in production code
□ No hardcoded secrets

## Deploy
- Vercel auto-deploy on main branch push
