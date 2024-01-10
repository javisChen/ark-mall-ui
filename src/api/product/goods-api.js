import {post, get, del, put} from '@/utils/request'
import Base  from './product-base-api'

const api = {
  info: Base.serviceName + '/v1/goods/details',
  search: Base.serviceName + '/v1/goods/search',
}

export default api

export const getInfo = (params) => get({url: api.info, params})

export const search = (params) => get({url: api.search, params})