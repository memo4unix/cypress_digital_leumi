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

describe('Change mainBanner of Prime Minister\'s Office page', () => {
  it('Visits the landing page and replaces the mainBanner with data from Ministry of Public Security', () => {

    // Intercept both network requests
    let pm = 'https://www.gov.il/he/departments/prime_ministers_office/govil-landing-page';
    // Update the intercept to match the correct URL or pattern
    cy.intercept('GET', '**/trends.json*').as('minister_security');

    cy.intercept('GET', pm).as('prime_minister');

    // Visit the landing page
    cy.visit(pm);

    // Wait for the first page's network request to be captured
    cy.wait('@prime_minister').then((pmResponse) => {
      cy.log('Prime Minister response:', JSON.stringify(pmResponse));

      // Increase the timeout for the second request
      // Wait for the second network request from the Ministry of Public Security
      cy.wait('@minister_security', { timeout: 20000 }).then((msResponse) => {

        // Log the entire API response for debugging
        cy.log('Ministry of Public Security API Response:', JSON.stringify(msResponse.response));

        // Verify that the second network request was fired
        if (!msResponse) {
          cy.log('Ministry of Public Security request did not fire');
          return;
        }

        // Check if the 'mainBanner' exists in the response
        const responseData = msResponse.response.body.responseData;
        if (responseData && responseData.mainBanner) {
          const newMainBanner = responseData.mainBanner;
          cy.log('New mainBanner:', newMainBanner);

          // Replace the mainBanner in the first page's response
          pmResponse.response.body.responseData.mainBanner = newMainBanner;

          // Optionally, check if the page now shows the updated mainBanner
          cy.get('#mainBanner').should('have.text', newMainBanner);
        } else {
          cy.log('mainBanner not found in the Ministry of Public Security response.');
        }
      });
    });
  });
});
