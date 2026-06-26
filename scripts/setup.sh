#!/usr/bin/env bash
# Setup script - install dependencies and configure project
set -euo pipefail

echo "🚀 AI Toolbox Setup"
echo "===================="

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Validate setup
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. cp .env.example apps/web/.env.local (fill in values)"
echo "  2. pnpm dev"