// Search tests
import SearchPage from '../../support/pages/searchPage';

describe('Search Component Tests', () => {
  beforeEach(() => {
    // Visit the Gov.il site
    cy.visit('https://www.gov.il');
  });

  it('should focus on the search input when click on search button', () => {
    // Act & Assert
    SearchPage.clickSearchButton();
    SearchPage.verifySearchInputIsFocused();
  });

  it('should display search results when a valid query is entered', () => {
    // Arrange
    const searchQuery = 'health';

    // Act
    SearchPage.clickSearchButton();
    SearchPage.typeSearchQuery(searchQuery);

    // Assert
    SearchPage.verifySearchResultsDisplayed();
  });

  it('should show no results message when an invalid query is entered', () => {
    // Arrange
    const invalidQuery = 'nonexistentquery123';

    // Act
    SearchPage.clickSearchButton();
    SearchPage.typeSearchQuery(invalidQuery);

    // Assert
    SearchPage.verifyNoResultsFound();
  });

});
