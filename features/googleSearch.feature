@UI
Feature: Google Search UI
  
  Scenario: Search for a term on Google
    Given I am on the Google search page
    When I enter "Playwright" in the Google search box
    And I click the Google search button
    Then I should see Google results page

  Scenario: Search for a term on Google1
    Given I am on the Google search page
    When I enter "Playwright hi" in the Google search box
    And I click the Google search button
    Then I should see Google results page

  # Scenario: Google and Amazon multi-tab navigation
  #   Given I am on the Google search page
  #   When I open a new tab and go to the Amazon home page
  #   And I switch back to the Google tab
  #   And I enter "Playwright multi-tab" in the Google search box
  #   And I switch to the Amazon tab
  #   Then I should see Amazon home page

#   Scenario: Search for a term on Google2
#     Given I am on the Google search page
#     When I enter "Playwright" in the Google search box
#     And I click the Google search button
#     Then I should see Google results page
