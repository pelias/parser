#!/bin/bash

set -e

# Extract the dictionaries
git clone https://github.com/openvenues/libpostal.git /tmp/libpostal

rm -rf ./dictionaries
cp -r /tmp/libpostal/resources/dictionaries .

rm -rf /tmp/libpostal

# Make the structure importable directly
echo "module.exports = " > _dictionaries.js

for d in dictionaries/*/; do
  dname=$(basename "$d")
  files=$(for f in "$d"*.txt; do
    fname=$(basename "$f" .txt)
    # Read the file and convert it to the format the library expects:
    content=$(jq -c -R -s 'split("\n")
                           | map(select(length > 0))
                           | map(split("|"))
                           | flatten' "$f")
    echo "\"$fname\": $content"
  done | paste -sd, -)
  echo "{\"$dname\": { $files }}"
done | jq -s 'add' >> _dictionaries.js

npm run format_fix
