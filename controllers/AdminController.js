const asyncHandler = require('express-async-handler')
const Admin = require('../models/AdminModel')
const CrytpoJS = require('crypto-js')

//Get All Admin
//@route GET /api/admin
//@access Public
const getAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.find({Admin})
    res.status(200).json(admin)
})

//Get One Admin
//@route GET /api/admin/:id
//@access Public
const getOneAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin){
        res.status(400)
        throw new Error('User no found')
    }
    
    res.status(200).json(admin)
})

//Get Multiple Admin
//@route GET /api/admin/:ids
//@access Public
const getMultiAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.find({Admin})
    res.status(200).json(admin)
})

//Login Admin
//@route POST /api/admin/login
//@access Public
const loginAdmin = asyncHandler (async (req, res) => {
    let { email, password } = req.body
    const bytes  = CrytpoJS.AES.decrypt(password, 'secret key 123')
    const originalPass = bytes.toString(CrytpoJS.enc.Utf8)
    
    const compare = () => {
        originalPass === password
    }

    if(!email && !compare){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exist
    const userExist = await Admin.findOne({email, compare})

    if(userExist){
        const getUser = await Admin.findOne(userExist)
        res.status(200).json(getUser)
    } else {
        res.status(400)
        throw new Error('Wrong Credentials')
    }

})

//Post Admin
//@route POST /api/admin
//@access Public
const postAdmin = asyncHandler (async (req, res) => {
    const { 
        name,
        role,
        email,
        password
     } = req.body

    if(!name && !role){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exist
    const userExist = await Admin.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('Email already in use')
    }

    const cipher = CrytpoJS.AES.encrypt(password, 'secret key 123').toString()

    const admin = await Admin.create({
        name, 
        role,
        email, 
        password: cipher
    })

    if(admin){
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            role: admin.role,
            email: admin.email,
            password: admin.cipher
        })
    } else {
        res.status(400)
        throw new Error('Cant register')
    }
})

//Update Admin
//@route PUT /api/admin/:id
//@access Public
const updateAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin){
        res.status(400)
        throw new Error('User no found')
    }

    const updatedUser = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedUser)
})

//Edit Admin Password
//@route PUT /api/admin/:id
//@access Public
const editAdminPassword = asyncHandler (async (req, res) => {
    //Check if User exist
    const checkUser = await Admin.findById(req.params.id)

    if(!checkUser){
        res.status(400)
        throw new Error('User not found')
    }

    const cipher = CrytpoJS.AES.encrypt(req.body.password, 'secret key 123').toString()
    const editUserPassword = await Admin.findByIdAndUpdate(
        req.params.id,
        {password: cipher},
        {new: true}
    )
    res.status(200).json(editUserPassword)
})

//Delete Admin
//@route DELETE /api/user/:id
//@access Public
const deltAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin){
        res.status(400)
        throw new Error('User no found')
    }

    await admin.deleteOne()

    res.status(200).json({ id: req.params.id})
})


//Delete Multiple Admin
//@route DELETE /api/admin/:ids
//@access Public
const deltMultiAdmin = asyncHandler (async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin){
        res.status(400)
        throw new Error('User no found')
    }

    await admin.deleteMany()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getAdmin,
    getOneAdmin,
    getMultiAdmin,
    postAdmin,
    updateAdmin,
    editAdminPassword,
    deltAdmin,
    deltMultiAdmin,
    loginAdmin
}