import {defineStore} from 'pinia'
import {ref} from "vue";
import {login as loginReq} from '../api/auth/auth-api'
import storage from 'store'
const ACCESS_TOKEN = 'Access-Token'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAuthStore
    = defineStore('auth', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            user: null as LoginUser,
        }
    },
    actions: {
        async login(params) {
            console.log('login process...')
            try {
                const result = await loginReq({
                    username: params.username,
                    password: params.password
                })
                storage.set(ACCESS_TOKEN, result.data.accessToken, result.data.expires * 1000)
                console.log('login success', result)
                return true
            } catch (e) {
                console.log('login fail', e)
                return false
            }
        }
    }
})

interface LoginUser {
    username: String
    userId: Number
}