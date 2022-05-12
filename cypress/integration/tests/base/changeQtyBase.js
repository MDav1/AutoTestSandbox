import Chance from "chance";

class ChangeQtyBase {

    constructor() {
    }

    saveRandomQty(value) {
        value.push(Math.floor(((Math.random() * 10) + 1)));
    }

    saveRandomQtyChance(value){
        value.push(+chance.integer({ min: 1, max: 10 })); // other solution with chance
    }

    changeQtyforItem(selector, value, index){
        cy.get(selector).eq(index).select(value - 1).wait(3000);
    }

    checkNewTotalPrice(selector, totalPrice){
        cy.get(selector).invoke('text')
                .then((priceText) => cy.wrap(+priceText.slice(1))
                    .should('eq', +totalPrice.toFixed(2)))
    }
    
}

export default ChangeQtyBase;