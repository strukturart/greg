#!/bin/bash 

npm run web << EOF
ssh perry7@biela.uberspace.de << 'EOF'
cd /var/www/virtual/perry7/greg.strukturart.com/
rm -rf *


EOF
if [ -d "docs" ]; then
  cd docs/
    rsync -avz . perry7@biela.uberspace.de:/var/www/virtual/perry7/greg.strukturart.com/
fi


