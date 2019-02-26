const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/list');
const compression = require('compression');

 // connect to DB
 mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-qggyd.mongodb.net/todoapp`)
    .then( () => { console.log("Database connected successfully...")})
    .catch( err => console.log("Database connection error..."));


app.use(bodyParser.json());   // appliction/json
app.use(compression());

// Access-Control-Allow-origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
});

// API ROTUES
app.use('/api/auth' , authRoutes);
app.use('/api/list' , listRoutes);

// Error Handling Middleware
app.use( (error,req,res,next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data || undefined ;
    res.status(status).json({message: message , data: data});
});


// listening to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
