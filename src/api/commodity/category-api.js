import {post, get, del, put} from '@/utils/request'
import Base  from './commodity-base-api'

const api = {
  list: Base.serviceName + '/v1/categories',
}

export default api

export const getList = () => get({url: api.list})