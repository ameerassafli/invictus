const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

// define a schema
let bookSchema = mongoose.Schema({
	name: String,
	author: String,
	ISBN: Number
})

// define a model
let Books = mongoose.model('books', bookSchema)

// get all books
router.get('/api/books', (req, res)=>{//using a seperate auth fun=>>> router.get('/api/books', auth, (req , res)=>{})=============================<<<<<<<<<<<<<<
	jwt.verify( req.headers.token ,'secret',function(err,token){


  if(err){
    res.status(400).send('Invalid Token');
  }
 
  else{
    // continue with the request
    Books.find({} , (err , result) =>{

		if (err) throw err;
		res.status(200).json(result);
	})
	//res.status(200).send();
}
 })}
	
)


// get a specific book
router.get('/api/books/:id', (req, res)=>{
	Books.findOne({ISBN: req.params.id}, (err, result)=>{
		if (err) throw err;
		res.status(200).json(result)
	})
})


// insert a new book
router.post('/api/books', (req, res)=>{

	let book = new Books({
		name: req.body.name,
		author: req.body.author,
		ISBN: req.body.ISBN
	})

	book.save((err, result)=>{
		if (err) throw err;
		res.status(200).json(result)	
	})

		
})



// delete a specific book
router.delete('/api/books/:id', (req, res)=>{
	Books.findOneAndRemove({ISBN:req.params.id}, (err, result)=>{
		if (err) throw err
		res.status(200).json(result)	
	})
})

router.put('/api/books/:id', (req, res)=>{
	Books.findOne({ISBN: req.params.id}, (err, result)=>{
		
		if (err) throw err;

		result.name = req.body.name;
		result.author = req.body.author;


		result.save((err, result)=>{
			if (err) throw err;
			res.status(200).json(result)	
		})

	})
})


module.exports = router;
