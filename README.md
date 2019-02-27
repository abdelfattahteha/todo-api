# todo-api
simple api for small todo-app

## Setup

1- first change your MongoDB url to localhost as `mongodb://localhost/yourDBanme` because my url not going to work with you
```javascript
// connect to DB
 mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-qggyd.mongodb.net/todoapp`)
    .then( () => { console.log("Database connected successfully...")})
    .catch( err => console.log("Database connection error..."));
```

2- npm install to install all dependencies

3- npm start and api will run on `localhost` on port `3000`


## Frontend Repository 
simple frontend repository working with this api [frontend repository](https://github.com/abdelfattahteha/totdo-angular)
