class SearchPage {
  // Selectors
  get searchInput() {
    return cy.get('input[name="SearchInput"]');
  }

  get searchButton() {
    return cy.get('div#wrapIcon');
  }

  get resultCounter() {
    return cy.get('h1.resultCounter');
  }

  // Actions
  typeSearchQuery(query) {
    this.searchInput.clear().type(query + '{enter}');
  }

  clickSearchButton() {
    this.searchButton.click();
  }

   // Verification
  verifySearchResultsDisplayed() {
    // Wait for the resultCounter element to exist and be visible
    this.resultCounter.should('exist')  // Ensure the element exists
      .should('be.visible');  // Then check if it's visible
  }

  verifyNoResultsFound() {
     // Ensure that the "No results found" message is visible
    cy.get('span[ng-hide="totalResults"][aria-hidden="false"]')
    .should('be.visible')  // Ensure it's visible
    .and('have.text', 'מצטערים,לא נמצאו');  // Ensure the text matches
  }

  verifySearchInputIsFocused() {
    this.searchInput.should('be.focused');
  }

  verifyRequests(){
    cy.intercept('GET', 'https://www.gov.il/he/BureausWebApi/bureaus/GetAggregationForOffices').as('getOffices');
    cy.wait('@getOffices').its('response.statusCode').should('eq', 200);
  }

  visitMainPage() {
    cy.visit('https://www.gov.il'); // Adjust to the correct URL
  }

  // Intercept API requests
  interceptRequests() {
    // Intercept the necessary API requests and alias them
    cy.intercept('GET', 'https://www.gov.il/he/BureausWebApi/bureaus/GetAggregationForOffices').as('getOffices');
    cy.intercept('GET', 'https://www.gov.il/he/BureausWebApi/bureaus/GetAggregationUnits').as('getUnits');
    cy.intercept('GET', 'https://www.gov.il/he/BureausWebApi/bureaus/GetAggregationCategories').as('getCategories');
    cy.intercept('GET', 'https://www.gov.il/he/BureausWebApi/bureaus/GetAggregationCities').as('getCities');
    cy.intercept('GET', 'https://www.gov.il/he/BureausWebApi/bureaus/GetTaxonomiesList?collectionName=cities').as('getTaxonomiesList');
  }

  // Verify that the intercepted requests return a 200 status code
  verifyRequestsStatusCode() {
    cy.wait('@getOffices').its('response.statusCode').should('eq', 200);
    cy.wait('@getUnits').its('response.statusCode').should('eq', 200);
    cy.wait('@getCategories').its('response.statusCode').should('eq', 200);
    cy.wait('@getCities').its('response.statusCode').should('eq', 200);
    cy.wait('@getTaxonomiesList').its('response.statusCode').should('eq', 200);
  }

  // Visit the page that triggers the requests
  visitPage() {
    cy.visit('https://www.gov.il/he/government-service-branches'); // Adjust to the correct URL
  }
}

export default new SearchPage();
