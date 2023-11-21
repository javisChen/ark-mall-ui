import {createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './all.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'


import {
    create,
    NButton,
    NInputNumber,
    NModal
} from 'naive-ui'

const naive = create({
    components: [
        NButton,
        NInputNumber,
        NModal
    ]
})

// 状态管理
const pinia = createPinia()

const app = createApp(App);
app.use(naive)
    .use(router)
    .use(pinia)
    .mount('#app')