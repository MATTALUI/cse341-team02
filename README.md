# Project Name
###### CSE341 Team 02
## Description

PROPOSE: 
It is a common issue in Church of Jesus Christ of Latter-Day Saints wards that communication can be difficult within the groups because different people prefer different communication mediums. Some people only want to receive specific group updates via email, some people only want updates via text message, some want a Facebook notification, while others will want some combination of notification for different groups they belong to. Litzen is an app that lets its users sign up and subscribe to different groups in a ward such as Elders Quorum or Relief Society and specify how they want to receive updates from that group. Now group leaders in the ward will have a one-stop-shop for sending out announcements and updates and members will be able to get the messages in the format that best suits their needs!


TECHNOLGIES USED:
NodeJS
Express
MongoDB
JavaScript
HTML
CSS


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
