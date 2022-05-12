import { When, Then, Given, And } from 'cypress-cucumber-preprocessor/steps'
import ChangeQty from "../functions/changeQty_function";

And('I change quntity of products in the card', () => {
    ChangeQty.changeQtyInCart();
})

Then('I check total price is changed accordingly', () => {
    ChangeQty.checkTotalPrice();
})
