const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "Library";
const collName = "Shelter";


let credentials;
const userCollName = "LoginCredentials";


let db;
let booksCollection;

// Connect to the database
async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    booksCollection = db.collection(collName);
    credentials = db.collection(userCollName);
    console.log(`Connected to database: ${dbName}`);
    return true;
  } catch (error) {
    console.error('Connection to MongoDB failed:', error);
    return false;
  }
}

// Get all book info from the database
async function getAllBookInfo() {
  try {
    return await booksCollection.find({}).toArray();
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

// Add a new book to the database
async function addBookInfo(title,author,date,category) {
  try {
    const result = await booksCollection.insertOne(title,author,date,category);
    return result.acknowledged;
  } catch (error) {
    console.error('Error adding book:', error);
    return false;
  }
}

// Remove a book from the database by title
async function removeBookInfo(title) {
  try {
    const result = await booksCollection.deleteOne({ title: title });
    return result.deletedCount === 1;
  } catch (error) {
    console.error('Error removing book:', error);
    return false;
  }
}


async function addUser(username,password){
  try {
    const user = await credentials.insertOne(username,password);
    return user.acknowledged;
  } catch (error) {
    console.error("Error adding User: ", error);
    return false;
  }
};

async function loginUser(username){
  try {
    // Use findOne with an object to specify the email field
    const user = await credentials.findOne({ email: username });
    return user; // Return the user if found, or null if not found
  } catch (error) {
    console.error("Error in findUserByEmail: ", error);
    return null; // Return null in case of an error
  }
};


// Close the database connection
async function closeConnection() {
  await client.close();
}

module.exports = {
  connectDB,
  getAllBookInfo,
  addBookInfo,
  removeBookInfo,
  closeConnection,
  addUser,
  loginUser
};
