# Ticket Management App

This is a web application designed to manage and track issues using GitHub-like tickets (issues).

## Features

- User Authentication: Register, log in, and manage user roles (admin, responsible, user).
- Ticket Management: Create, view, edit, and delete tickets. Assign responsible users and change statuses.
- Category Management: Create, view, edit, and delete categories for tickets.
- Real-time Updates: Get real-time notifications for ticket status changes and responses.
- Responsive Design: Access the application seamlessly from various devices.

## Tech Stack

- Frontend: Vue.js
- Backend: Node.js with Express
- Database: MySQL

## Installation

### Frontend

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and update environment variables if needed.
4. Run `npm run serve` to start the development server.

### Backend

1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and provide necessary configuration.
4. Set up your MySQL database and update `.env` with the database details.
5. Run `npm run start` to start the backend server.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
