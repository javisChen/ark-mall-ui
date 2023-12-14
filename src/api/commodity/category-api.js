import {post, get, del, put} from '@/utils/request'
import Base  from './product-base-api'

const api = {
  list: Base.serviceName + '/v1/goods/categories',
}

export default api

export const getList = () => get({url: api.list})