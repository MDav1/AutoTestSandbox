import { When, Then, Given, And } from 'cypress-cucumber-preprocessor/steps'
import { googleUrl, googleAPIUrl } from "../../utils/products";
import Products from "../functions/addProduct_function";
import ProductInCart from "../functions/productInCart_function";

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
    Products.addProduct();
})

Then('I check expected product is presented in the cart', () => {
    ProductInCart.checkProductIsPresent();
})

And('I remove items from the card', () => {
    ProductInCart.removeFromCart();
})







