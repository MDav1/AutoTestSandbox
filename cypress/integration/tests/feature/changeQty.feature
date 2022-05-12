@GoogleStoreTest
Feature: Change quntity of products in the cart
    Scenario: User is able to change quntity of products in the cart
        Given I am on the Accessories page
        When I select the product
        And I check expected product is presented in the cart
        And I change quntity of products in the card 
        Then I check total price is changed accordingly