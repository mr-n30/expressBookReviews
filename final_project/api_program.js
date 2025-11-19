const axios = require('axios')

async function getAllBooks() {
   try {
        const res = await axios.get('http://localhost:1337/')
        console.log(res.data)
    }
    catch(e) {
        console.log(`An error occurred=>${e}`)
    }
}

getAllBooks()

async function searchByIsbn() {
    fetch('http://localhost:1337/isbn/1')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

searchByIsbn()

async function searchByAuthor() {
    try {
        const res = await axios.get('http://localhost:1337/title/the')
        console.log(res.data)
    }

    catch(e) {
        console.log(e)
    }
}

searchByAuthor()

async function searchByTitle() {
    try {
        const res = await axios.get('http://localhost:1337/author/hans')
        console.log(res.data)
    }
    catch(e) {
        console.log(e)
    }
}

searchByTitle()