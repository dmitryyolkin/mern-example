# MERN
The project illustrates simple project built based on MERN (MongoDB + Expressjs + React + Nodejs).
The project provides functionality for 
* links dictionary
* generating short link for original link
* calculate clicks count by shorted link
* Auth functionality (MongoDB + jwt token)

# Run
## Local
* Server run `npm run server`
* Client run `npm run client`   
* Server + client run `npm run dev`

## Production run
### From IDE
* Build server: `npm run server:build`
* Build client: `npm run client:build`
* Run in prod: `npm run prod` -> system will be available on `http://localhost:5000`

### From Docker
* Build docker image: `docker build -t mern:0.0.1 .` - please make sure you're in project root directory and specify correct tag
* Make sure docker image was built: `docker image ls` contains `mern:0.0.1`
* Run docker image: `docker run -p 5000:5000 mern:0.0.1`