import Chance from "chance";

export const baseUrl = "https://www.xe.com/currencyconverter";
export const currencySet = [
    { base: "USD" },
    { date: "2018-02-13" },
    {
        rates: [
            { shortName: "CAD", rate: 1.26 },
            { shortName: "CHF", rate: 0.94 },
            { shortName: "EUR", rate: 0.92 },
            { shortName: "GBP", rate: 0.76 }
        ]
    }
]

export const currencyBase = currencySet.map(function (element) { // getting base currency
    if (Object.keys(element) == 'base') {
        return `${element.base}`;
    }
}).filter(Boolean).toString();

let ratesArr = currencySet.find(element => element.rates).rates; // getting rates object
let currencyName = ratesArr.map(function (element) { // getting array of names
    return `${element.shortName}`;
});

// let ratesIndex = parseInt(currencySet.map(function(element,i){ // another way to get rates
//     if( Object.keys(element) == 'rates'){
//     return i;  }    
//  }).filter(Boolean))
//  console.log(currencySet[ratesIndex].rates)

export const randCurr = chance.pickone(currencyName); // getting random currency name

export const rateOfCurr = ratesArr.map(function (element) { //getting rate value for random currency
    if (element.shortName == randCurr) {
        return `${element.rate}`;
    }
}).filter(Boolean);