# MERN
The project illustrates simple project built based on MERN (MongoDB + Expressjs + React + Nodejs).
The project provides functionality for 
* links dictionary
* generating short link for original link
* calculate clicks count by shorted link
* Auth functionality (MongoDB + jwt token)

## Init
Backend initialization: 
* init project `npm init`
* Nodejs dependencies `npm i express mongoose config` 
  * config management: https://www.npmjs.com/package/config
  * MongoDB is hosted in cloud: https://cloud.mongodb.com/
  * password encoding: https://www.npmjs.com/package/bcryptjs
  * jwt validation: https://www.npmjs.com/package/jsonwebtoken
  * pass env variables: https://www.npmjs.com/package/cross-env
* dev dependencies: `npm i -D nodemon concurrently`
  * `nodemon` - hot deploy for changed files on backend
  * `concurrently` - concurrent running several npm tasks
  * `cross-env` - setting system env variables in npm scripts
Client initialization:
* See `client` directory
* The structure was generated with `npm create-reacta-app`
    
## Run
### Local
* Server run `npm run server`
* Client run `npm run client`   
* Server + client run `npm run dev`

### Production run
* Build docker image: `docker build -t mern:0.0.1 .` - please make sure you're in project root directory and specify correct tag
* Make sure docker image was built: `docker image ls` contains `mern:0.0.1`
* Run docker image: `docker run -p 5000:5000 mern:0.0.1`