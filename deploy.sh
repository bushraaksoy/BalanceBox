#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Pulling latest code"
cd "$ROOT"
git pull --ff-only

echo "==> Installing server dependencies"
cd "$ROOT/server"
npm install --include=dev
npx prisma migrate deploy
npx prisma generate

echo "==> Building client"
cd "$ROOT/client"
npm install
NODE_OPTIONS=--max-old-space-size=1536 npm run build

echo "==> Restarting API"
systemctl restart balancebox
systemctl --no-pager --lines=20 status balancebox

echo "==> Deployed"
