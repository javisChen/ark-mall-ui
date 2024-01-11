import {createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './all.css'
import './common.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import {initFilters} from "@/filter";

import {
    create,
    NButton,
    NInputNumber,
    NModal,
    NCard,
    NSpin,
    NEllipsis,
    NPagination,
    NSpace,
    NSelect,
    NForm,
    NRow,
    NCol,
    NFormItem,
    NInput,
    NDataTable,
    NTable,
    NIcon,
    NCheckbox
} from 'naive-ui'

const naive = create({
    components: [
        NIcon,
        NButton,
        NEllipsis,
        NInputNumber,
        NModal,
        NCard,
        NSpin,
        NPagination,
        NSpace,
        NSelect,
        NForm,
        NFormItem,
        NInput,
        NRow,
        NCol,
        NDataTable,
        NTable,
        NCheckbox
    ]
})

// 状态管理
const pinia = createPinia()

const app = createApp(App);
app.use(naive)
    .use(router)
    .use(pinia)
    .mount('#app')

initFilters(app);