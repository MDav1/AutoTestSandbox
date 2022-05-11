import prodctEnum from "../../utils/products";
import ProductInCartBase from "../base/productInCartBase";

class ProductInCart extends ProductInCartBase {

    constructor() {
        super();
    }

    checkProductIsPresent() {
        for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {

            this.checkProductName( // check product's name
                prodctEnum.PRODUCT_NAME_IN_CART_SELECTOR,
                prodctEnum.PRODUCT_NAME_VALUE[i], i
            );
            this.checkProductQty(
                prodctEnum.QTY_IN_CART_SELECTOR,
                prodctEnum.QTY_IN_CART_EXPECTED, i
            );
            this.checkProductPrice(
                prodctEnum.PRODUCT_PRICE_IN_CART_SELECTOR,
                prodctEnum.PRICE_ARRAY[i], i
            );
            this.checkProductName( // check product's color
                prodctEnum.PRODUCT_NAME_IN_CART_SELECTOR,
                prodctEnum.COLOR_NAME[i], i
            );
        }
    }

    removeFromCart() {
        for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {
            this.removeItem(prodctEnum.REMOVE_BUTTON_SELECTOR, i)
        }
    }
}

export default new ProductInCart;