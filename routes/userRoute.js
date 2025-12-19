const express = require('express')
const userController = require('../controllers/usercontroller')
const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

router
  .route('/login')
  .get(userAuth.isLogged, userController.loadLogin)
  .post(userController.userLogin)

router
  .route('/signup')
  .get(userAuth.isLogged, userController.loadSignup)
  .post(userController.signup)

router
  .route('/')
  .get(userAuth.checkLogged, userController.loadHome)

router.route('/logout').get(userController.logout)

router
  .route('/add-user')
  .get(userAuth.checkLogged,userController.loadAddUser)
  .post(userController.addUser)

router
  .route('/edit/:id')
  .get(userAuth.checkLogged,userController.loadEdit)
  .post(userController.editUser)

router
  .route("/delete/:id")
  .get(userAuth.checkLogged,userController.deleteUser)

module.exports = router
