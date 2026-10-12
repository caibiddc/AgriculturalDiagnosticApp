#!/usr/bin/env bash
# Integration runs in GitHub Actions. Never rewrites main or uses force pushes.
set -euo pipefail
test "$GITHUB_ACTIONS" = "true" || { echo "Expected GitHub Actions" >&2; exit 2; }
test "$(git branch --show-current)" = "chore/platform-migration-preparation" || exit 2
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git switch -c integration/full-platform

# Keep existing mobile history, move current mobile files into apps/mobile.
mkdir -p apps/mobile
while IFS= read -r entry; do
  case "$entry" in
    .github|docs|scripts|platform-bootstrap|apps) continue ;;
  esac
  git mv -- "$entry" "apps/mobile/$entry"
done < <(git ls-tree --name-only HEAD)
git commit -m "chore: move original React Native project to apps/mobile"

import_repo() {
  local name="$1" url="$2" branch="$3" prefix="$4"
  git remote add "$name" "$url"
  git fetch --no-tags "$name" "+refs/heads/$branch:refs/remotes/$name/$branch"
  # Full original Git history; no --squash.
  git subtree add --prefix="$prefix" "$name/$branch" -m "chore: import $name history under $prefix"
}
import_repo web https://github.com/mmdxiaoxin/agricultural-diagnostic-web.git main apps/web
import_repo backend https://github.com/mmdxiaoxin/agricultural-diagnostic-service.git master apps/backend
import_repo ai https://github.com/mmdxiaoxin/agricultural-ai-service.git master services/ai

cp platform-bootstrap/ROOT_README.md README.md
cp platform-bootstrap/ROOT_GITIGNORE .gitignore
cp platform-bootstrap/ROOT_CONTRIBUTING.md CONTRIBUTING.md
mkdir -p docs scripts deploy/nginx
cp platform-bootstrap/patch_known_issues.py scripts/patch_known_issues.py
cp platform-bootstrap/verify_repository.sh scripts/verify_repository.sh
cp platform-bootstrap/nginx.conf.template deploy/nginx/agri-site.conf.template
{
  printf '# source\tbranch\tsha\n'
  printf 'mobile\tmain\t%s\n' "$(git rev-parse main)"
  printf 'web\tmain\t%s\n' "$(git rev-parse refs/remotes/web/main)"
  printf 'backend\tmaster\t%s\n' "$(git rev-parse refs/remotes/backend/master)"
  printf 'ai\tmaster\t%s\n' "$(git rev-parse refs/remotes/ai/master)"
} > docs/SOURCE_HISTORY.tsv
python3 scripts/patch_known_issues.py .
git add -A
git commit -m 'chore: platform metadata and minimum pre-publication hardening'
bash scripts/verify_repository.sh .
test -z "$(git status --porcelain)"
echo "Consolidation branch created successfully."
