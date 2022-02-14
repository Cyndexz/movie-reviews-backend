import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

//So no we are able to use this as an instance
const app = express();
require('dotenv').config();

//Used to properly send out requests
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
var cors = require('cors')
app.use(cors());    //so we can call it as a function

//to conenct this to our application /posts being the starting path for all routes inside of post.js
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req,res) => {
    res.send('Hello to Movie Reviws API');
});

const PORT = listen(process.env.PORT || 5000); //only using 5000 right now until we push and then it will auto populate

//mongoose.connect(CONNECTION_URL).then(()=>{console.log('...')})

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))     //If the connection is successful and successfully listens on app on a template string
    .catch((error) => console.log(error.message));  //if the connection to the database is not successful and will simply show an error message

//Makes sure we do not get any warnings in our console
//mongoose.set('useFindAndModify', false);