Feature: Add product to the card
    Scenario: User is able to add single and multiple color product to the card
        Given I am on the Accessories page
        When I select the product
        Then I check expected product is presented in the cart
        And I remove items from the card