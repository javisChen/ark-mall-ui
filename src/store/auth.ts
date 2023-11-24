import {defineStore} from 'pinia'
import {login as loginReq, logout as logoutReq} from '../api/auth/auth-api'
import storage from 'store'
import {ACCESS_TOKEN, AUTH_USER_NAME} from '@/store/mutation-types'
import { useCartStore } from './cart'


// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
function clearStorage() {
    storage.remove(AUTH_USER_NAME)
    storage.remove(ACCESS_TOKEN)
}

// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAuthStore
    = defineStore('auth', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            user: null as LoginUser,
        }
    },
    getters: {
        authUser: (state) => {
            if (state.user) {
                return state.user;
            }
            const authUsername = storage.get(AUTH_USER_NAME)
            const accessToken = storage.get(ACCESS_TOKEN)
            if (!accessToken) {
                return null;
            }
            state.user = {
                username: authUsername,
                token: accessToken
            }
            return state.user

        }
    },
    actions: {
        async login(params) {
            try {
                const result = await loginReq({
                    username: params.username,
                    password: params.password
                })
                // todo 暂时先这样写，不严谨哈
                storage.set(ACCESS_TOKEN, result.data.accessToken, result.data.expires * 1000)
                storage.set(AUTH_USER_NAME, params.username)
                this.user = {
                    username: params.username,
                    token: result.data.accessToken,
                }
                // 登录成功后加载用户购物车信息
                await useCartStore().loadCartInfo()
                return true
            } catch (e) {
                return false
            }
        },
        async logout() {
            try {
                await logoutReq({})
                clearStorage();
                this.user = null
                return true
            } catch (e) {
                return false
            }
        }
    }
})

interface LoginUser {
    username: String
    token: String
}