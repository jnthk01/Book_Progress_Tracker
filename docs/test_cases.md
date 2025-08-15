# Test Cases for Book Progress Tracker

This document outlines the comprehensive test cases for the Book Progress Tracker application, covering various scenarios including validation, boundary conditions, security, and end-to-end integration.

## 1. Validation Testing

Tests to ensure the API handles invalid or missing data gracefully and returns appropriate error messages.

### 1.1. User Registration (`POST /auth/register`)

*   **Scenario: Missing Username**
    *   **Input:** `{ "password": "Password123!" }`
    *   **Expected Output:** `400 Bad Request`, error message indicating missing username.
*   **Scenario: Missing Password**
    *   **Input:** `{ "username": "testuser" }`
    *   **Expected Output:** `400 Bad Request`, error message indicating missing password.
*   **Scenario: Password too short**
    *   **Input:** `{ "username": "testuser", "password": "short" }`
    *   **Expected Output:** `400 Bad Request`, error message about password length.
*   **Scenario: Password missing uppercase**
    *   **Input:** `{ "username": "testuser", "password": "password123!" }`
    *   **Expected Output:** `400 Bad Request`, error message about missing uppercase.
*   **Scenario: Password missing lowercase**
    *   **Input:** `{ "username": "testuser", "password": "PASSWORD123!" }`
    *   **Expected Output:** `400 Bad Request`, error message about missing lowercase.
*   **Scenario: Password missing number**
    *   **Input:** `{ "username": "testuser", "password": "Password!@#" }`
    *   **Expected Output:** `400 Bad Request`, error message about missing number.
*   **Scenario: Password missing special character**
    *   **Input:** `{ "username": "testuser", "password": "Password123" }`
    *   **Expected Output:** `400 Bad Request`, error message about missing special character.
*   **Scenario: Username already exists**
    *   **Precondition:** A user with the same username is already registered.
    *   **Input:** `{ "username": "existinguser", "password": "ValidPassword1!" }`
    *   **Expected Output:** `400 Bad Request`, error message indicating username already exists.

### 1.2. Book Creation (`POST /api/books`)

*   **Scenario: Missing Title**
    *   **Input:** `{ "genre": "Fiction", "pages_total": 100 }`
    *   **Expected Output:** `400 Bad Request`, error message indicating missing title.
*   **Scenario: Invalid Genre**
    *   **Input:** `{ "title": "My Book", "genre": "InvalidGenre", "pages_total": 100 }`
    *   **Expected Output:** `400 Bad Request`, error message indicating invalid genre.
*   **Scenario: Missing Total Pages**
    *   **Input:** `{ "title": "My Book", "genre": "Fiction" }`
    *   **Expected Output:** `400 Bad Request`, error message indicating missing total pages.
*   **Scenario: Negative Pages Read**
    *   **Input:** `{ "title": "My Book", "genre": "Fiction", "pages_total": 100, "pages_read": -10 }`
    *   **Expected Output:** `400 Bad Request`, error message indicating negative pages read.
*   **Scenario: Pages Read greater than Total Pages**
    *   **Input:** `{ "title": "My Book", "genre": "Fiction", "pages_total": 100, "pages_read": 150 }`
    *   **Expected Output:** `400 Bad Request`, error message indicating pages read exceeds total pages.

### 1.3. Book Update (`PUT /api/books/<book_id>`)

*   **Scenario: Invalid Book ID**
    *   **Input:** `PUT /api/books/9999` with valid body.
    *   **Expected Output:** `404 Not Found`.
*   **Scenario: Invalid Genre in Update**
    *   **Input:** `{ "genre": "NonExistent" }`
    *   **Expected Output:** `400 Bad Request`, error message indicating invalid genre.
*   **Scenario: Pages Read greater than Total Pages in Update**
    *   **Input:** `{ "pages_read": 200, "pages_total": 100 }`
    *   **Expected Output:** `400 Bad Request`, error message.

## 2. Boundary Testing

Tests focusing on the limits of input values and system behavior at those limits.

### 2.1. Pagination (`GET /api/books`)

*   **Scenario: First Page**
    *   **Input:** `page=1`
    *   **Expected Output:** Returns the first 6 books.
*   **Scenario: Last Page**
    *   **Precondition:** Create enough books to have multiple pages.
    *   **Input:** `page=<last_page_number>`
    *   **Expected Output:** Returns the last set of books.
*   **Scenario: Page Beyond Last Page**
    *   **Precondition:** Create enough books to have multiple pages.
    *   **Input:** `page=<last_page_number + 1>`
    *   **Expected Output:** Returns an empty list of books, `current_page` reflects the requested page, `total` and `pages` reflect actual counts.
*   **Scenario: Negative Page Number**
    *   **Input:** `page=-1`
    *   **Expected Output:** `400 Bad Request` or defaults to page 1 (depending on implementation, currently defaults to 1).
*   **Scenario: Zero Page Number**
    *   **Input:** `page=0`
    *   **Expected Output:** `400 Bad Request` or defaults to page 1 (currently defaults to 1).

### 2.2. `progress_percent` Calculation

*   **Scenario: Zero Total Pages**
    *   **Input:** `pages_total: 0`, `pages_read: 0`
    *   **Expected Output:** `progress_percent: 0`
*   **Scenario: All Pages Read**
    *   **Input:** `pages_total: 100`, `pages_read: 100`
    *   **Expected Output:** `progress_percent: 100`
*   **Scenario: No Pages Read**
    *   **Input:** `pages_total: 100`, `pages_read: 0`
    *   **Expected Output:** `progress_percent: 0`
*   **Scenario: Pages Read > Total Pages (Backend Validation)**
    *   **Input:** `pages_total: 100`, `pages_read: 150`
    *   **Expected Output:** `400 Bad Request` (as per validation testing).

## 3. Security Testing

Tests to ensure protected routes are inaccessible without proper authentication.

### 3.1. Unauthorized Access

*   **Scenario: Accessing Protected Route Without Token**
    *   **Endpoint:** `GET /api/books`
    *   **Expected Output:** `401 Unauthorized`.
*   **Scenario: Accessing Protected Route with Invalid Token**
    *   **Endpoint:** `POST /api/books` with a malformed or expired JWT.
    *   **Expected Output:** `401 Unauthorized`.
*   **Scenario: Accessing Protected Route with Valid Token but Wrong User (Authorization)**
    *   **Precondition:** User A creates a book. User B attempts to update/delete User A's book.
    *   **Endpoint:** `PUT /api/books/<book_id>` or `DELETE /api/books/<book_id>`
    *   **Expected Output:** `404 Not Found` (as per current implementation, which returns 404 if book not found for *current user*).

## 4. Integration Testing

End-to-end tests covering the full flow of user and book management.

### 4.1. User Lifecycle

*   **Scenario: Successful User Registration and Login**
    *   **Steps:** Register a new user -> Login with new user -> Verify JWT token is returned.
    *   **Expected Output:** `201 Created` for registration, `200 OK` with token for login.
*   **Scenario: Failed Login (Incorrect Password)**
    *   **Steps:** Register user -> Attempt login with correct username, incorrect password.
    *   **Expected Output:** `401 Unauthorized`.
*   **Scenario: Failed Login (Non-existent User)**
    *   **Steps:** Attempt login with non-existent username.
    *   **Expected Output:** `401 Unauthorized`.

### 4.2. Book CRUD Operations (Authenticated)

*   **Scenario: Create Book (Success)**
    *   **Steps:** Login -> Create book -> Verify `201 Created` and book details.
*   **Scenario: Get All Books (Success)**
    *   **Steps:** Login -> Create multiple books -> Get all books -> Verify all created books are returned.
*   **Scenario: Get Single Book (Success)**
    *   **Steps:** Login -> Create book -> Get book by ID -> Verify correct book details.
*   **Scenario: Update Book (Success)**
    *   **Steps:** Login -> Create book -> Update book details -> Get book by ID -> Verify updated details.
*   **Scenario: Delete Book (Success)**
    *   **Steps:** Login -> Create book -> Delete book -> Attempt to get book by ID -> Verify `404 Not Found`.

### 4.3. Frontend-Backend Integration

*   **Scenario: Register User (Frontend)**
    *   **Steps:** Fill registration form -> Submit -> Verify success message and redirection.
*   **Scenario: Login User (Frontend)**
    *   **Steps:** Fill login form -> Submit -> Verify success message and redirection.
*   **Scenario: Add Book (Frontend)**
    *   **Steps:** Login -> Navigate to add book form -> Fill form -> Submit -> Verify success message and book appears in list.
*   **Scenario: Edit Book (Frontend)**
    *   **Steps:** Login -> Select book from list -> Click edit -> Modify details -> Submit -> Verify success message and updated details in list.
*   **Scenario: Delete Book (Frontend)**
    *   **Steps:** Login -> Select book from list -> Click delete -> Confirm deletion -> Verify success message and book removed from list.
*   **Scenario: Pagination Navigation (Frontend)**
    *   **Steps:** Login -> Create many books -> Navigate through pages using Previous/Next buttons -> Verify correct books are displayed on each page.
*   **Scenario: Search/Filter/Sort (Frontend)**
    *   **Steps:** Login -> Apply search/filter/sort -> Verify correct results and page reset.
