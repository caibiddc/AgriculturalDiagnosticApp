#!/usr/bin/env bash
set -euo pipefail
cd "$1"
for path in apps/web/package.json apps/web/vite.config.ts apps/mobile/package.json apps/backend/package.json apps/backend/apps/api-gateway/src/main.ts services/ai/requirements.txt services/ai/run.py docs/SOURCE_HISTORY.tsv; do
  test -f "$path" || { echo "MISSING $path" >&2; exit 1; }
done
while IFS=$'\t' read -r source branch sha; do
  [[ -z "$source" || "$source" == \#* ]] && continue
  git cat-file -e "$sha^{commit}"
  git merge-base --is-ancestor "$sha" HEAD || { echo "BROKEN HISTORY $source" >&2; exit 1; }
  echo "PRESERVED: $source $sha"
done < docs/SOURCE_HISTORY.tsv
! grep -Fq 'rewrite: path => path.replace(/^\/api/, "")' apps/web/vite.config.ts
! grep -Fq 'COPY --from=builder /app/.env* ./' apps/backend/Dockerfile
! grep -Eq '"300[1-7]:300[1-7]"' apps/backend/docker-compose.yml
! grep -Fq '"5000:5000"' services/ai/docker-compose.yml
echo "PASS: source files, original commit ancestors, selected static hardening"
echo "PENDING: real builds, GPU model inference, integrated diagnosis, security scan"
