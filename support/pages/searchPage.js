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

}

export default new SearchPage();
