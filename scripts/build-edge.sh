#!/bin/bash

if [ ! -d "./build" ]
then
  echo "Création du dossier \"build\""
  mkdir build
fi

if [ -f "./build/chrome.zip" ]
then
  echo "Suppression de l'ancien fichier ZIP pour Edge"
  rm -rf ./build/edge.zip
fi

echo "Création du fichier ZIP pour Edge"

# Copying to random tmp directory
uuid=$(uuidgen)
cp -r ./source ./scripts/tmp/$uuid

# Removing Manifest V2
rm ./scripts/tmp/$uuid/manifest.v2.json

# Building ZIP file
cd scripts/tmp/$uuid
zip -r ../../../build/edge.zip *
cd ../../..
# Cleaning tmp directory
rm -rf ./scripts/tmp/$uuid

echo "Terminé !"