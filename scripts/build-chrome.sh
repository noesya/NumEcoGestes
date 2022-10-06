#!/bin/bash

if [ ! -d "build" ]
then
  echo "Création du dossier \"build\""
  mkdir build
fi

if [ -f "build/chrome.zip" ]
then
  echo "Suppression de l'ancien fichier ZIP pour Google Chrome"
  rm -rf build/chrome.zip
fi

echo "Création du fichier ZIP pour Google Chrome"
zip -r build/chrome.zip ./source/*
echo "Terminé !"