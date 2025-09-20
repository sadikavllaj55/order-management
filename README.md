## Requirements

- Docker Compose

## Setup

To run this project on your local machine:

- Copy `.env.example` to `.env`
- Edit your `.env` file with your correct credentials and config values
- Start the containers:
```shell
docker compose up -d
```
- If the compose.yml file is not changed the backend should be running at port 8080: http://localhost:8080/api
- The frontend is running on port 3000 by default: http://localhost:3000
