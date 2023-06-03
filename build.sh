#!/bin/sh 

rm -rf ./dist
mkdir ./dist
mkdir ./dist/assets


rm -rf ./build
mkdir ./build




npm run  build --no-source-maps --no-optimize --public-url ./ application/index.html 

cp -r ./application/assets/icons ./dist/assets/icons
cp -r ./application/assets/image ./dist/assets/image

mkdir ./dist/assets/js
cp  ./application/assets/js/kaiads.v5.min.js ./dist/assets/js/

#make oauth js script
./make_oauth_script.sh

cp ./application/manifest.webapp ./dist/
cp ./application/manifest.webmanifest ./dist/
cp ./application/oauth.html ./dist/
cp ./application/oauth.js ./docs/



#!/bin/bash
#create default app zip
cd dist/
mv manifest.webmanifest ../
rm ../build/greg.zip
zip -r ../build/greg.zip ./*
mv  ../manifest.webmanifest ./





#create bHaCkers zip
rm ../build/greg-omnisd.zip
zip -r ../build/application.zip ./*
cd ../build/
mkdir -p greg-omnisd
touch ./greg-omnisd/metadata.json
echo '{ "version": 1, "manifestURL": "app://greg/manifest.webapp" }'  > ./greg-omnisd/metadata.json

cp application.zip greg-omnisd/
cd greg-omnisd/
zip -r ../greg-omnisd.zip ./*
rm -fr ../greg-omnisd
rm ../application.zip


#create KaiOS 3.0 app zip

#rm ../build/greg-kaios3.zip
cd ../../
cd dist/
mv manifest.webapp ../
zip -r ../build/greg-kaios3.zip ./*
mv  ../manifest.webapp ./
exit






