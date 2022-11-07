# Ecogestes

## Setup

```bash
npm install -g web-ext
```

Les fichiers liés à Vue ou les assets utilisés sont à ranger dans `app/src`

Les fichiers propres à l'extension, les données en JSON, ou les icônes utilisées en CSS sont à ranger dans `app/public`

## Run

```bash
cd app
yarn dev
```

Dans Chrome, allez sur `chrome://extensions`, activer le mode développeur.

Cliquez sur "Charger l'extension non empaquetée" et sélectionnez le dossier "source".

## Build

Pour compiler l'ensemble:
```bash
scripts/build.sh
```

Pour compiler l'extension pour Chrome/Edge:
```bash
scripts/build-chrome.sh
```

Pour compiler l'extension pour Firefox:
```bash
scripts/build-firefox.sh
```

## Chrome

https://chrome.google.com/webstore/devconsole/98444501-20ce-4092-847e-357539a15913/cimommdledolehahiohkpjdeoglafpgk/edit?hl=FR

## Edge

## Firefox

https://addons.mozilla.org/fr/firefox/addon/%C3%A9cogestes/


## Sources

https://github.com/dnum-mi/vue-dsfr

https://github.com/dnum-mi/vue-dsfr/blob/main/src/demo-app/App.vue
