#!/bin/bash

set -e
set -u

git pull

npm install
npm run build
cd ./backend

git pull
mvn compile exec:java -Dexec.mainClass=org.korobochka.equiangular.Main
