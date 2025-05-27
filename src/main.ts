import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara'
import App from './App.vue'
import 'primeicons/primeicons.css';
import './assets/styles/style.css'
import router from './router';



createApp(App)
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Lara,
            option: {
                darkModeSelector: 'system',
            }
        }
    })
    .mount('#app')
