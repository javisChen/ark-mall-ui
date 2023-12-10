export const DICT_ORDER_STATUS_WAIT_PAY = 1;
export const DICT_ORDER_STATUS_WAIT_DELIVER = 2;
export const DICT_ORDER_STATUS_WAIT_RECEIVE = 3;
export const DICT_ORDER_STATUS_WAIT_EVALUATE = 4;
export const DICT_ORDER_STATUS_COMPLETED = 10;

export const DICT_ORDER_STATUS = {
  1: "待支付",
  2: "待发货",
  3: "待收货",
  4: "待评价",
  10: "已完成"
}

export const DICT_PAY_TYPE = {
  1: "微信支付",
  2: "支付宝",
}

export const DICT_PAY_STATUS = {
  1: "未支付",
  2: "支付中",
  3: "支付成功",
  4: "支付失败"
}
