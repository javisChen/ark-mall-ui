import {post, get, del, put} from '@/utils/request'
import Base  from './order-base-api'

const api = {
  cartItem: Base.serviceName + '/v1/cart/item/add',
  checkedCartItem: Base.serviceName + '/v1/cart/item/checked',
  cartItems: Base.serviceName + '/v1/cart/items',
  createOrder: Base.serviceName + '/v1/order/create',
  getOrderInfo: Base.serviceName + '/v1/order/info',
}

export default api

export const createOrder = (data) => post({url: api.createOrder, data})

export const addCartItem = (data) => post({url: api.cartItem, data})

export const checkedCartItem = (data) => post({url: api.checkedCartItem, data})

export const getCartItems = () => get({url: api.cartItems})

export const getOrderInfo = (params) => get({url: api.getOrderInfo, params})
