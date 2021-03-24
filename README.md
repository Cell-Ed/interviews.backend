![Cell-Ed Header Banner](assets/images/celled-header-banner.jpeg)

# Back-End Software Developer Interview Take-Home Solution

- This repository contains a REST API for an pet rescue center, built with [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/). 

## Specification

- Users can create new pets, update existing pets, delete pets, hide/archive pets and list all pets in their inventory as well as sort/filter and paginate via query parameters.
- Users can register accounts and obtain tokens to access secured endpoints.

## Features

- MongoDB object modeling using [Mongoose](https://mongoosejs.com/)
- API validation and interactive documentation using [OpenAPI 3](https://swagger.io/specification/)
- User authentication and JWT protected routes using [Passport.js](http://www.passportjs.org/)
- Rate limiting middleware using [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- Unit testing with [Mocha](https://mochajs.org/)/[Chai](https://www.chaijs.com/)
- Formatted logs using [Pino](https://github.com/pinojs/pino)
- Configured as a multi-container application with [Docker](https://docs.docker.com/compose/)

## Instructions

- Instructions for installing, running and testing the application can be found in the [README](/pets/README.md) file located in the `/pets` directory.