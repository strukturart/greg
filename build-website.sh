#!/bin/sh 
rm -rf ./docs
mkdir ./docs
mkdir ./docs/assets
cp ./application/manifest.webapp ./docs/
cp -r ./application/assets/ ./docs/
cp ./application/oauth.html ./docs/
cp ./application/oauth.js ./docs/

parcel  --no-source-maps  --no-cache ./application/index.html

