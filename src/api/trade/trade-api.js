import {post, get, del, put} from '@/utils/request'
import Base from './trade-base-api'
import Order from "@/views/order/Order.vue";

const api = {
    cartItem: Base.serviceName + '/v1/cart/item/save',
    deleteCartItems: Base.serviceName + '/v1/cart/item/delete',
    checkedCartItem: Base.serviceName + '/v1/cart/item/checked',
    cartItems: Base.serviceName + '/v1/cart/items',
    updateCartItemQuantity: Base.serviceName + '/v1/cart/item/quantity',

    createOrder: Base.serviceName + '/v1/order/create',
    getOrderInfo: Base.serviceName + '/v1/order/details',
    orderReceive: Base.serviceName + '/v1/order/receive',

    getUserOrders: Base.serviceName + '/v1/user/order/pages',
    getUserReceives: Base.serviceName + '/v1/user/receive/pages',
    saveUserReceives: Base.serviceName + '/v1/user/receive/save',
}

export default api

export const createOrder = (data) => post({url: api.createOrder, data})

export const addCartItem = (data) => post({url: api.cartItem, data})

export const deleteCartItems = (data) => post({url: api.deleteCartItems, data})

export const updateCartItemQuantity = (data) => put({url: api.updateCartItemQuantity, data})

export const checkedCartItem = (data) => post({url: api.checkedCartItem, data})

export const getCartItems = () => get({url: api.cartItems})

export const getOrderInfo = (params) => get({url: api.getOrderInfo, params})

export const getUserOrders = (data) => post({url: api.getUserOrders, data})

export const getUserReceives = (data) => post({url: api.getUserReceives, data})

export const saveUserReceives = (data) => post({url: api.saveUserReceives, data})

export const orderReceive = (data) => post({url: api.orderReceive, data})