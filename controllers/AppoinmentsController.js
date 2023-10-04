const asyncHandler = require('express-async-handler')
const Appointments = require('../models/AppointmentModel')

//Get All Appointments
//@route GET /api/appointment
//@access Public
const getAppointment = asyncHandler (async (req, res) => {
    const appointment = await Appointments.find({Appointments})
    res.status(200).json(appointment)
})

//Get One Appointment
//@route GET /api/appointment/:id
//@access Public
const getOneAppointment = asyncHandler (async (req, res) => {
    const appointment = await Appointments.findById(req.params.id)

    if(!appointment){
        res.status(400)
        throw new Error('Appointment not found')
    }
    
    res.status(200).json(appointment)
})

//Get Multiple Appointments
//@route GET /api/appointment/:ids
//@access Public
const getMultiAppointments = asyncHandler (async (req, res) => {
    const appointment = await Appointments.find({Appointments})
    res.status(200).json(appointment)
})


//Post an Appointment
//@route POST /api/appointment
//@access Public
const postAppointment = asyncHandler (async (req, res) => {
    const { 
        name,
        appointmentDate,
        appointmentType,
        appointmentTime
     } = req.body

    if(!name && !appointmentTime){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if Appointment exist
    const appointmentExist = await Appointments.findOne({appointmentTime, appointmentDate})

    if(appointmentExist){
        res.status(400)
        throw new Error('Appointment in that timeslot already in use')
    }

    const appointment = await Appointments.create({
        name,
        appointmentDate,
        appointmentType,
        appointmentTime
    })

    if(appointment){
        res.status(201).json({
            _id: appointment.id,
            name: appointment.name,
            appointmentDate: appointment.appointmentDate,
            appointmentType: appointment.appointmentType,
            appointmentTime: appointment.appointmentTime
        })
    } else {
        res.status(400)
        throw new Error('Cant add Appointment')
    }
})

//Check if an Appointment Timeslot is available
//@route POST /api/appointment/check
//@access Public
const checkAppointment = asyncHandler (async (req, res) => {
    let { appointmentTime, appointmentDate } = req.body

    if(!appointmentTime){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if Timeslot is available
    const isAvailable = await Appointments.findOne({appointmentTime, appointmentDate})
    if(isAvailable){
        res.status(400)
        throw new Error('Timeslot already in use')
    }
})


//Update an Appointment
//@route PUT /api/appointment/:id
//@access Public
const updateAppointment = asyncHandler (async (req, res) => {
    const appointment = await Appointments.findById(req.params.id)

    if(!appointment){
        res.status(400)
        throw new Error('Appointment not found')
    }

    const updatedAppointment = await Appointments.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedAppointment)
})


//Delete an Appointment
//@route DELETE /api/appointment/:id
//@access Public
const deltAppointment = asyncHandler (async (req, res) => {
    const appointment = await Appointments.findById(req.params.id)

    if(!appointment){
        res.status(400)
        throw new Error('Appointment not found')
    }

    await appointment.deleteOne()

    res.status(200).json({ id: req.params.id})
})


//Delete Multiple Appointments
//@route DELETE /api/appointment/:ids
//@access Public
const deltMultiAppointment = asyncHandler (async (req, res) => {
    const appointment = await Appointments.findById(req.params.id)

    if(!appointment){
        res.status(400)
        throw new Error('Appointment not found')
    }

    await appointment.deleteMany()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getAppointment,
    getOneAppointment,
    getMultiAppointments,
    postAppointment,
    updateAppointment,
    deltAppointment,
    deltMultiAppointment,
    checkAppointment
}