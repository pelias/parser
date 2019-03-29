#!/bin/bash

# see: https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata

COUNTRY_CODES=$(curl -sLo- 'https://chromium-i18n.appspot.com/ssl-address/data' \
    | jq -r .countries);

TARGET_DIR='./ssl-address'
mkdir -p "${TARGET_DIR}"

IFS='~'
for CC in $COUNTRY_CODES; do
    echo "-- ${CC} --"
    curl -sLo- "https://chromium-i18n.appspot.com/ssl-address/data/${CC}" >> "${TARGET_DIR}/${CC}.json"
done