#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if ! npm whoami >/dev/null 2>&1; then
  echo "Not logged in. Run: npm login"
  echo "Or set NPM_TOKEN and run: echo //registry.npmjs.org/:_authToken=\$NPM_TOKEN > ~/.npmrc"
  exit 1
fi

USER="$(npm whoami)"
echo "Logged in as: $USER"

# Create org if missing (ignore error if exists or no permission)
npm org ls statero >/dev/null 2>&1 || npm org create statero 2>/dev/null || true

publish_pkg() {
  local dir="$1"
  echo ""
  echo "Publishing $(node -p "require('$dir/package.json').name") from $dir ..."
  cd "$dir"
  npm publish --access public
}

publish_pkg "$ROOT/node"
publish_pkg "$ROOT/consent"

echo ""
echo "Done."
echo "  https://www.npmjs.com/package/@statero/sdk"
echo "  https://www.npmjs.com/package/@statero/consent"
