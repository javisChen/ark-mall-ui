import {post, get, del, put} from '@/utils/request'
import Base  from './product-base-api'

const api = {
  getCategories: Base.serviceName + '/v1/goods/categories',
}

export default api

export const getCategories = () => get({url: api.getCategories})