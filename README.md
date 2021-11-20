# Litzen
###### CSE341 Team 02
## Description

PURPOSE:
It is a common issue in Church of Jesus Christ of Latter-Day Saints wards that communication can be difficult within the groups because different people prefer different communication mediums. Some people only want to receive specific group updates via email, some people only want updates via text message, some want a Facebook notification, while others will want some combination of notification for different groups they belong to. Litzen is an app that lets its users sign up and subscribe to different groups in a ward such as Elders Quorum or Relief Society and specify how they want to receive updates from that group. Now group leaders in the ward will have a one-stop-shop for sending out announcements and updates and members will be able to get the messages in the format that best suits their needs!


### TECHNOLGIES USED:
- NodeJS
- Express
- MongoDB
- JavaScript
- HTML
- CSS

### PROJECT STATUS:
[See Project Board](https://github.com/MATTALUI/cse341-team02/projects/1)

## SOURCES:

## Setup
You will have to set up a couple of different accounts in order to configure your environment correctly. Many of these are not needed for basic installation, but they will be needed in order to run the full suite of features.
#### [Twilio](https://www.twilio.com/)
Twilio is used in order to send out notification text messages.
1) TODO
2) ???
#### [Sendgrid](https://sendgrid.com/)
Sendgrid is used in order to send out notification emails
1) TODO
2) ???
#### Optional: [Mongo Atlas](https://www.mongodb.com/atlas/database)
You can use mongo atlas to get a valid mongo connection URI instead of installing mongo locally on your computer.
1) TODO
2) ???
## Installation
1) Clone the repo
2) Copy `.env.example` into `.env` file. (This part can be skipped using docker setup)
```bash
cp .env.example .env # bash
copy .env.example .env # windows?
```
In your new `.env` file you need to change the `MONGO_URL` to a valid mongodb uri (try your booksheld DB) or the app will not run. You will also need to update the `TWILIO_ACCOUNT_SID` value to ensure that it is prefixed with "AC" or the Twilio SDK will prevent the app from starting.

3) Set values for environment variables. This can be done in either the `.env` file or the `docker-compose` file if you intend to use the docker setup.
4) Install dependencies. This can be done with one of the following:
```bash
npm install # Running locally
docker-compose build # Running using Docker
```
5) Seed the database. This will populate your local database with helpful testing data.
```
node db/seed.js
```
**NOTE: This command will do a full DB reset and will delete existing data before adding new data. Do not run if DB contains needed data.**
6) Start the server
```bash
npm run start # Start locally
npm run start:nodemon # Start locally with Nodemon
docker-compose up # Run with Docker
```
