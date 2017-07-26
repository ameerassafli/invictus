// get all required libs
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const books = require('./routes/books');
const users = require('./routes/users');



// connect my application to the database
let dbhost = "mongodb://rob:asdwasdw@ds157112.mlab.com:57112/practiceapi"
mongoose.connect(dbhost, {useMongoClient:true})


// use needed middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', books)
app.use('/', users)



let listner = app.listen(process.env.PORT || 3000, function () {
	console.log(`your app is running on port ${listner.address().port}`)
})

