const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your Name']
    },
    appointmentDate: {
        type: String,
        required: [true, 'Please add your Ticket Number']
    },
    appointmentType: {
        type: String,
        required: [true, 'Please add your Appointment']
    },
    appointmentTime: {
        type: String,
        required: [true, 'Please add Time Slot']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Appointment', appointmentSchema)