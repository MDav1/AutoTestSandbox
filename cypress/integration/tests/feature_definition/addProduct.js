import { When, Then, Given, And } from 'cypress-cucumber-preprocessor/steps'
import { googleUrl, googleAPIUrl } from "../../utils/products";
import prodctEnum from "../../utils/products";

Given('I am on the Accessories page', () => {
    cy.visit(googleUrl);
})

When('I select the product', () => {
    // cy.request(googleAPIUrl)
    //     .then((response) => { cy.get(response.body.products) })
    //     .then((data) => {
    //         let currencyName = [...data].map((element) => { // getting array of names
    //             if (`${element.display_name}` == "Google Pixel Stand (2nd gen)")
    //                 return `${element.display_name}`;
    //         }).filter(Boolean).toString();
    //         console.log(currencyName)
    //         return currencyName;
    //     });
    Cypress.on('uncaught:exception', (err, runnable) => { return false }) // prevents Cypress from failing the test becase of errors in web application
    for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {
        cy.get(prodctEnum.SEARCH_ICON_SELECTOR).click(); // click on Serach field
        cy.get(prodctEnum.SEARCH_BAR_SELECTOR).clear().type(prodctEnum.PRODUCT_NAME_VALUE[i]).type('{enter}'); // enter item
        cy.get(prodctEnum.PRODUCT_HREF[i]).should('exist'); // check that item exists
        cy.get(prodctEnum.PRODUCT_HREF[i]).parent().click().wait(3000); // click on a found item
        cy.get(prodctEnum.PRODUCT_PRICE_SELECTOR).invoke('text')
            .then((price) => cy.wrap(price)).then((price) => prodctEnum.PRICE_ARRAY.push(price)); // save the price
        // cy.get(prodctEnum.PRODUCT_PRICE_SELECTOR).invoke('text')
        //     .then((price) => cy.wrap(price)).as('textPrice'); // works to save the price for one item
        cy.get(prodctEnum.BUY_BUTTON_SELECTOR).click({ force: true }).wait(3000); // click buy
        // check if color exists
        cy.get('body').then((body) => {
            if (body.find(prodctEnum.COLOR_VARIANT_CHECK_SELECTOR).length > 0) {
                cy.get(prodctEnum.COLOR_VARIANT_CHECK_SELECTOR).children()
                    // click a random color button
                    .then(($button) => {
                        const items = $button.toArray()
                        return Cypress._.sample(items)
                    }).click()
                cy.get(prodctEnum.SELECTED_COLOR_NAME).invoke('text') // save selected color
                    .then((color) => cy.wrap(color))
                    .then((color) => prodctEnum.COLOR_NAME.push(color)); 
                cy.get(prodctEnum.BUY_BOTTON_WITH_COLOR).click().wait(3000); // click buy
                //  below code if color button is enum
                // cy.get(prodctEnum.COLOR_BUTTON[i]).click();
                // let productColor = prodctEnum.COLOR_BUTTON[i].slice(0, -1).match(/(?<=color: ).*$/); // get color's name
                // prodctEnum.COLOR_NAME.push(productColor[0]); // save solor's name in the array
            }
            else {
                prodctEnum.COLOR_NAME.push(""); // if color not exists save empty value in the array
            }
        });
        if (i < prodctEnum.PRODUCT_NAME_VALUE.length - 1) {
            cy.get(prodctEnum.CONTINUE_SHOPPING_BUTTON_SELECTOR).click(); // click continue shopping
        }
    }
})

Then('I check expected product is presented in the cart', () => {
    for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {
        cy.get(prodctEnum.PRODUCT_NAME_IN_CART_SELECTOR).eq(i).invoke('text')
            .should('contain', prodctEnum.PRODUCT_NAME_VALUE[i]); // check product name
        cy.get(prodctEnum.QTY_IN_CART_SELECTOR).eq(i)
            .should('have.value', prodctEnum.QTY_IN_CART_EXPECTED); // check qty of the products
        cy.get(prodctEnum.PRODUCT_PRICE_IN_CART_SELECTOR).eq(i).invoke('text')
            .should('eq', prodctEnum.PRICE_ARRAY[i]); // check product's price
        // cy.get('@textPrice').then((textPrice) =>
        //     cy.get(prodctEnum.PRODUCT_PRICE_IN_CART_SELECTOR).eq(i).invoke('text').should('eq', textPrice)) // works for one item
        cy.get(prodctEnum.PRODUCT_NAME_IN_CART_SELECTOR).eq(i).invoke('text')
            .should('contain', prodctEnum.COLOR_NAME[i]); // check product's color
    }
})

Then('I remove items from the card', () => {
    for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {
        cy.get(prodctEnum.REMOVE_BUTTON_SELECTOR).eq(i).click();
    }
})







