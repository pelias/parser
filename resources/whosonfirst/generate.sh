#!/usr/bin/env bash

set -e

node ./generate.js

# Make the structure importable directly
#echo "const {Base64} = require('js-base64')" > _dictionaries.js
echo -n "module.exports =" > _dictionaries.js

for d in dictionaries/*/; do
  dname=$(basename "$d")
  files=$(for f in "$d"*.txt; do
    fname=$(basename "$f" .txt)
    # Read the file and convert its content into a JSON string:
    content=$(jq -R -s . "$f")
    echo "\"$fname\": $content"
  done | paste -sd, -)
  echo "{\"$dname\": { $files }}"
done | jq -s 'add' >> _dictionaries.js

npm run format_fix
