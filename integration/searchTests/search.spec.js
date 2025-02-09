import SearchPage from '../../support/pages/searchPage';

describe('API Requests Test', () => {
  it('should return status code 200 for all API requests', () => {
    // Arrange
    SearchPage.interceptRequests(); // Set up the intercepts for the requests

    // Act
    SearchPage.visitPage(); // Visit the page that makes the requests

    // Assert
    SearchPage.verifyRequestsStatusCode(); // Check that all the requests return a status 200
  });
});

describe('Search Component Tests', () => {
  beforeEach(() => {
    // Visit the Gov.il site before each test
    SearchPage.visitMainPage();
  });

  it('should focus on the search input when the search button is clicked', () => {
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
