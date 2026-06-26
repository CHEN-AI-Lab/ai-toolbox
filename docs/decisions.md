# AI Toolbox Architecture Decision Records

## ADR-001: Next.js 14 App Router with Turbo Monorepo
**Date**: 2025-04-01
**Status**: Accepted

**Context**: Need to support multiple platforms (web, weapp, app) with shared code.

**Decision**: Use Next.js 14 App Router in a pnpm workspace + Turbo monorepo.

**Consequences**: Shared code in `shared/` and `packages/ui/`. Each end in its own `apps/*` directory.

---

## ADR-002: Tailwind CSS 4 with shadcn/ui
**Date**: 2025-04-01
**Status**: Accepted

**Context**: Need a modern, customizable UI system with good DX.

**Decision**: Use Tailwind CSS 4 with shadcn/ui components.

**Consequences**: Consistent design system. Easy theme customization via CSS variables.

---

## ADR-003: next-intl for Bilingual Support
**Date**: 2025-04-01
**Status**: Accepted

**Context**: Target Chinese and international users.

**Decision**: Use next-intl v3 with cookie-only locale detection.

**Consequences**: Messages in JSON. Easy to add more languages.

---

## ADR-004: User Tier System
**Date**: 2025-04-01
**Status**: Draft

**Context**: Need to differentiate user access levels (guest, free, VIP).

**Decision**: Implement tier-based access in middleware. Guest = limited browsing, Free = reviews, VIP = premium features.

**Consequences**: More complex routing but clear upgrade path for monetization.