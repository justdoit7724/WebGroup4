var express = require('express');
var bodyParser = require('body-parser');
var dbManager = require('./DBManager'); 

const { getAllBookInfo } = require('./DBManager'); 


module.exports = function () {
    var app = express();

    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.use(express.static('./public'));
    app.use(express.static("./node_modules"));

    // Middleware to parse request body
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Home route
    app.get('/', async function(req, res) {
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
    app.get('/edit', async function(req, res, next) {
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
    app.post('/book', async function(req, res, next) {
      const result = await dbManager.addBookInfo(req.body);
      if (result) {
        res.redirect('/');
      } else {
        res.status(500).send('Failed to add the book');
      }
    });

    // Delete a book by title
    app.delete('/book/:title', async function(req, res, next) {
      const result = await dbManager.removeBookInfo(req.params.title);
      if (result) {
        res.send('Book deleted successfully');
      } else {
        res.status(500).send('Failed to delete the book');
      }
    });

    return app;
};
