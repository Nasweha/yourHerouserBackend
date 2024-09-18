// import express
const express = require('express')
const userController = require('./controllers/userController')
const formController =require('./controllers/formController')
const jwtmiddleware = require('./middleware/jwtMiddleware')

// create router
const router = new express.Router()

//path to resolve regiter
router.post('/register',userController.registerController)

//path to login
router.post('/login',userController.loginController)

//path to add form
router.post('/addform',jwtmiddleware,formController.addForm)


module.exports = router