import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara'
import App from './App.vue'
import 'primeicons/primeicons.css';
import './assets/styles/style.css'




createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Lara,
            option: {
                darkModeSelector: 'system',
            }
        }
    })
    .mount('#app')
