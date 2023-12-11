const {Router} = require('express');
const router = Router();
var dbManager = require('../DB/DBManager'); 
const jwt = require('jsonwebtoken');
const {createToken, requireAuth} = require("../utils/utils");
const bcrypt = require("bcrypt");
require('dotenv').config();
const { getAllBookInfo } = require('../DB/DBManager'); 

    // Home route
    router.get('/', async function(req, res) {
  try {
    // Assuming getAllBookInfo() returns an array of books
    const dbbooks = await dbManager.getAllBookInfo();
    console.log(dbbooks);
    // Pass the database name and books to the EJS template
    res.render('home', {books: dbbooks });
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).send(error.message);
  }
});

// Edit route
router.get('/edit',requireAuth, async function(req, res, next) {
  try {
    const dbbooks = await dbManager.getAllBookInfo();
    console.log(dbbooks);
    
    res.render('edit', {books: dbbooks });
  } 
  catch (error) {
    // If there's an error, send an error response
    res.status(500).send(error.message);
  }
});
// Add a new book
router.post('/book', async function(req, res, next) {
  const result = await dbManager.addBookInfo(req.body);
  if (result) {
    res.redirect('/');
  } else {
    res.status(500).send('Failed to add the book');
  }
});
// Delete a book by title
router.delete('/book/:title', async function(req, res, next) {
  const result = await dbManager.removeBookInfo(req.params.title);
  if (result) {
    res.send('Book deleted successfully');
  } else {
    res.status(500).send('Failed to delete the book');
  }
});


router.get("/signup",(req,res)=>res.render("signup"));
router.post('/signup', async (req, res) =>{
    try{
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await dbManager.addUser({ email, password: hashedPassword });
        const token = createToken(user._id);
        res.cookie("jwt",token,{httpOnly:true,maxAge:3*24*60*60*1000});
        res.status(201).json({user: user._id});
    } catch (err){
        console.log(err);
    }
});

router.get('/login',(req,res)=>res.render('login'));
router.post('/login', async (req, res) =>{
    try{
      const { email, password } = req.body;
      const user = await dbManager.loginUser(email);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password); // Compare with hashed password
        if (isMatch) {
          const token = createToken(user._id);
          res.cookie("jwt",token,{httpOnly: true, maxAge:3*24*60*60*1000});
          res.status(201).json({user: user._id});
          return user; 
        } else {
            // Passwords do not match
            res.status(401).send('Incorrect password');
        }
    } else {
        res.status(404).send('User not found');
    }  
    } catch (err){
        console.log(err);
    }
});

router.get('/logout',(req,res) =>{
  res.cookie('jwt', '', {maxAge:1});
  res.redirect('/?loggedOut=true');
})

module.exports = router;

