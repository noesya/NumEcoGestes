import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@gouvminint/vue-dsfr/styles'
import VueDsfr from '@gouvminint/vue-dsfr'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(VueDsfr)
app.mount('#app')
