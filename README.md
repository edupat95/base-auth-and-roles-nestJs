## Description
This is a base system with user and role authentication.

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

##INITIAL CONFIG.
#1) Create .env with:

#DB_HOST= [YOUR_HOST]
#DB_PORT=[DB_PORT]
#DB_USER=[USER]
#DB_PASSWORD=[PASS]
#DB_NAME=[DATABASER_NAME]

#APP_PORT=3000
#DEBUG_MODE=true

#JWT_SECRET=[JWT_SECRET]
#API_KEY=[API_KEY]

##Depndencies
#npm i @nestjs/typeorm
#npm i typeorm
#npm install --save @nestjs/jwt
#npm install mysql --save
#npm i --save class-validator class-transformer
#npm i bcrypt
#npm i -D @types/bcrypt
#npm install dotenv
#npm i @nestjs/mapped-types





