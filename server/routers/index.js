const express = require('express')
const UserController = require('../controllers/UserController')
const BookController = require('../controllers/BookController')
const ListController = require('../controllers/ListController')
const isAuthenticate = require('../middleware/isAuthenticate')

const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/auth/google', UserController.googleLogin)

router.get('/books', isAuthenticate, BookController.getAllBooks)
router.post('/getreccomendation', isAuthenticate, BookController.getRec)
router.get('/myreadlist', isAuthenticate, ListController.showReadingList)
router.post('/myreadlist', isAuthenticate, ListController.addToReadingList)
router.get('/myreadlist/:id', isAuthenticate, ListController.getListById)
router.delete('/myreadlist/delete/:id', isAuthenticate, ListController.deleteReadingList)
router.put('/myreadlist/edit/:id', isAuthenticate, ListController.editReadingList)



module.exports = router