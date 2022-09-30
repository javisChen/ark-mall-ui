import {post, get, del, put} from '@/utils/request'
import Base  from './pay-base-api'

const api = {
  createPayOrder: Base.serviceName + '/v1/pay/order/create',
  getPayOrderStatus: Base.serviceName + '/v1/pay/order/status',
}

export const createPayOrder = (data) => post({url: api.createPayOrder, data})

export const getPayOrderStatus = (params) => get({url: api.getPayOrderStatus, params})
