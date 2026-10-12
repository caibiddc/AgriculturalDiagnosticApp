#!/usr/bin/env python3
"""Exact-source, minimum security and API proxy adjustments after import."""
from pathlib import Path
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()


def exact(path, old, new):
    p = root / path
    data = p.read_text(encoding="utf-8")
    if old not in data:
        if new in data:
            return
        raise SystemExit(f"Source changed, review manually: {path}")
    p.write_text(data.replace(old, new, 1), encoding="utf-8")


exact("apps/web/vite.config.ts",
      r'rewrite: path => path.replace(/^\/api/, "")',
      '// Preserve /api for the NestJS global API prefix.')
exact("apps/backend/Dockerfile",
      "COPY --from=builder /app/.env* ./",
      "# Inject secrets at runtime; never bake .env files into Docker images.")
p = root / "apps/backend/.dockerignore"
content = p.read_text(encoding="utf-8")
if "# Protect private environment files" not in content:
    p.write_text(content.rstrip() +
                 "\n\n# Protect private environment files\n.env\n.env.*\n!.env.example\n",
                 encoding="utf-8")
p = root / "apps/backend/docker-compose.yml"
lines = []
for line in p.read_text(encoding="utf-8").splitlines(keepends=True):
    if '"3000:3000"' in line:
        lines.append(line.replace('"3000:3000"', '"127.0.0.1:3000:3000"'))
    elif any(f'"{n}:{n}"' in line for n in range(3001, 3008)):
        continue
    else:
        lines.append(line)
p.write_text("".join(lines), encoding="utf-8")
exact("services/ai/docker-compose.yml",
      '"5000:5000"', '"127.0.0.1:5000:5000"')
exact("services/ai/docker-compose.yml",
      "      - FLASK_APP=app.py",
      "      - FLASK_APP=app.py\n      - HOST=0.0.0.0")
exact("services/ai/config/app_config.py",
      'os.getenv("FLASK_DEBUG", "True")',
      'os.getenv("FLASK_DEBUG", "False")')
print("Applied known static config fixes. Runtime and security testing remain mandatory.")
