import accounting from "accounting";
import {fenToYuan} from "@/utils/util";
import {
    DICT_ORDER_STATUS,
    DICT_PAY_TYPE
} from "@/utils/constants";

export function initFilters(app) {
    app.config.globalProperties.$filters = {
        formatShowPrice(value) {
            return '¥' + accounting.format(fenToYuan(value))
        },
        translateOrderStatus(value) {
            return DICT_ORDER_STATUS[value]
        },
        translatePayType(value) {
            return DICT_PAY_TYPE[value]
        },
    }
}
