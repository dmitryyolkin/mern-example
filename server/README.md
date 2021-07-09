# Init
Backend initialization: 
* init project `npm init`
* Nodejs dependencies `npm i express mongoose config` 
  * config management: https://www.npmjs.com/package/config
  * MongoDB is hosted in cloud: https://cloud.mongodb.com/
  * password encoding: https://www.npmjs.com/package/bcryptjs
  * jwt validation: https://www.npmjs.com/package/jsonwebtoken
  * pass env variables: https://www.npmjs.com/package/cross-env
* dev dependencies: `npm i -D nodemon concurrently`
  * `ts-node-dev` - hot deploy for changed files on backend
  * `concurrently` - concurrent running several npm tasks
  * `cross-env` - setting system env variables in npm scripts
    
# Migration from JS to TS
* Create typescript config: `npx typescript --init` and specify some options in `tsconfig.json`
  * `"moduleResolution": "node"`
  * `"outDir": "./build"`
* Add typescript and @types in dev dependencies: `npm i -D typescript @types/node @types/express @types/mongoose ts-node-dev`  