# OMDbGuru by Netguru

## Brief Description

## Requirements

### POST /movies:

- [x] Request body should contain only movie title, and its presence should be validated.
- [x] Based on passed title, other movie details should be fetched from http://www.omdbapi.com/ (or other similar, public movie database) - and saved to application database.
- [x] Request response should include full movie object, along with all data fetched from external API.

### GET /movies:

- [x] Should fetch list of all movies already present in application database.
- [ ] Additional filtering, sorting is fully optional (BONUS points)

### POST /comments:

- [x] Request body should contain ID of movie already present in database, and comment text body.
- [x] Comment should be saved to application database and returned in request response.

### GET /comments:

- [x] Should fetch list of all comments present in application database.
- [x] Should allow filtering comments by associated movie, by passing its ID.

## Additional rules

- [x] Usage of latest ECMAScript/TypeScript standard and features is encouraged.
- [x] You are free to write your solution using framework, libraries and database of your choice - sharing your reasoning behind choosing them is welcome!
- [x] At least basic tests of endpoints and their functionality are obligatory. Their exact scope and form is left up to you.
- [x] The application's code should be kept in a public repository so that we can read it, pull it and build it ourselves. Remember to include README file or at least basic notes on application requirements and setup - we should be able to easily and quickly get it running.
- [x] Written application must be hosted and publicly available for us online - we recommend Heroku.

## Built With

- [Express](https://expressjs.com/) - Web framework for [Node.js](https://nodejs.org/en/) which needs no introduction
