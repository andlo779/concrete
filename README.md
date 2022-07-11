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

## Open API Specification
A Swagger server is hosted within the app and can be reached via _/api_ or the json schema via _/api-json_

## Database
This project is set up to use MongoDb as database. In the sourcecode data files are provided to populate the database to
be able to run the application. The default password for all users is: _123456789_

### How to import user data into MongoDb in Docker container running locally:
_service_mongo_1_ should be replaced with whatever your container is called.
```bash
# copy file into container
docker cp resources/users.json service_mongo_1:/tmp/users.json
# login to container with bash
docker docker exec -it service_mongo_1 bash
# run mongoimport with credentials if needed
mongoimport -u root -p password --authenticationDatabase admin -d concrete -c users --type=json --file /tmp/users.json
```

## Backlog
* Authentication
  * ~~Users in DB~~
  * ~~Passwords hashed~~
  * ~~Use authentication header for basic auth~~
  * Identify users via id....
  * Refresh token mechanism
    * Return token with one time usage (?? (state of token in db))
    * End-point to exchange refresh token to an normal token.... 
* Open API Specification
  * ~~Swagger server~~
  * Add ApiProperties on all DTO's
* Update Nestjs to v 9
* Implement own ExceptionHandler that returns a ErrorMessage Object that can be referenced in Swagger so error response 
type can be seen in Swagger server or json contract
* https
* Tests 
  * Refactor unit tests of services to use _jest-mock-extended_ library for mocking
* Record domain
    * Link images
    * Wishlist
* HealthCheck
  * Add external connection status to /status call (is DB there?)
* Authorization
  * Normal user
  * Admin user

## Author
[Andreas Lord](mailto:andlo779@gmail.com) 