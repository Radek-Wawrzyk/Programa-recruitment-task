import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.scss'
import i18n from './i18n/index'
import router from './router'

createApp(App).use(i18n).use(router).mount('#app')
