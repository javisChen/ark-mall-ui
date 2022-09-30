export class Order {
    orderType: number
    orderChannel: number
    orderItems: OrderItem[]
    receiveInfo: ReceiveInfo
}

export class OrderItem {
    skuId: number
    quantity: number

    constructor(skuId: number, quantity: number) {
        this.skuId = skuId;
        this.quantity = quantity;
    }
}

export class ReceiveInfo {
    name: string
    mobile: string
    province: string
    city: string
    district: string
    street: string
    address: string


    constructor(name: string,
                mobile: string,
                province: string,
                city: string,
                district: string,
                street: string,
                address: string) {
        this.name = name;
        this.mobile = mobile;
        this.province = province;
        this.city = city;
        this.district = district;
        this.street = street;
        this.address = address;
    }
}