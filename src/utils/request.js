import axios from 'axios'
import storage from 'store'
import {VueAxios} from './axios'
import {SUCCESS_CODE} from './code'
import {ACCESS_TOKEN} from '@/store/mutation-types'
import {useMessage} from 'naive-ui'
import {useAuthStore} from '@/store/auth'

// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 1000 * 60  // 请求超时时间,
})

const post = ({url, params, data}) => request({url, method: 'post', params, data})

const get = ({url, params, data}) => request({url, method: 'get', params, data})

const put = ({url, params, data}) => request({url, method: 'put', params, data})

const del = ({url, params, data}) => request({url, method: 'delete', params, data})

// 异常拦截处理器
const errorHandler = async (error) => {
    const $message = window.$message;
    const authStore = useAuthStore()
    const response = error.response;
    console.log('error', error)
    if (!response) {
        $message.error('服务器出了点小问题，请稍候重试~', {duration: 3000})
        return Promise.reject(error)
    }
    const responseStatus = response.status;
    const data = response.data
    // 从 localstorage 获取 token
    const authUser = authStore.authUser
    if (responseStatus === 403) {
        $message.error('该账号没有权限进行访问，请联系管理员进行授权')
    } else if (responseStatus === 404) {
        $message.error(data.msg)
    } else if (responseStatus === 401) {
        $message.error('会话已失效，请重新登录')
        if (authUser) {
            await authStore.logout();
        }
        window.location.hash = 'login'
    } else if (responseStatus === 400 || responseStatus === 500) {
        const result = response.data
        let description;
        const {code, msg, data} = result
        if (code === 'A0003') {
            description = result.data.defaultMsg
        } else {
            description = result.msg
        }
    } else if (responseStatus === 503) {
        let msg
        if (response.data) {
            msg = response.data.msg
        } else {
            msg = response.statusText
        }
    } else {
    }
    return Promise.resolve();
}

// request interceptor
request.interceptors.request.use(config => {
    const authStore = useAuthStore()
    if (authStore.authUser) {
        const token = authStore.authUser.token
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
    const serverResponse = response.data
    if (serverResponse.code === SUCCESS_CODE) {
        return Promise.resolve({data: serverResponse.data, resp: serverResponse})
    }
    window.$message.error({
        content: serverResponse.msg,
        duration: 4
    })


    const authStore = useAuthStore();
    return Promise.reject(serverResponse)
}, errorHandler)

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, request)
    }
}

export default request

export {
    installer as VueAxios,
    request as axios,
    post,
    get,
    del,
    put,
}
