# OMDbGuru by Netguru

## Brief Description

Personal movie library with own Express API and React Frontend.

- **Live Version** - https://omdb-client.herokuapp.com/
- **Client Repo** - https://github.com/krokowski0x/OMDbGuru-Client
- **API** - https://omdb-guru.herokuapp.com/

## API Endpoints

### Required

- [x] **POST /movies** - add movie to Your list (with authentication)
- [x] **GET /movies** - get all Your movies (with authentication)
- [x] **POST /comments** - add a comment to the movie (with authentication)
- [x] **GET /comments** - get all the comments to certain movie

### Additional

- [x] **DELETE /movies/:id** - remove certain movie from the list (with authentication)
- [x] **GET /comments/:id** - get certain comment
- [x] **DELETE /comments/:id** - remove certain comment (with authentication)
- [x] **POST /users** - sign up
- [x] **GET /users/me** - check if I exist in DB
- [x] **POST /users/login** - log in
- [x] **DELETE /users/me/token** - log out

## Other functionality

### Required (or encouraged)

- [x] Used latest ECMAScript (ES8+) standard
- [x] Added basic tests of endpoints and their functionality
- [x] Pushed to public repository
- [x] Include README file, notes on application requirements and setup
- [x] Deployed app to Heroku

### Additional

- [x] Added User model and custom authentication
- [x] Added React Frontend to interact with all the endpoints in real-time
- [x] Fully tested all endpoints with custom mocks and beforeEach functions (all tests passing)
- [x] Waaaay more!

## Prerequisites

If you want to make some changes, first you have to have [Node with npm](https://nodejs.org/en/) installed.

### Installation

After cloning this repository, in the project directory, you have to install dependencies:

```
npm i
```

Then you should run:

```
npm start
```

App should be up and running, so give it a try!
To interact with API, I recommend using [Postman](https://www.getpostman.com/).
And if You like watching all tests passing, run:

```
npm test
```

## Built With

### Backend

- [Express](https://expressjs.com/) - Web/API building framework for [Node.js](https://nodejs.org/en/) which needs no introduction
- [Postman](https://www.getpostman.com/) - API endpoints testing tool
- [MongoDB](https://www.mongodb.com/) - most popular NoSQL database, with great Node tooling such as [Mongoose](https://mongoosejs.com/) for object modeling
- [Mocha](https://mochajs.org/), [Chai](http://www.chaijs.com/) and [Supertest](https://github.com/visionmedia/supertest) for well structured, BDD tests and assertions
- [Body Parser](https://github.com/expressjs/body-parser#readme), [cors](https://github.com/expressjs/cors), [Nodemon](https://nodemon.io/), [Lodash](https://lodash.com/) and [Node Fetch](https://www.npmjs.com/package/node-fetch) - helpers, polyfills and Express middlewares
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) and [JSON Web Token](https://github.com/auth0/node-jsonwebtoken) for security, hashing, salting and authentication

### Frontend

- [React](https://reactjs.org/) - best of all JS frameworks (IMO)
- [Webpack](https://webpack.js.org/) with [Babel](https://babeljs.io/) - bundler and compiler for newest ECMAScript standard
- [Heroku](https://www.heroku.com/) - Cloud platform which can run Node.js
- [Sematic UI React](http://react.semantic-ui.com/) - reusable UI components for React
