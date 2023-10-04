const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your Name']
    },
    birthday: {
        type: String,
        required: [true, 'Please add your Birthday']
    },
    sex: {
        type: String,
        required: [true, 'Please add your Sex']
    },
    address: {
        type: String,
        required: [true, 'Please add your Address']
    },
    contact_no: {
        type: String,
        required: [true, 'Please add your Contact Number']
    },
    email: {
        type: String,
        required: [true, 'Please add your Email']
    },
    password: {
        type: String,
        required: [true, 'Please add your Password']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)