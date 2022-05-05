import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';
import Chance from "chance";
import {currencyBase, randCurr, rateOfCurr, baseUrl} from "../../utils/curency";

Given('I am on converter page', () => {
    cy.visit(baseUrl);
    cy.get('[style="display: flex; justify-content: flex-end;"] > .ctapkr').click({ force: true }).wait(1000);
})

When('I convert values', () => {
    cy.get('#midmarketFromCurrency').click({ force: true }).clear().type(currencyBase).type('{enter}');
    cy.get('#midmarketToCurrency').click({ force: true }).clear().type(randCurr).type('{enter}');
    cy.get('button[type=submit]').click({ force: true }).wait(1000);
})

Then('I check rate is correct', () => {
    cy.get('.result__BigRate-sc-1bsijpp-1').should("contains.text", rateOfCurr);  
})

// describe('Test converter', () => {
//     it('Test', () => {
//         cy.log(rateOfCurr);
//         cy.log(randCurr);
//         cy.visit('');
//         cy.get('[style="display: flex; justify-content: flex-end;"] > .ctapkr').click({ force: true }).wait(1000);
//         cy.get('#midmarketFromCurrency').click({ force: true }).clear().type(currencyBase).type('{enter}');
//         cy.get('#midmarketToCurrency').click({ force: true }).clear().type(randCurr).type('{enter}');
//         cy.get('button[type=submit]').click({ force: true }).wait(1000);
//         cy.get('.result__BigRate-sc-1bsijpp-1').should("contains.text", rateOfCurr);       
//     })
// });