class ProductInCartBase {

    constructor() {
    }

    checkProductName(selector, value, index) {
        cy.get(selector).eq(index).invoke('text')
            .should('contain', value);
    }

    checkProductQty(selector, value, index) {
        cy.get(selector).eq(index)
            .should('have.value', value);
    }

    checkProductPrice(selector, value, index) {
        cy.get(selector).eq(index).invoke('text')
            .should('eq', value);
    }

    checkPriceOneItem(selector) {
        cy.get('@textPrice').then((textPrice) =>
            cy.get(selector).eq(i).invoke('text').should('eq', textPrice))
    } // e.g. selector is prodctEnum.PRODUCT_PRICE_IN_CART_SELECTOR

    removeItem(selector, index) {
        cy.get(selector).eq(index).click();
    }
}

export default ProductInCartBase;