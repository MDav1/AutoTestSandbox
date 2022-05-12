import prodctEnum from "../../utils/products";
import addProductBase from "../../tests/base/addProductBase";

class Products extends addProductBase {

    constructor() {
        super();
    }

    addProduct() {
        for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {
            this.clickSearch(prodctEnum.SEARCH_ICON_SELECTOR);
            this.searchItem(prodctEnum.SEARCH_BAR_SELECTOR, prodctEnum.PRODUCT_NAME_VALUE[i]);
            this.checkItemexists(prodctEnum.PRODUCT_HREF[i]);
            this.clickOnItem(prodctEnum.PRODUCT_HREF[i]);
            this.savePrice(prodctEnum.PRODUCT_PRICE_SELECTOR, prodctEnum.PRICE_ARRAY);
            this.clickBuy(prodctEnum.BUY_BUTTON_SELECTOR);
            // check if color exists
            cy.get('body').then((body) => {
                if (body.find(prodctEnum.COLOR_VARIANT_CHECK_SELECTOR).length > 0) {
                    this.clickRandomColor(prodctEnum.COLOR_VARIANT_CHECK_SELECTOR);
                    this.saveSelectedColor(prodctEnum.SELECTED_COLOR_NAME, prodctEnum.COLOR_NAME);
                    this.clickBuyWithColor(prodctEnum.BUY_BOTTON_WITH_COLOR);
                }
                else {
                    prodctEnum.COLOR_NAME.push(""); // if color not exists save empty value in the array
                }
            });
            if (i < prodctEnum.PRODUCT_NAME_VALUE.length - 1) {
                this.clickContinueShopping(prodctEnum.CONTINUE_SHOPPING_BUTTON_SELECTOR)
            }
        }
    }

    getProductNameFromAPI() {
        cy.request(googleAPIUrl)
            .then((response) => { cy.get(response.body.products) })
            .then((data) => {
                let productName = [...data].map((element) => { // getting array of names
                    if (`${element.display_name}` == prodctEnum.PRODUCT_NAME_VALUE[0])
                        return `${element.display_name}`;
                }).filter(Boolean).toString();
                console.log(productName)
                return productName;
            });
    }
}

export default new Products;