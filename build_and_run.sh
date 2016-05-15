#!/bin/bash

set -e
set -u

git pull

npm install
npm run build

cp CNAME dist
cd dist
cp index.html 200.html
surge .

cd ../backend
git pull
mvn compile exec:java -Dexec.mainClass=org.korobochka.equiangular.Main
