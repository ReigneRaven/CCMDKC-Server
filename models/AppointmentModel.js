const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your Name']
    },
    appointmentDate: {
        type: Date,
        required: [true, 'Please add Date']
    },
    appointmentTime: {
        type: String,
        required: [true, 'Please add Time Slot']
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Denied'],
        default: 'Pending' 
      }
}, {
    timestamps: true
})

module.exports = mongoose.model('Appointment', appointmentSchema)