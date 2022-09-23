import {post, get, del, put} from '@/utils/request'
import Base  from './order-base-api'

const api = {
  addCartItem: Base.serviceName + '/v1/cart/item/add',
}

export default api

export const addCartItem = (data) => post({url: api.addCartItem, data})
