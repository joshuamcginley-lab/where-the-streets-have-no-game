#!/bin/sh
# Stamp the build number (this commit's number on main) and date into the corner of the TV and phone pages,
# so a cached page is easy to spot. Run before every commit; the git pre-commit hook does it for you:
#   cp tools/version.sh .git/hooks/pre-commit   (it adds the pages to the commit itself)
cd "$(git rev-parse --show-toplevel)" || exit 1
N=$(( $(git rev-list --count HEAD) + 1 ))
V="v$N · $(date -u +'%b %-d')"
sed -i "s|<div class=\"ver\"[^>]*>[^<]*</div>|<div class=\"ver\" aria-hidden=\"true\">$V</div>|" index.html play.html
git add index.html play.html 2>/dev/null
echo "version $V"
