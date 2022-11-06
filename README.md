# Express Project Boilerplate Checklist

## Setting Up A New Express App

- Run `express-generator` to scaffold express app with: `express -e project-name-here`
- `cd` into newly generated project
- install node packages with `npm i` or `npm install`
- rename `app.js` to `server.js`
- change line 7 on `bin/www` to be:

```
var app = require("../server");
```

- Run Nodemon before advancing to next section.
  - Nodemon should say `node ./bin/www`

## Setting Up Environment Variables

- install dotenv package with `npm install dotenv`
- require dotenv package in `server.js`
- run `touch .env` file on the root, or base, level of the project to make a .env file to hold secret variables
- in `server.js` on line 7, below package imports add this line:
  - `require("dotenv").config();`

## Set Up MongoDB Connection

- run `npm install mongoose` to install Mongoose.js package
- Inside `.env`, create a line with `DATABASE_URL=MONGODBCONNECTION STRING HERE`
  - If using localhost MongoDB, make sure MongoDB service is running on your computer
  - If using hosted MongoDB database, get connection string from MongoDB Atlas
- `mkdir config` to make config file
- `touch database.js` to have database connection file
- inside of `database.js`, have this content:

```js
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
```

## Set Up OAuth

### Setting Up Modules and .env

- Identify and install all packages needed for OAuth with Passport and Google OAuth service
  - overwrite your `package.json` with this one.
  ```js
  {
  "name": "my-project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^10.0.0",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "express-session": "^1.17.3",
    "http-errors": "~1.6.3",
    "method-override": "^3.0.0",
    "mongoose": "^6.0.10",
    "morgan": "~1.9.1",
    "passport": "^0.6.0",
    "passport-google-oauth": "^2.0.0"
  }
  }
  ```
- set up our .env file with variables for OAuth

```
DATABASE_URL=YOUR VALUE HERE
GOOGLE_CALLBACK=http://localhost:3000/oauth2callback
GOOGLE_CLIENT_ID=YOUR VALUE HERE
GOOGLE_SECRET=YOUR VALUE HERE
SECRET=YOUR VALUE HERE
```

### Getting .env values from Google Cloud Developer Console

- go to `console.google.com`
- click credentials in the left menu bar.
- click on link OAuth2.0 Client ID
- grab values for .env variables on right side table of page

## Setting Up Middleware on server.js

- import packages for OAuth system
  - express-session
  - passport
  - passport-google-oauth
- set up middleware for sessions
- set up middleware for passport
- set up middleware for req.user

## Set Up config/passport.js

- write out methods for Passport strategy
- require `config/passport.js` on server.js

## Set Up Routes for OAuth

- ## inside `routes/index.js`

## Create UI for Sign Up, Log In, and Log Out

- conditionally render buttons on Navbar for users to navigate
- decide which routes should be public/private

## Create header partial for CSS Frameworks

- style navbar and homepage

## Use Bootstrap Themes/Templates to avoid default look

## ????

- PROFIT!!!
