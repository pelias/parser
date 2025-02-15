#!/bin/bash

set -e

# see: https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata

# Get a list of country codes
COUNTRY_CODES=$(curl -sLo- 'https://chromium-i18n.appspot.com/ssl-address/data' \
    | jq -r .countries);

TARGET_DIR='./ssl-address'
mkdir -p "${TARGET_DIR}"

# Download each JSON file
IFS='~'
for CC in $COUNTRY_CODES; do
    echo "-- ${CC} --"
    curl -sLo- "https://chromium-i18n.appspot.com/ssl-address/data/${CC}" > "${TARGET_DIR}/${CC}.json"
done

# Distill the postal code regular expressions from the data files
echo "module.exports = " > zipregex.js

for f in "${TARGET_DIR}"/*.json; do
  key=$(basename "$f" .json)
    jq -n --arg key "$key" --slurpfile data "$f" '
      ($data[0] | .zip) as $zip |
      if $zip != null then {($key): $zip} else empty end
    '
done | jq -s 'add' >> zipregex.js

npm run format_fix
