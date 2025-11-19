const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a user
public_users.post("/register", (req,res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    return res.status(400).json({message: "Missing required parameter(s)!"})
  }

  if (isValid(username)) {
    return res.status(403).json({message: "User already exists!"})
  }

  users[username] = {password}
  return res.status(201).json({message: "User created!"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  if (books[isbn]) return res.status(200).json({[isbn]: books[isbn]});
  return res.status(404).json({message: "Not found!"})
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  for (let key in books) {
    const safePattern = RegExp.escape(req.params.author)
    const regex = new RegExp(safePattern, "i")

    if(regex.test(books[key]["author"])) {
      return res.status(200).json({[key]: books[key]})
    }
  }

  return res.status(404).json({message: "A book with that author doesn't exist!"})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const matches = []
  for (let key in books) {
    const safePattern = RegExp.escape(req.params.title)
    const regex = new RegExp(safePattern, "i")
    const matched = regex.test(books[key]["title"])
    if (matched) {
      matches.push(books[key])
    }
  }

  if (matches.length > 0) {
    return res.status(200).json({"books": matches})
  }

  return res.status(404).json({message: "A book with that title doesn't exist!"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  if(books.hasOwnProperty(isbn)) {
    return res.status(200).json({[isbn]: books[isbn]})
  }
  return res.status(404).json({message: "A book with that ISBN doesn't exist!"});
});

module.exports.general = public_users;
