import { When, Then, Given, And } from 'cypress-cucumber-preprocessor/steps'
import { googleUrl, googleAPIUrl } from "../../utils/products";
import Products from "../functions/addProduct_function";
import ProductInCart from "../functions/productInCart_function";

Given('I am on the Accessories page', () => {
    cy.visit(googleUrl);
})

When('I select the product', () => {
    Cypress.on('uncaught:exception', (err, runnable) => { return false }) // prevents Cypress from failing the test becase of errors in web application
    Products.addProduct();
})

Then('I check expected product is presented in the cart', () => {
    ProductInCart.checkProductIsPresent();
})

And('I remove items from the card', () => {
    ProductInCart.removeFromCart();
})







