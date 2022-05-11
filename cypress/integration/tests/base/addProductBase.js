class addProductBase {

    constructor() {
    }

    clickSearch(selector) {
        cy.get(selector).click();
    }

    searchItem(selector, value) {
        cy.get(selector).clear().type(value).type('{enter}');
    }

    checkItemexists(value) {
        cy.get(value).should('exist');
    }

    clickOnItem(value) {
        cy.get(value).parent().click().wait(3000);
    }

    savePrice(selector, priceArray) {
        cy.get(selector).invoke('text')
            .then((price) => cy.wrap(price)).then((price) => priceArray.push(price));
    }

    savePriceforOneItem(selector) {
        cy.get(selector).invoke('text')
            .then((price) => cy.wrap(price)).as('textPrice');
    }

    clickBuy(selector) {
        cy.get(selector).click({ force: true }).wait(3000);
    }

    clickRandomColor(selector) {
        cy.get(selector).children()
            .then(($button) => {
                const items = $button.toArray()
                return Cypress._.sample(items)
            }).click()
    }

    saveSelectedColor(colorName, nameArray) {
        cy.get(colorName).invoke('text')
            .then((color) => cy.wrap(color))
            .then((color) => nameArray.push(color));
    }

    clickBuyWithColor(selector) {
        cy.get(selector).click().wait(3000);
    }

    clickEnumColor(selector) {
        cy.get(selector).click(); // e.g cy.get(prodctEnum.COLOR_BUTTON[i]).click();
    }

    saveColorNameFromEnum(selector, nameArray) {
        let colorName = selector.slice(0, -1).match(/(?<=color: ).*$/);
        nameArray.push(colorName[0]);
    } // e.g. let productColor = prodctEnum.COLOR_BUTTON[i].slice(0, -1).match(/(?<=color: ).*$/);
    // prodctEnum.COLOR_NAME.push(productColor[0]);

    clickContinueShopping(selector){
        cy.get(selector).click();
    }

}

export default addProductBase;