const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = {
  "admin": { password: "password" }
};
const jwt_secret = 'SuperSecretK3y123@!$';

const isValid = (username) => { //returns boolean
  if (typeof users[username] !== 'undefined') return true
}

const authenticatedUser = (username, password) => { //returns boolean
  if (isValid(username) && users[username]["password"] === password) return true
  return false
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body
  if ([username, password].some(item => typeof item === 'undefined')) {
    return res.send({ message: "Missing parameters!" })
  } else if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      { data: username },
      jwt_secret,
      { expiresIn: 60 * 60 }
    )
    req.session.authorization = { accessToken, username }
    return res.status(302).redirect('/')
  } else {
    return res.status(401).json({ message: "You are not authenticated" });
  }
});

regd_users.get("/auth/home", (req, res) => {
  return res.send("You are logged in!")
})

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const auth = req.session.authorization
  const isbn = req.params.isbn

  if (!auth || !auth.accessToken) {
    return res.status(401).json({message: "You are not logged in!"})
  } 

  if (books.hasOwnProperty(isbn)) {
    books[isbn]["reviews"] = {
      ...books[isbn]["reviews"],
      [auth.username]: req.body.review
    }

    return res.status(201).json({message: "Review created!"})
  }

  return res.status(400).json({ message: "An error occurred. Unable to create review!" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
