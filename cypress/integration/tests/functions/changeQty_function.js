import prodctEnum from "../../utils/products";
import ChangeQtyBase from "../base/changeQtyBase";

class ChangeQty extends ChangeQtyBase {

    constructor() {
        super();
    }
        changeQtyInCart(){
            for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {
                this.saveRandomQty(prodctEnum.CHANGED_QTY);
                this.changeQtyforItem(
                    prodctEnum.QTY_IN_CART_SELECTOR, 
                    prodctEnum.CHANGED_QTY[i], i);
            }
        }

        checkTotalPrice(){
            let totalPrice = 0;
            for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {
                totalPrice += (+prodctEnum.PRICE_ARRAY[i].slice(1) * prodctEnum.CHANGED_QTY[i]); // get total price
            }
            this.checkNewTotalPrice(prodctEnum.TOTAL_PRICE_SELECTOR, totalPrice);
        }
}

export default new ChangeQty;