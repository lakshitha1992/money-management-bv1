# Money Management Application

This is a React-based web application for managing finances. It provides features like user registration, login, and account management, and it's built using Material-UI for styling. The backend is PHP-based, which handles user authentication and registration. The app also integrates with a MySQL database for storing user data.

## Features

- **User Authentication**: Users can sign up and log in.
- **Responsive UI**: Built with Material-UI for modern, responsive design.
- **Database Integration**: A MySQL database is used to store user data securely.
- **Password Encryption**: Passwords are securely stored in the database using hashing techniques.

## Project Structure


### Explanation of Project Structure:

- **`backend/`**: Contains PHP files responsible for user authentication and database interaction.
  - **`db_config.php`**: Stores MySQL connection details.
  - **`login.php`**: Handles user login requests.
  - **`signup.php`**: Handles user sign-up requests.
  - **`money_management.sql`**: SQL script for creating the database and tables.

- **`src/`**: Contains the React application code.
  - **`components/`**: Contains React components such as `Login.js`, `SignUp.js`, `AuthContext.js` for managing authentication, and `ToastNotification.js` for handling toast notifications.
  - **`App.js`**: Main component that renders the application's layout and routes.
  - **`index.js`**: The entry point where the React app is initialized and rendered into the DOM.
  - **`style.css`**: Optional CSS file for custom styles (if needed).

- **`.gitignore`**: Lists files and directories that should not be tracked by Git (e.g., node_modules, build files).
- **`package.json`**: Contains project metadata, including dependencies and scripts.
- **`README.md`**: Project documentation, including setup instructions, features, and contribution guidelines.
- **`LICENSE`**: The license for the project (e.g., MIT License).

This structure is organized to separate the backend PHP files from the frontend React components, keeping the code modular and easy to navigate.

## Database Code

CREATE DATABASE IF NOT EXISTS react;

USE react;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE incomes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  income_date DATE NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_date DATE NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### `src/`
Contains all the React frontend code including components like `Login.js`, `SignUp.js`, and authentication context (`AuthContext.js`).

### `backend/`
Contains PHP backend files for handling the authentication (login, signup) and database connections.

## Setup Instructions

### Prerequisites

Make sure you have the following software installed:

- **Node.js**: [Download & Install Node.js](https://nodejs.org/)
- **MySQL**: [Download & Install MySQL](https://www.mysql.com/)
- **PHP**: [Download & Install PHP](https://www.php.net/)

### 1. Clone the repository

```bash
git clone https://github.com/lakshitha1992/money-management-bv1.git
cd money-management-bv1

2. Install Frontend Dependencies
Install the required dependencies for the frontend React application:

bash
Copy code
npm install
This will install dependencies such as:

react
react-dom
@mui/material
@emotion/react
@emotion/styled
axios
react-router-dom
react-toastify
To install react-toastify (for notifications):

bash
Copy code
npm install react-toastify
3. Backend Setup (PHP)
Create a new database in MySQL and run the provided money_management.sql script to set up the necessary tables.

Database Configuration:

Edit backend/db_config.php to add your MySQL credentials:

php
Copy code
<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');  // Change to your MySQL username
define('DB_PASSWORD', '');      // Change to your MySQL password
define('DB_DATABASE', 'money_management');  // Change to your database name
?>
PHP Files:

login.php: Handles user login requests.
signup.php: Handles user registration requests.
4. Running the Project
Frontend (React App)
Start the React development server:
bash
Copy code
npm start
This will start the React app at http://localhost:3000.

Backend (PHP)
Place the backend folder in your PHP server's root directory (e.g., htdocs for XAMPP or www for WAMP).
Ensure your PHP server is running, and access it through your browser at http://localhost/{your-folder}/backend/.
5. Using the Application
Sign Up: Navigate to the Sign-Up page, fill out the form, and submit it to create a new account.
Login: After signing up, go to the Login page, enter your credentials, and log in to the app.
6. Dependencies
Frontend Dependencies
The following npm packages are used:

react-toastify: For displaying notifications and alerts in the frontend.
axios: For making HTTP requests to the backend.
@mui/material: For Material-UI components.
@emotion/react, @emotion/styled: For styling with Material-UI.
Backend Dependencies
The PHP backend uses standard PHP libraries, and there are no additional dependencies required.

7. Project Configuration
In the src/ directory, configure the following files for optimal project setup:

AuthContext.js: Manages the authentication state across the application.
App.js: Main app component that renders the login and sign-up forms.
8. GitHub and Social Media Links
GitHub: https://github.com/lakshitha1992/money-management-bv1.git
LinkedIn: LinkedIn Profile
Twitter: Twitter Profile
9. Contributing
Feel free to contribute by creating pull requests. Here's how you can get started:

Fork the repository.
Create a new branch for your changes.
Make changes and commit them with descriptive messages.
Push your changes to your forked repository.
Create a pull request to the main repository.
10. License
This project is open source and available under the MIT License. See the LICENSE file for more information.

Thank you for checking out this project. If you have any questions or issues, feel free to open an issue or contact me on GitHub.


### Explanation:

- **Project Overview**: Describes what the project is and the key features.
- **Project Structure**: Lists the folder structure to help you understand the organization of the code.
- **Setup Instructions**: Includes detailed steps to clone the repo, install dependencies, and set up the database.
- **Dependencies**: Lists all dependencies required for both frontend and backend.
- **Running the Project**: Explains how to start the React app and the PHP server.
- **GitHub and Social Links**: Provides your GitHub and social media links for users to connect with you.
