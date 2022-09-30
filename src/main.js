import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './all.css'

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

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App);
app.use(naive)
    .use(router)
    .mount('#app')