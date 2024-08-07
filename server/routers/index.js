const express = require('express')
const UserController = require('../controllers/UserController')
const BookController = require('../controllers/BookController')
const ListController = require('../controllers/ListController')
const isAuthenticate = require('../middleware/isAuthenticate')

const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/books', BookController.getAllBooks)
router.get('/myreadlist', isAuthenticate, ListController.showReadingList)

module.exports = router