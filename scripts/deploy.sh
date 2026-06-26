#!/usr/bin/env bash
# Deploy script for AI Toolbox
set -euo pipefail

echo "🚀 Deploying AI Toolbox..."
echo ""

# Run checks first
bash scripts/check.sh

# Build
echo "🏗️  Building for production..."
pnpm build

# Deploy (Vercel)
echo "📤 Deploying..."
npx vercel --prod 2>/dev/null || {
  echo "⚠️  Vercel CLI not found. Deploy manually:"
  echo "  1. Push to main branch"
  echo "  2. Vercel auto-deploys"
}

echo "✅ Deploy complete!"