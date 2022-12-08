import '@gouvminint/vue-dsfr/styles'

import { createApp } from 'vue'
import VueDsfr from '@gouvminint/vue-dsfr'

import App from './App.vue'
import router from './router'
import * as icons from './icons.js'

import './assets/main.css'

const app = createApp(App)

createApp(App)
    .use(router)
    .use(VueDsfr, { icons: Object.values(icons) })
    .mount('#app')