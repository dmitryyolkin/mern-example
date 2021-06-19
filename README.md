# MERN
This project illustrates simple project built based on MERN (MongoDB + Expressjs + React + Nodejs).
The project contains user Auth + web links dictionary (initial link + its short alternative).

## Init
Backend initialization: 
* init project `npm init`
* Nodejs dependencies `npm i express mongoose config` 
  * config management: https://www.npmjs.com/package/config
  * MongoDB is hosted in cloud: https://cloud.mongodb.com/
  * password encoding: https://www.npmjs.com/package/bcryptjs
  * jwt validation: https://www.npmjs.com/package/jsonwebtoken
* dev dependencies: `npm i -D nodemon concurrently`
  * `nodemon` - hot deploy for changed files on backend
    
## Run
### Local

* Server run `npm run server`