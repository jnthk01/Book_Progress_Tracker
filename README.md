# Book Progress Tracker

## Project Description

This is a full-stack web application designed to help users track their reading progress. Users can register, log in, add books to their collection, update their reading progress, and manage their book list with features like filtering, sorting, and pagination.

## Features

-   **User Authentication:** Secure registration and login with JWT (JSON Web Tokens).
-   **Book Management:** Add, view, edit, and delete books.
-   **Reading Progress Tracking:** Update pages read and automatically mark books as completed.
-   **Dynamic Book List:** Filter books by genre, search by title, and sort by various criteria (title, pages, genre, completion status, progress).
-   **Pagination:** View books in manageable chunks (6 items per page).
-   **Real-time Username Availability Check:** Get instant feedback during registration if a username is already taken.
-   **Password Strength Enforcement:** Enforces strong password policies during registration.
-   **API Documentation:** Interactive API documentation available via Swagger UI.

## Technologies Used

### Backend (Flask)

-   **Flask:** Python web framework.
-   **Flask-SQLAlchemy:** ORM for database interactions.
-   **Marshmallow & Marshmallow-SQLAlchemy:** Object serialization/deserialization.
-   **Flask-Bcrypt:** Hashing passwords for security.
-   **Flask-JWT-Extended:** JWT-based authentication.
-   **Flasgger:** Integrates Swagger UI for API documentation.
-   **SQLite:** Default database.

### Frontend (React)

-   **React:** JavaScript library for building user interfaces.
-   **React Router DOM:** For navigation and routing.
-   **Axios:** Promise-based HTTP client for API requests.
-   **React Toastify:** For displaying notifications.
-   **CSS Modules & Inline Styles:** For component-scoped and dynamic styling.

## Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites

-   Python 3.8+
-   Node.js (LTS version recommended)
-   npm or Yarn

### 1. Clone the Repository

```bash
git clone https://github.com/jnthk01/Book_Progress_Tracker.git
cd Book_Progress_Tracker
```

### 2. Backend Setup

Navigate to the backend directory, create a virtual environment, install dependencies, and set up the database.

```bash
cd C:\MY DISK\PP\Book_Progress_Tracker
python -m venv myenv
# On Windows
.\myenv\Scripts\activate
# On macOS/Linux
# source myenv/bin/activate

pip install -r requirements.txt
```

#### Database Initialization

Initialize the database. This will create a `books.db` file in the `instance` folder.

```bash
flask --app app init-db
```

#### Environment Variables

Create a `.env` file in the root directory (`Book_Progress_Tracker\.env`) and add your JWT secret key:

```
JWT_SECRET_KEY='your_super_secret_jwt_key_here'
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies.

```bash
cd frontend
npm install
```

## Running the Application

### 1. Start the Backend Server

Open a new terminal, navigate to the root directory, activate your virtual environment, and run the Flask app:

```bash
# On Windows
.\myenv\Scripts\activate

# On macOS/Linux
source myenv/bin/activate

# Set Flask environment variables
# (Windows PowerShell)
$env:FLASK_APP="app.py"
$env:FLASK_ENV="development"

# (macOS/Linux)
export FLASK_APP=app.py
export FLASK_ENV=development

# Run the Flask server
flask run
```

The backend API will be running at `http://127.0.0.1:5000`.

### 2. Start the Frontend Development Server

Open another terminal, navigate to the frontend directory, and start the React app:

```bash
cd frontend
npm start
```

The frontend application will open in your browser at `http://localhost:3000`.

## API Documentation (Swagger UI)

Once the backend server is running, you can access the interactive API documentation at:

`http://127.0.0.1:5000/docs`

Here you can explore all available endpoints, their parameters, and test them directly.

## Usage

1.  **Register:** Create a new account on the registration page.
2.  **Login:** Use your credentials to log in.
3.  **View Books:** See your book collection, filter, search, and sort.
4.  **Add Book:** Use the "Add New Book" button to add a new book.
5.  **Edit Book:** Click the "Edit" button on a book card to update its details or progress.
6.  **Delete Book:** Use the "Delete" button to remove a book from your collection.
