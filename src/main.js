import {createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './all.css'
import './common.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import {fenToYuan} from '@/utils/util';
import accounting from 'accounting'
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
    NPagination, NSpace, NSelect, NForm, NRow, NCol, NFormItem, NInput,
} from 'naive-ui'

const naive = create({
    components: [
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
        NCol
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