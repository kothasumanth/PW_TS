Feature: Petstore API
  @API
  Scenario: Get pet by ID
    Given I have a pet with ID 1
    When I request the pet details
    Then the response should contain the pet information
