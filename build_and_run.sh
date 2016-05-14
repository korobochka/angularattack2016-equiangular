#!/bin/bash

set -e
set -u

git pull

npm install
npm run build
cd ./backend
mvn compile exec:java -Dexec.mainClass=org.korobochka.equiangular.Main
