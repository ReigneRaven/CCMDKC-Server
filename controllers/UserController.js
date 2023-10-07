const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const CrytpoJS = require('crypto-js')
const jwt = require('jsonwebtoken');
const secretKey = 'verySecretKey';



//Get All User
//@route GET /api/user
//@access Public
const getUser = asyncHandler (async (req, res) => {
    const user = await User.find({User})
    res.status(200).json(user)
})

//Get One User
//@route GET /api/user/:id
//@access Public
const getOneUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }
    
    res.status(200).json(user)
})

//Get Multiple User
//@route GET /api/user/:ids
//@access Public
const getMultiUser = asyncHandler (async (req, res) => {
    const user = await User.find({User})
    res.status(200).json(user)
})

//Login User
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler (async (req, res) => {
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
    const userExist = await User.findOne({email, compare})
  
    if(userExist){    
        // const getUser = await User.findOne(userExist)
        // res.status(200).json(getUser)
        const userId = userExist._id;
        const isUser = userExist.role === 'patient';
        const token = jwt.sign({ userId, isUser }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token, userId, isUser });
    } 
    else {
        res.status(400)
        throw new Error('Wrong Credentials')
    }
   
})

//Post User
//@route POST /api/user
//@access Public
const postUser = asyncHandler(async (req, res) => {
    const { 
        name,
        birthday,
        sex,
        address,
        contactNum,
        email,
        password,
        confirmpassword
    } = req.body;

    if (!name || !email || !password || !confirmpassword) {
        res.status(400).json({ error: 'Please fill in all required fields' });
        return;
    }

    // Check if user with the same email already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).json({ error: 'Email already in use' });
        return;
    }

    // Encrypt the password before storing it
    const cipher = CrytpoJS.AES.encrypt(password, 'secret key 123').toString();

    const newUser = new User({
        name,
        birthday,
        sex,
        address,
        contactNum,
        email,
        password: cipher,
        confirmpassword
    });

    try {
        const savedUser = await newUser.save();

        // Create a JWT token for the new user
        const token = jwt.sign(
            { userId: savedUser._id, isAdmin: false },
            secretKey,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            token,
            userId: savedUser._id,
            name: savedUser.name,
            birthday: savedUser.birthday,
            sex: savedUser.sex,
            address: savedUser.address,
            contactNum: savedUser.contactNum,
            email: savedUser.email,
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

//Update User
//@route PUT /api/user/:id
//@access Public
const updateUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedUser)
})

//Edit User Password
//@route PUT /api/user/:id
//@access Public
const editPassword = asyncHandler (async (req, res) => {
    //Check if User exist
    const checkUser = await User.findById(req.params.id)

    if(!checkUser){
        res.status(400)
        throw new Error('User not found')
    }

    const cipher = CrytpoJS.AES.encrypt(req.body.password, 'secret key 123').toString()
    const editUserPassword = await User.findByIdAndUpdate(
        req.params.id,
        {password: cipher},
        {new: true}
    )
    res.status(200).json(editUserPassword)
})

//Delete User
//@route DELETE /api/user/:id
//@access Public
const deltUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    await user.deleteOne()

    res.status(200).json({ id: req.params.id})
})


//Delete Multiple User
//@route DELETE /api/user/:ids
//@access Public
const deltMultiUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    await user.deleteMany()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getUser,
    getOneUser,
    getMultiUser,
    postUser,
    updateUser,
    editPassword,
    deltUser,
    deltMultiUser,
    loginUser
}


