#!/bin/bash

if [ ! -d "./build" ]
then
  echo "Création du dossier \"build\""
  mkdir build
fi

if [ -f "./build/chrome.zip" ]
then
  echo "Suppression de l'ancien fichier ZIP pour Chrome"
  rm -rf ./build/chrome.zip
fi

echo "Création du fichier ZIP pour Chrome"

# Creating random tmp directory
uuid=$(uuidgen)
mkdir ./scripts/tmp/$uuid

# Building to tmp directory
cd app
yarn build --outDir=../scripts/tmp/$uuid
cd ..

# Removing Manifest V2
rm ./scripts/tmp/$uuid/manifest.v2.json

# Building ZIP file
cd scripts/tmp/$uuid
zip -r ../../../build/chrome.zip *
cd ../../..
# Cleaning tmp directory
rm -rf ./scripts/tmp/$uuid

echo "Terminé !"