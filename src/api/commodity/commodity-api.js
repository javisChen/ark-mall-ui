import {post, get, del, put} from '@/utils/request'
import Base  from './commodity-base-api'

const api = {
  info: Base.serviceName + '/v1/commodity/details',
  search: Base.serviceName + '/v1/commodity/search',
}

export default api

export const getInfo = (params) => get({url: api.info, params})
export const search = (params) => post({url: api.search, params})