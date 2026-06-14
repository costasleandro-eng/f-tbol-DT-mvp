#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/data/.openclaw/workspace/projects/football-coach-mvp"
cd "$REPO_DIR"

# Ensure repo-local identity exists, without touching global Git config.
git config user.name "${GIT_AUTHOR_NAME:-El Nueve}"
git config user.email "${GIT_AUTHOR_EMAIL:-el-nueve@openclaw.local}"

# Do nothing if there are no changes.
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "No changes to back up."
  exit 0
fi

# Commit everything in this MVP repo, including new files.
git add -A
STAMP="$(date -u +'%Y-%m-%d %H:%M UTC')"
git commit -m "backup: daily MVP snapshot ${STAMP}"

# Push to GitHub. This requires the repo remote/auth to be working.
git push origin "$(git branch --show-current)"
