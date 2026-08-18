#!/usr/bin/env bash
# Replace the published resume PDF and publish the change.
#
# Usage:
#   scripts/update_resume.sh /path/to/new-resume.pdf
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="$ROOT/reference/Sabari_Jaikrishnan_StaffAIEngineer_EA_Resume.pdf"

if [[ $# -ne 1 ]]; then
  echo "Usage: scripts/update_resume.sh /path/to/new-resume.pdf" >&2
  exit 1
fi

SOURCE="$1"

if [[ ! -f "$SOURCE" ]]; then
  echo "File not found: $SOURCE" >&2
  exit 1
fi

if [[ "${SOURCE##*.}" != "pdf" && "${SOURCE##*.}" != "PDF" ]]; then
  echo "Expected a .pdf file, got: $SOURCE" >&2
  exit 1
fi

cp "$SOURCE" "$TARGET"
echo "Copied resume to $TARGET"

python3 "$ROOT/scripts/check_site.py"

cd "$ROOT"
git add "$TARGET"

if git diff --cached --quiet; then
  echo "No changes to commit (new PDF is identical to the one already published)."
  exit 0
fi

git commit -m "Update published resume PDF"
git push

echo "Done. The live resume link now serves the new PDF."
