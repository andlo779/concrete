<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Private project. Application to handle some private domain such as record collection, via REST interface intended to be 
consumed by a frontend application. For simplicity in hosting this application will provide its own authentication. 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Configuration
The application expects some configuration to work, either from ENV variables or from .env file in root directory. 
Example .env file is committed in repository. 

ENV variables will override .env file.

## Backlog
* Authentication
  * Users in DB
  * Passwords hashed
  * Use authentication header for basic auth
  * Refresh token mechanism
* Open API Specification
  * Swagger server
* Record domain
    * Link images
    * Wishlist
* Authorization
  * Normal user
  * Admin user



## Author
[Andreas Lord](mailto:andlo779@gmail.com) 