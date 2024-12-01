# EventShuffle

![ci workflow status](https://github.com/basiliski/eventshuffle/actions/workflows/ci.yml/badge.svg)

EventShuffle is a backend for web application that allows users to create events, vote on suitable dates, and view the results.

## Getting Started

### Prerequisites

- Docker
- Node.js (for running tests locally)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/basiliski/eventshuffle.git
    cd eventshuffle
    ```

2. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    POSTGRES_USER=your_postgres_user
    POSTGRES_PASSWORD=your_postgres_password
    POSTGRES_DB=your_postgres_db
    DB_HOST=postgres
    DB_PORT=5432
    ```

### Starting the Application

#### With Docker

To start the backend and the database using Docker, run the following command:
```sh
docker-compose up
```
This will start both the PostgreSQL database and the backend service. The backend will be accessible at `http://localhost:3002`.

#### Without Docker

To start the database using Docker and the backend with `npm start`, follow these steps:

1. Start the database service using Docker Compose:
```sh
docker-compose up -d postgres
```

2. Start the backend service:
```sh
npm start
```
Or start in dev mode that auto reloads after changes:
```sh
npm run dev
```

### Initializing the Database

The `init.sql` script is used to initialize the database schema. It runs automatically when the PostgreSQL container is first started. If you need to run the `init.sql` script manually, you can use the following command:
```sh
npm run init-db
```

### Running Tests

To run the tests, use the following command:
```sh
npm test
```
This will run all the tests using Jest.

## API Endpoints
### Create Event
```http
POST /api/v1/event
```

### Vote on Event
```http
POST /api/v1/event/:id/vote
```

### List Events
```http
GET /api/v1/event/list
```

### Show Event
```http
GET /api/v1/event/:id
```

### Show Voting Results
```http
GET /api/v1/event/:id/results
```
