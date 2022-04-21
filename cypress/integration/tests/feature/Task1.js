import Chance from "chance";
import { isSuperSet, union, intersection, difference } from "../../utils/helper";

// ------------------------  SET  ------------------------ //  
describe('Set Tests', () => {
    let currencySet = new Set(["USD", "RUR", "BYN"]);
    function checkSet(set) {
        set.forEach(currency => { cy.log(currency); })
    }

    it('Show Set values', () => {
        checkSet(currencySet);
    })

    it('Add values to the set', () => {
        cy.log("GBP add");
        currencySet.add("GBP");
        checkSet(currencySet);
        cy.log("BYN add");
        currencySet.add("BYN");
        checkSet(currencySet);
        cy.log("EUR add");
        currencySet.add("EUR");
        checkSet(currencySet);
        cy.log("PLN and EGP add");
        ["PLN", "EGP"].forEach((item) => currencySet.add(item));
        checkSet(currencySet);
    })

    it('Check if value is in the Set list', () => {
        cy.log("Is USD in the list?", currencySet.has("USD"));
        currencySet.delete("USD");
        cy.log("Is USD in the list now?", currencySet.has("USD"));
    })

    it('Get random values from Set', () => {
        //let myArr = Array.from([currencySet]); //1st way to create Array from Set
        let myArr = [...currencySet]; //2d way to create Array from Set
        cy.log("One random value", chance.pickone(myArr));
        let randomlength = +chance.integer({ min: 1, max: currencySet.size });
        cy.log("Random length", randomlength);
        let randArr = chance.pickset(myArr, randomlength);
        cy.log("Array of random number of values:");
        randArr.forEach((element) => cy.log(element));
    })

    it('Functions result for the Set', () => {
        let currencySet1 = new Set(["USD", "AMD", "BYN", "AZN"]);
        let currencySet2 = new Set(["AMD", "BYN"]);
        let currencySet3 = new Set(["BYN", "AZN", "AED", "CAD"]);
        cy.log("isSuperset", isSuperSet(currencySet1, currencySet2)); //true
        cy.log("union", checkSet(union(currencySet1, currencySet3))); // ["USD", "AMD", "BYN", "AZN", "AED", "CAD"]
        cy.log("intersection", checkSet(intersection(currencySet1, currencySet3))); // ["AZN", "BYN"]
        cy.log("difference", checkSet(difference(currencySet1, currencySet3))); // ["USD", "AMD"]
    })
})

// ------------------------  ARRAY  ------------------------ //  
describe('Array Tests', () => {
    let planets = [
        { name: "Mercury", radius: 2440, density: 5.43, distance: 0.395 },
        { name: "Venus", radius: 6052, density: 5.24, distance: 0.723 },
        { name: "Earth", radius: 6378, density: 5.52, distance: 1 },
        { name: "Mars", radius: 3396, density: 3.93, distance: 1.53 },
        { name: "Jupiter", radius: 71492, density: 1.33, distance: 5.21 },
        { name: "Saturn", radius: 60268, density: 0.69, distance: 9.551 },
        { name: "Uranus", radius: 25559, density: 1.27, distance: 19.213 },
        { name: "Neptune", radius: 24764, density: 1.64, distance: 30.07 }
    ];

    function printPlanets1(arr) {
        arr.forEach(planet => {
            // let newPlanet = new Object(planet);
            // console.log(newPlanet);
            const types = Object.keys(planet);
            types.forEach(key => {
                cy.log(`${key}: ${planet[key]}`);
            });
        })
    }

    function printPlanets2(arr) {
        cy.log(JSON.stringify(arr));
    }

    function printPlanets3(arr) {
        arr.forEach(planet => { cy.log(JSON.stringify(planet)); })
    }

    function printPlanets4(arr) {
        arr.forEach(planet => {
            cy.log(Object.keys(planet).map(key => key + ':' + planet[key]).join(', '));
        })
    }

    it('Show array of planets', () => {
        cy.log("====Print each key-value====");
        printPlanets1(planets);
        cy.log("====Print all in one string====");
        printPlanets2(planets);
        cy.log("====Print each Object in a string ver1====");
        printPlanets3(planets);
        cy.log("====Print each Object in a string ver2====");
        printPlanets4(planets);
    })

    it('Add solarSystem at the end of each object', () => {
        planets = planets.map(function (elements) {
            let planets = Object.assign({}, elements);
            planets.solarSystem = '';
            return planets;
        });
        printPlanets4(planets);
    })

    it('Add new object to the array', () => {
        planets.push({ name: "SomeNewPlanet", radius: 24764, density: 1.64, distance: 30.07, solarSystem: false });
        printPlanets4(planets);
    })

    it('Show sum of radius', () => {
        const sumRadius = planets.reduce((previousValue, currentValue) =>
            parseInt(previousValue + parseInt(currentValue.radius))
            , []);
        cy.log(sumRadius);
    })

    it('Show planets with distance > 5', () => {
        function getPlanetsWithDistance(arr, val) {
            return arr.filter((planet) => planet.distance > val);
        }
        cy.log("====Planets with distance > 5 ====")
        printPlanets4(getPlanetsWithDistance(planets, 5));
    })

    it('Remove object with required name from array', () => {
        planets.splice(planets.indexOf("SomeNewPlanet"), 1);
        printPlanets4(planets);
    })

    it('Sort array by planet radius (asc)', () => {
        function sortByRadius(arr) {
            let sortPlanetsRadius = arr.sort(function (a, b) { return a.radius - b.radius });
            return sortPlanetsRadius;
        }
        printPlanets4(sortByRadius(planets));
    })

    it('Sort array by planet name (desc)', () => {
        function sortPlanet(arr) {
            let sortPlanets = arr.sort(function (a, b) { return a.key - b.key });
            return sortPlanets.reverse();
        }
        printPlanets4(sortPlanet(planets, planets.name));
    })

    it('Show length of array', () => {
        cy.log(planets.length);
    })
})

// ------------------------  MAP  ------------------------ //
describe('Map Tests', () => {
    const planetsMap = new Map();
    function showMap(arr) {
        arr.forEach((value, key) => {
            cy.log(key + ': ' + Object.keys(value).map(objKey => objKey + ':' +
                value[objKey]).join(', '));
        });
    }

    it('Adding objects to Map', () => {
        planetsMap.set('Mercury', { radius: 2440, density: 5.43, distance: 0.395 });
        planetsMap.set('Venus', { radius: 6052, density: 5.24, distance: 0.723 });
        planetsMap.set('Earth', { radius: 6378, density: 5.52, distance: 1 });
        planetsMap.set('Mars', { radius: 3396, density: 3.93, distance: 1.53 });
        planetsMap.set('Jupiter', { radius: 71492, density: 1.33, distance: 5.21 });
        planetsMap.set('Saturn', { radius: 60268, density: 0.69, distance: 9.551 });
        planetsMap.set('Uranus', { radius: 25559, density: 1.27, distance: 19.213 });
        planetsMap.set('Neptune', { radius: 24764, density: 1.64, distance: 30.07 });
        cy.log("Added objects successfully");
    });

    it('Show values from planetsMap', () => {
        showMap(planetsMap);
    });

    it('Show values for Saturn', () => {
        // let planetInfo = planetsMap.get('Saturn');
        cy.log(Object.keys(planetsMap.get('Saturn')).map(objKey => objKey + ':' +
            planetsMap.get('Saturn')[objKey]).join(', '));
    });

    it('Show number of elements in the Map', () => {
        cy.log(planetsMap.size);
    })

    it('Check if planet with key value exists', () => {
        let testSet = new Set(["Mercury", "Not Mercury"]);
        testSet.forEach(element => {
            cy.log(`Map includes value with '${element}' key`, planetsMap.has(element));
        })
    });

    it('Remove object with key = "Uran"', () => {
        planetsMap.delete('Uranus');
        showMap(planetsMap);
    })

    it('Merge two Maps', () => {
        const newMap = new Map();
        newMap.set('Uranus', { radius: 25559, density: 1.27, distance: 19.213 });
        newMap.set('SomeNewPlanet', { radius: 24764, density: 1.64, distance: 30.07 })
        const mergedMap = new Map([...newMap, ...planetsMap]);
        showMap(mergedMap);
    })

    it('Show Objects data', () => {
        let planet = { planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395 }
        for (let key in planet) {
            cy.log(key, planet[key]);
        }
    })
})

// ------------------------  Other Tests  ------------------------ //
describe('Map Tests', () => {

    it('Gradation by random age', () => {
        function ageGradIfElse(age) {
            if (age < 13) {
                cy.log(`Age is ${age}: child`);
            } else if (age >= 13 && age < 19) {
                cy.log(`Age is ${age}: teen`);
            } else if (age >= 20 && age < 60) {
                cy.log(`Age is ${age}: adult`);
            } else {
                cy.log(`Age is ${age}: senior`);
            }
        }

        function ageGradSwitch(age) {
            switch (true) {
                case (age < 13):
                    cy.log(`Age is ${age}: child`);
                    break;
                case (age >= 13 && age < 19):
                    cy.log(`Age is ${age}: teen`);
                    break;
                case (age >= 20 && age < 60):
                    cy.log(`Age is ${age}: adult`);
                    break;
                case (age >= 60):
                    cy.log(`Age is ${age}: senior`);
                    break;
            }
        }

        function ageGradTernary(age) {
            (age < 3) ? cy.log(`Age is ${age}: child`) :
                (age >= 13 && age < 19) ? cy.log(`Age is ${age}: teen`) :
                    (age >= 20 && age < 60) ? cy.log(`Age is ${age}: adult`) : cy.log(`Age is ${age}: senior`);
        }

        cy.log("=== Get gradation by age with if/else ===");
        ageGradIfElse(chance.age());
        cy.log("=== Get gradation by age with switch ===");
        ageGradSwitch(chance.age());
        cy.log("=== Get gradation by age with ternary operator ===");
        ageGradTernary(chance.age());

    })
})