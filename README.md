# Litzen
###### CSE341 Team 02
## Description
Todo... :)

## Installation
1) Clone the repo
2) Copy `.env.example` into `.env` file. (This part can be skipped using docker setup)
```bash
cp .env.example .env # bash
copy .env.example .env # windows?
```
3) Set values for environment variables. This can be done in either the `.env` file or the `docker-compose` file if you intend to use the docker setup.
4) Install dependencies. This can be done with one of the following:
```bash
npm install # Running locally
docker-compose build # Running using Docker
```
5) Start the server
```bash
npm run start # Start locally
npm run start:nodemon # Start locally with Nodemon
docker-compose up # Run with Docker
```
