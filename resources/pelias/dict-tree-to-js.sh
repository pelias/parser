#!/bin/bash

set -e

# Make the structure importable directly
echo "module.exports = " > _dictionaries.js

for d in dictionaries/*/; do
  d1=$(basename "$d")
  subdirs=$(for d2 in "$d"*/; do
    d2name=$(basename "$d2")
    files=$(for f in "$d2"*.txt; do
      fname=$(basename "$f" .txt)
      content=$(jq -R -s . "$f")
      echo "\"$fname\": $content"
    done | paste -sd, -)
    echo "\"$d2name\": { $files }"
  done | paste -sd, -)
  echo "{\"$d1\": { $subdirs }}"
done | jq -s 'add' >> _dictionaries.js

npm run format_fix
