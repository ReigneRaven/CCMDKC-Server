const express  = require('express')
const { 
    loginUser, 
    getUser, 
    postUser, 
    updateUser, 
    deltUser, 
    getOneUser, 
    deltMultiUser, 
    getMultiUser, 
    editPassword
} = require('../controllers/UserController')
const router = express.Router()

router.route('/').get(getUser).post(postUser)

router.route('/login').post(loginUser)

router.route('/:id').put(updateUser).delete(deltUser).get(getOneUser).put(editPassword)

router.route('/:ids').delete(deltMultiUser).get(getMultiUser)

module.exports = router