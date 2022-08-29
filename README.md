```text
        CCCCCCCCCCC                                                                                  tttt                              
     CCC::::::::::C                                                                                tt:::t                              
   CC:::::::::::::C                                                                                t::::t                              
  C:::::CCCCCC::::C                                                                                t::::t                              
 C:::::C     CCCCCC   oooooooo   nnnn nnnnnnn      ccccccccccc rrrr   rrrrr      eeeeeeeee    tttttt::::tttttt     eeeeeeeee    
C:::::C             oo::::::::oo n:::n:::::::nn   c:::::::::::cr:::rrr:::::r    e:::::::::ee  t::::::::::::::t    e:::::::::ee  
C:::::C            o::::::::::::on::::::::::::n  c::::::::::::cr::::::::::::r  e::::eeee::::eet::::::::::::::t   e::::eeee::::ee
C:::::C            o::::oooo::::onn::::::::::::nc:::::ccccc:::crr:::::rrr::::re::::e    e::::ettttt::::::ttttt  e::::e    e::::e
C:::::C            o:::o    o:::o  n::::nnn::::nc::::c    ccccc r::::r   r:::re:::::eeee:::::e     t::::t       e:::::eeee:::::e
C:::::C            o:::o    o:::o  n:::n   n:::nc:::c           r::::r        e::::eeeeeeeee       t::::t       e::::eeeeeeeee  
 C:::::C     CCCCCCo:::o    o:::o  n:::n   n:::nc::::c    ccccc r::::r        e:::::e              t::::t    ttte:::::e         
  C:::::CCCCCC::::Co::::oooo::::o  n:::n   n:::nc:::::ccccc:::c r::::r         e::::::e             t:::::ttt::t e::::::e        
   CC:::::::::::::Co::::::::::::o  n:::n   n:::n c::::::::::::c r::::r          e::::::eeeeee       tt:::::::::t  e::::::eeeeee  
     CCC::::::::::C oo::::::::oo   n:::n   n:::n  c:::::::::::c r::::r           e::::::::::e         tt::::::tt   e::::::::::e  
        CCCCCCCCCCC   oooooooo     nnnnn   nnnnn   ccccccccccc  rrrrrr            eeeeeeeeeee           ttttttt     eeeeeeeeee                                         
```

<!--suppress ALL -->
<div align="center">

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

<div align=center>

[![Concrete CI](https://github.com/andlo779/concrete/actions/workflows/ci.yaml/badge.svg)](https://github.com/andlo779/concrete/actions/workflows/ci.yaml)
![GitHub](https://img.shields.io/github/license/andlo779/concrete)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/andlo779/concrete/@nestjs/core?color=red)
![GitHub last commit](https://img.shields.io/github/last-commit/andlo779/concrete?color=yellow)
![GitHub Repo stars](https://img.shields.io/github/stars/andlo779/concrete)
![GitHub forks](https://img.shields.io/github/forks/andlo779/concrete?color=lightblue)

</div>

## Description
Learning project for author to get into the depths of NestJS <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="16" alt="Nest Logo" /></a>. The domain model of the application is designed handle vinyl record collection, via REST interface intended to be consumed by a frontend application. For simplicity in hosting (and me learning Security in NestJS and Passport), this application will provide its own authentication. 

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
The application expects some configuration to be able to run, either from ENV variables or from .env file in root directory.

Example .env file is committed in repository. 

ENV variables will override .env file, so .env file can be left in build even if one wants to override its values. 

## Open API Specification
A Swagger server is hosted within the app and can be reached via _/api_ or the json schema via _/api-json_

## Authentication
Authentication mechanism is supported within the application. Users need to obtain a token via basic authentication to be able to use the REST services offered by the application.

Users can also opt in for Second Factor Authentication for increased security. If user enables 2FA and TOTP password from an Authenticator app is needed to gain a token. (More information with flow charts will be provided.)

## Database
This project is set up to use __MongoDb__ as database. In the _sourcecode- folder data files are provided to populate the database to be able to run the application and should be applied before first start.

#### The default password for all users is: _123456789_

### How to import user data into MongoDb in Docker container running locally:
The service name; _service_mongo_1_ should be replaced with the service name of your own container.
```bash
# copy file into container
docker cp resources/users.json service_mongo_1:/tmp/users.json
# login to container with bash
docker exec -it service_mongo_1 bash
# run mongoimport (with credentials if needed)
mongoimport -u root -p password --authenticationDatabase admin -d concrete -c users --type=json --file /tmp/users.json
```

## Backlog
Official backlog can be found in [GitHub Projects](https://github.com/users/andlo779/projects/2/views/2)

## Author
[Andreas Lord](mailto:andlo779@gmail.com) 

## License
This project is [MIT licensed](LICENSE.md).