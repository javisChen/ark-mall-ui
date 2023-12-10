
export class Order {
    orderBase: OrderBaseDTO;
    orderAmount: OrderAmountDTO;
    orderReceive: OrderReceiveDTO;
    orderItems: OrderItemDTO[];
}

// OrderBaseDTO.ts
export class OrderBaseDTO {
    id: number;
    tradeNo: string;
    orderType: number;
    orderChannel: number;
    orderStatus: number;
    payStatus: number;
    payType: number;
    payTradeNo: string;
    payTime: Date;
    deliverTime: Date;
    receiveTime: Date;
    completionTime: Date;
    buyerRemark: string;
    buyerId: number;
    buyerName: string;
    sellerId: number;
    logisticsCompany: string;
    logisticsCode: string;
    createTime: Date;
}

// OrderAmountDTO.ts
export class OrderAmountDTO {
    expectAmount: number;
    actualAmount: number;
    freightAmount: number;
}

// OrderReceiveDTO.ts
export class OrderReceiveDTO {
    id: number;
    orderId: number;
    name?: string;
    mobile?: string;
    province?: string;
    city?: string;
    district?: string;
    address?: string;
    street?: string;
}

// OrderItemDTO.ts
export class OrderItemDTO {
    orderId?: number;
    tradeNo?: string;
    productName?: string;
    skuId?: number;
    price?: number;
    quantity?: number;
    expectAmount?: number;
    actualAmount?: number;
    picUrl?: string;
    specData?: string;
}
