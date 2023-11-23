import {defineStore} from 'pinia'
import {getCartItems, updateCartItemQuantity, deleteCartItems} from "@/api/trade/trade-api"

export const useCartStore
    = defineStore('cart', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            carts: null as Cart[],
        }
    },
    getters: {
        count: (state) => {
            return state.carts ? state.carts.length : 0
        },
        cartItems: (state) => {
            return state.carts;
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
        async loadCart() {
            try {
                const result = await getCartItems()
                this.carts = result.data
                this.carts.forEach(item => {
                    item.specData = JSON.parse(item.specData)
                })
            } catch (e) {
                console.log(e)
            }
        },
        checked(checked, item) {
            console.log(checked)
            this.carts.forEach(cartItem => {
                if (cartItem.id === item.id) {
                    cartItem.checked = checked
                }
            })
        },
        checkedAll(checked) {
            this.carts.forEach(cartItem => {
                cartItem.checked = checked
            })
        },
        async remove(e, item) {
            this.carts = this.carts.filter(cartItem => cartItem.id !== item.id)
            try {
                await deleteCartItems({cartItemIds: [item.id]})
            } catch (e) {
                console.log(e)
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