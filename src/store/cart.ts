import {defineStore} from 'pinia'
import {addCartItem, deleteCartItems, getCartItems, updateCartItemQuantity} from "@/api/trade/trade-api"
import {useAuthStore} from "./auth";
import {buildProductDesc} from '@/utils/util'

export const useCartStore
    = defineStore('cart', {
    state: () => {
        return {
            carts: null as Cart[],
        }
    },
    getters: {
        count: (state) => {
            return state.carts ? state.carts.length : 0
        },
        checkedCartItems: (state) => {
            if (!state.carts) {
                return [];
            }
            return state.carts.filter(cartItem => cartItem.checked)
        },
        totalQuantity: (state) => {
            if (!state.carts) {
                return 0;
            }
            return state.carts.reduce(
                (acc, cartItem) => {
                    return acc + (cartItem.checked ? cartItem.quantity : 0);
                }, 0
            )
        },
        totalPrice: (state) => {
            if (!state.carts) {
                return 0;
            }
            return state.carts.reduce(
                (acc, cartItem) => {
                    return acc + (cartItem.checked ? cartItem.price * cartItem.quantity : 0);
                }, 0
            )
        },
    },
    actions: {
        async loadCartInfo() {
            const userAuth = useAuthStore()
            if (!userAuth.authUser) {
                return;
            }
            try {
                const result = await getCartItems()
                this.carts = result.data
                this.carts.forEach(item => {
                    item.specData = JSON.parse(item.specData)
                    item.showProductName = buildProductDesc(item)
                })
                console.log('cart loaded successfully')
            } catch (e) {
                console.log(e)
            }
        },
        checked(checked, item) {
            this.carts.forEach(cartItem => {
                if (cartItem.id === item.id) {
                    cartItem.checked = checked
                }
            })
        },
        checkedAll(checked) {
            this.carts.forEach(cartItem => cartItem.checked = checked)
        },
        async removeCartItem(e, item) {
            try {
                await deleteCartItems({cartItemIds: [item.id]})
                this.carts = this.carts.filter(cartItem => cartItem.id !== item.id)
            } catch (e) {
                console.log(e)
            }
        },
        async addCartItem(skuId) {
            try {
                await addCartItem({skuId})
                await this.loadCartInfo()
            } catch (e) {
                throw e;
            }
        },
        async changeQuantity(e, cartItem) {
            this.carts.forEach(item => {
                if (item.id === cartItem.id) {
                    item.quantity = cartItem.quantity
                }
            })
            await updateCartItemQuantity({cartItemId: cartItem.id, quantity: cartItem.quantity})
        },
    }
})


class Cart {
    /**
     * 实际数量
     */
    actualAmount: number;
    /**
     * 买家ID
     */
    buyerId: string;
    /**
     * 是否已检查
     */
    checked: boolean;
    /**
     * 预期数量
     */
    expectAmount: number;
    /**
     * ID
     */
    id: string;
    /**
     * 图片URL
     */
    picUrl: string;
    /**
     * 价格
     */
    price: number;
    /**
     * 产品名称
     */
    productName: string;
    /**
     * 数量
     */
    quantity: number;
    /**
     * SKU ID
     */
    skuId: string;
    /**
     * 规格数据
     */
    specData: Array<{
        /**
         * 属性名称
         */
        attrName: string;
        /**
         * 属性值
         */
        attrValue: string;
    }>;

}