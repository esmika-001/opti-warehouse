# Opti-warehouse service

This service facilitates an authentication service. 
## Features

- **SOLID Principles**: Demonstrates the implementation of SOLID design principles.
- **Awilix Integration**: Utilizes Awilix for dependency injection.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

To install this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/aditya-goyal3302/opti-warehouse.git
   ```

2. Navigate into the project directory:

   ```bash
   cd complaints
   ```

3. Create a `.env` file in the root of the project by copying the example file and update it with your configuration settings:

   ```sh
   cp .env.example .env
   ```

4. Build the Docker image and run Docker services with Docker Compose:

   ```sh
   docker compose up
   ```

5. Enter the backend container:

   ```sh
   docker compose exec backend sh
   ```

6. Install dependencies:
   ```sh
   npm ci
   ```

### Database Setup

Below are the steps to set up the database along with the corresponding commands:

1. Create the Database (if not already created by Docker Compose):

   ```bash
   npm run db:create
   ```

2. Drop and Recreate Database (if needed):

   ```bash
   npm run db:drop
   ```

3. Run Migrations:

   ```bash
   npm run up
   ```

4. Rollback Migrations (if needed):

   - To rollback the last migration:
     ```bash
     npm run undo
     ```
   - To rollback all migrations:
     ```bash
     npm run undo:all
     ```

### Running the Project

1. Start the HTTP API server in development mode:
   ```bash
   npm run dev
   ```

The application should now be running at `http://localhost:8000`.

## Project Structure

- `/`: Contains the source code.
- `config/`: Configuration files and settings.
- `controllers/`: Handles incoming requests and responses.
- `middlewares/`: Contains middleware functions for request processing.
- `models/`: Defines data models and schemas.
- `processors/`: Handles incoming messages operations according to event-type
- `repositories/`: Manages data access and storage.
- `routes/`: Defines APIs EndPoints for service.
- `services/`: Contains business logic and service implementations.

## Acknowledgements

- [Awilix](https://github.com/jeffijoe/awilix)
- [Node.js](https://nodejs.org/)
