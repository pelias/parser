#!/bin/bash

git clone https://github.com/openvenues/libpostal.git /tmp/libpostal

rm -rf ./dictionaries
cp -r /tmp/libpostal/resources/dictionaries .

rm -rf /tmp/libpostal