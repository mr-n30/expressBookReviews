const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Create a user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if ([username, password].some(item => typeof item === 'undefined')) {
    return res.status(403).json({ message: "Missing parameter!" })
  }

  // Prevent user from overwriting another user
  if (users[username]) {
    return res.status(201).json({ message: "User created!" }) // return same response to prevent user enumeration vulnerability
  }

  users[username] = { "password": password }
  return res.status(201).json({ message: "User created!" })
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  if (typeof req.params.isbn !== 'undefined') return res.status(200).json(books[req.params.isbn])
  return res.status(404).json({message: "Book not found with that ISBN"})
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
