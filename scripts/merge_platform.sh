#!/usr/bin/env bash
# Use on a development computer that can reach github.com.
# Preserve all original Git history. Never force push or rewrite old repositories.
set -euo pipefail
TARGET="${1:-agricultural-diagnostic-platform}"
[ ! -e "$TARGET" ] || { echo "Destination exists: $TARGET" >&2; exit 2; }
command -v git >/dev/null || exit 2
[ -n "$(git config user.name || true)" ] && [ -n "$(git config user.email || true)" ] || {
  echo 'Set git config user.name and user.email first.' >&2
  exit 2
}
mkdir -p "$TARGET"
git -C "$TARGET" init -b main
git -C "$TARGET" commit --allow-empty -m 'chore: initialize monorepo'

import_source() {
  local remote="$1" url="$2" branch="$3" prefix="$4"
  git -C "$TARGET" remote add "$remote" "$url"
  git -C "$TARGET" fetch --no-tags "$remote" "+refs/heads/$branch:refs/remotes/$remote/$branch"
  # NO --squash: every original commit stays in Git ancestry.
  git -C "$TARGET" subtree add --prefix="$prefix" "$remote/$branch" -m "chore: import $remote under $prefix"
}

import_source mobile https://github.com/caibiddc/AgriculturalDiagnosticApp.git main apps/mobile
import_source web https://github.com/mmdxiaoxin/agricultural-diagnostic-web.git main apps/web
import_source backend https://github.com/mmdxiaoxin/agricultural-diagnostic-service.git master apps/backend
import_source ai https://github.com/mmdxiaoxin/agricultural-ai-service.git master services/ai

for spec in "mobile main" "web main" "backend master" "ai master"; do
  read -r name branch <<< "$spec"
  git -C "$TARGET" merge-base --is-ancestor "$name/$branch" main || {
    echo "History check failed: $name/$branch" >&2; exit 1;
  }
done
echo 'DONE: local monorepo created; original Git histories preserved.'
echo 'NEXT: audit secrets/licenses, fix configurations, run module tests.'
echo 'Create an EMPTY repo caibiddc/agricultural-diagnostic-platform, then:'
echo '  git remote add origin https://github.com/caibiddc/agricultural-diagnostic-platform.git'
echo '  git push -u origin main'
