const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')
const { name } = require('ejs')
const SALT_ROUND = 10

const loadLogin = (req, res) => {
  res.render('login', { error: null, message: null })
}

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await userModel.user.findOne({ name: username })
    if (!user) {
      return res.render('login', { error: 'Invalid credential', message: null })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.render('login', {
        error: 'Password does not match',
        message: null
      })
    } else {
      req.session.user = user._id
      console.log(user._id)
      res.redirect('/')
    }
  } catch (error) {
    console.log(error)
    res.render('login', { error: 'Something Wrong', message: null })
  }
}

const loadSignup = (req, res) => {
  res.render('signup', { error: null, message: null })
}

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await userModel.user.findOne({ name: username })
    if (user) return res.render('signup', { error: 'User already exists' })
    const hashedPass = await bcrypt.hash(password, SALT_ROUND)
    const newUser = new userModel.user({
      name: username,
      email:email,
      password: hashedPass
    })
    await newUser.save()
    const userId = await userModel.user.findOne({name : username})
    req.session.user = userId._id
    console.log(userId._id)
    res.redirect("/")
  } catch (error) {
    console.log(error)
    res.render('login', {
      error: 'Something went wrong',
      message: null
    })
  }
}

const loadHome = async (req, res) => {
  const search = req.query.search || ''
  const userId = req.session.user
  console.log(userId)
  try {
    let query = search ? { userId : userId, name: { $regex: `^${search}`, $options: 'i' }} : { userId : userId };
    // } else {
    //   const users = await userModel.contacts.find()
    //   res.render('home', { users, search })
    // }
    const users = await userModel.contacts.find(query);
    // console.log(users);
    res.render('home' , {users,search})
  } catch (error) {
    console.log(error)
  }
}

const loadAddUser = (req, res) => {
  res.render('add-user', { error: null, value: null })
}

const addUser = async (req, res) => {
  const { username, email, phone } = req.body
  const userId = req.session.user
  console.log(userId)
  try {
    const user = await userModel.contacts.findOne({ name: username , userId : userId })
    if (user)
      return res.render('add-user', {
        error: 'This contact already exists',
        value: null
      })
    const newcontact = new userModel.contacts({
      name: username,
      email: email,
      phoneNumber: phone,
      userId : userId
    })
    await newcontact.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.render('add-user', { error: 'Something wrong', value: null })
  }
}

const logout = (req, res) => {
  req.session.user = null
  res.redirect('/login')
}

const loadEdit = (req, res) => {
  const id = req.params.id
  res.render('add-user', { value: id, error: null })
}

const editUser = async (req, res) => {
  const id = req.params.id
  const { username, email, phone } = req.body
  try {
    const user = await userModel.contacts.find({ id })
    if (!user)
      return res.render('add-user', {
        value: id,
        error: 'Contact does not exists'
      })
    const updateUser = await userModel.contacts.updateOne(
      { name: id },
      {
        name: username,
        email: email,
        phoneNumber: phone
      }
    )
    res.redirect('/')
  } catch (error) {
    console.log('Error in edituser', error)
  }
}

const deleteUser = async (req, res) => {
  try {
    await userModel.contacts.deleteOne({ name: req.params.id })
    res.redirect('/')
  } catch (error) {}
}

module.exports = {
  loadLogin,
  userLogin,
  loadHome,
  loadSignup,
  signup,
  logout,
  loadAddUser,
  addUser,
  loadEdit,
  editUser,
  deleteUser
}
