import {post, get, del, put} from '@/utils/request'
import Base  from './commodity-base-api'

const api = {
  list: Base.serviceName + '/v1/categories',
  tree: Base.serviceName + '/v1/category/tree',
  create: Base.serviceName + '/v1/category/create',
  update: Base.serviceName + '/v1/category/update',
  info: Base.serviceName + '/v1/category/info',
}

export default api

export const getList = () => get({url: api.list})