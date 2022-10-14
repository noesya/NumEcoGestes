#!/bin/bash

if [ ! -d "./build" ]
then
  echo "Création du dossier \"build\""
  mkdir build
fi

if [ -f "./build/chrome.zip" ]
then
  echo "Suppression de l'ancien fichier ZIP pour navigateurs Chromium-based (Chrome et Edge)"
  rm -rf ./build/chrome.zip
fi

echo "Création du fichier ZIP pour navigateurs Chromium-based (Chrome et Edge)"

# Copying to random tmp directory
uuid=$(uuidgen)
cp -r ./source ./tmp/$uuid

# Removing Manifest V2
rm ./tmp/$uuid/manifest.v2.json

# Building ZIP file
cd tmp/$uuid
zip -r ../../build/chrome.zip *
cd ../..
# Cleaning tmp directory
rm -rf ./tmp/$uuid

echo "Terminé !"