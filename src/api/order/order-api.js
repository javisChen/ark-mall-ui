import {post, get, del, put} from '@/utils/request'
import Base  from './order-base-api'

const api = {
  cartItem: Base.serviceName + '/v1/cart/item/add',
  cartItems: Base.serviceName + '/v1/cart/items',
}

export default api

export const addCartItem = (data) => post({url: api.cartItem, data})

export const getCartItems = () => get({url: api.cartItems})
