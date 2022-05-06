import { When, Then, Given, And } from 'cypress-cucumber-preprocessor/steps'
import prodctEnum from "../../utils/products";
import Chance from "chance";

And('I change quntity of products in the card', () => {
    for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {
        prodctEnum.CHANGED_QTY.push(Math.floor(((Math.random() * 10) + 1))); // save random qnty
        prodctEnum.CHANGED_QTY.push(+chance.integer({ min: 1, max: 10 })); // other solution with chance
        cy.get(prodctEnum.QTY_IN_CART_SELECTOR).eq(i).select(prodctEnum.CHANGED_QTY[i] - 1); // change qty
    }
})

Then('I check total price is changed accordingly', () => {
    let totalPrice = 0;
    for (let i = 0; i < prodctEnum.PRODUCT_NAME_VALUE.length; i++) {
        totalPrice += (+prodctEnum.PRICE_ARRAY[i].slice(1) * prodctEnum.CHANGED_QTY[i]); // get total price
    }
    cy.wait(3000) // wait for total price to be changed
    cy.get(prodctEnum.TOTAL_PRICE_SELECTOR).invoke('text')
        .then((priceText) => cy.wrap(+priceText.slice(1))
            .should('eq', +totalPrice.toFixed(2))) // check total price
})
