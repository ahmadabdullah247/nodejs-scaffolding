/*
  // Server
  Dispatcher : Dispatcher receives request and passes it to the first middleware
  logger : Request is logged and passed to the next middleware using next()
  bodyparser : Request body is parsed if any exists and then passed to the next middleware using next()
  static (GET): If request is for a static file, response is sent with that file and next() is not called; otherwise, the request moves to the next middleware
  custom middleware (POST): Request is handled with a custom middleware and response is ended
*/

// require dependencies 
// ========================================================================================
const express = require('express');
// const routes = require('./routes');
const connectDB = require('./config/db');

// initialize variables 
// ========================================================================================
const port = process.env.PORT || 3000;
const app = express();
// Connect to Database
connectDB();

// define middleware 
// ========================================================================================
app.use(express.json({ extended: false }));
// app.use('/api',routes);

app.use('/api/auth', require('./services/auth.service'));
app.use('/api/users', require('./services/user.service'));

// app.get('*',(req,res)=> res.json('Something went wrong!!'));

// start server
// ========================================================================================
app.listen(port,()=>console.log(`Server is live on Port: ${port}`)); 
