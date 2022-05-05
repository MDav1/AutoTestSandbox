import { googleAPIUrl } from "../../utils/products";

describe('Task 1', () => {

  before(() => {
    cy.request(googleAPIUrl).its('body').as("products");
  });

  it('Show response with before', function () {
    cy.log("Всего продуктов в списке", this.products.products.length);
    let product1 = this.products.products[0];
    cy.log("=== Информация по первому продукту ===");
    for (let key in product1) {
      cy.log(key, product1[key]);
    }
  })
})

describe('Task 2', () => {
  it('Show response without before', function () {
    cy.request(googleAPIUrl).then((response) => {
      cy.wrap(response.body.products).as("products");
    })

    cy.get("@products").then(() => {
      cy.log("Всего продуктов в списке", this.products.length);
      let product1 = this.products[0];
      cy.log("=== Информация по первому продукту ===");
      for (let key in product1) {
        cy.log(key, product1[key]);
      }
    })
  })

})

describe('Task 3', () => {
  it('Show response with Promise', function () {

    function getUrl(url, callback) {
      let response = fetch(url);
      window.onload = () => callback(null, response);
      window.onerror = () => callback(new Error('Ошибка'));
    }

    function promisify(f) {
      return function (...args) {
        return new Promise((resolve, reject) => {
          function callback(err, result) {
            if (err) {
              return reject(err);
            } else {
              resolve(result);
            }
          }

          args.push(callback);
          f.call(this, ...args);
        });
      };
    };

    let loadUrlPromise = promisify(getUrl);
    loadUrlPromise(cy.request(googleAPIUrl)
      .then((response) => { cy.get(response.body.products) })
      .then((data) => {
        cy.log("Всего продуктов в списке", data.length);
        let product1 = data[0];
        cy.log("=== Информация по первому продукту ===");
        for (let key in product1) {
          cy.log(key, product1[key]);
        }
      })
    )
  })
})