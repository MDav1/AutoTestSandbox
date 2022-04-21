Feature: Test currency
    Scenario: Test currency
        Given I am on converter page
        When I convert values
        Then I check rate is correct
