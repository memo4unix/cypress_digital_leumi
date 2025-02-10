# Automated Tests for Gov.il

## Objective
This repository contains automated tests for the **Gov.il** website. The tests focus on the search component in the header, and data manipulation using `cy.intercept()`.

## Tasks

### 1. Search Component Tests
- Visit the **Gov.il** website and write at least **3 automated tests** for the search component in the header.
- Structure the code using the **Page Object** design pattern.

### 2. Test Using `cy.intercept()` to Check Status Code
- Visit a page and write a test using **`cy.intercept()`** for network requests.
- Ensure the **status code is 200** for the requests.

### 3. Manipulate `responseData` for `mainBanner`
- Write a test that:
  - Visits a page.
  - Changes the `responseData` to the `responseData` of **`mainBanner`** from another page.

