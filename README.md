# Full-stack table reservation system

This is a full-stack application, mimicing a table reservation system for a restaurant, with a React frontend and a Node.js backend. The frontend is built with Vite and the backend uses Express.js. The application uses MySQL for database management and Sequelize as the ORM. Jest is used for testing both the frontend and backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- Docker (optional)

### Installation

1. Clone the repository

```sh
git clone https://github.com/tommiri/fs-reservation-system.git
```

2. Install dependencies for the backend

```sh
cd backend
npm install
```

3. Install dependencies for the frontend

```sh
cd ../frontend
npm install
```

### Configuration

Create `.env` files in the `backend`, `root` and `frontend` directories based on the provided `.env.sample` files. Fill in the necessary environment variables.

### Running the Application

1. Start the backend server

```sh
cd backend
npm run start
```

2. Start the frontend server in a new terminal

```sh
cd frontend
npm run dev
```

The application should now be running at `http://localhost:5173`.

### Running the Tests

1. Run backend tests

```sh
cd backend
npm run test
```

2. Run frontend tests

```sh
cd frontend
npm run test
```

3. Run E2E tests

```sh
cd frontend
npx cypress open
```

## Docker

If you have Docker installed, you can use the provided `Dockerfile` and `docker-compose.yaml` to build and run the application.

1. Build the Docker image

```sh
cd backend
docker build -t reservations-backend .
```

2. Run the Docker containers in the `root` folder

```sh
docker compose up -d
```

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
