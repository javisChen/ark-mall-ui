import accounting from "accounting";
import {fenToYuan} from "@/utils/util";
import {
    DICT_ORDER_STATUS,
    DICT_PAY_TYPE
} from "@/utils/constants";

export function initFilters(app) {
    app.config.globalProperties.$filters = {
        formatPrice(value) {
            return accounting.formatMoney(fenToYuan(value), '¥', 2, '', '.', '%s%v')
        },
        formatRawPrice(value) {
            return accounting.formatMoney(fenToYuan(value), '', 2, '', '.', '%s%v')
        },
        translateOrderStatus(value) {
            return DICT_ORDER_STATUS[value]
        },
        translatePayType(value) {
            return DICT_PAY_TYPE[value]
        },
    }
}
