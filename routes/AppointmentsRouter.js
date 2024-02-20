
const express  = require('express')
const { getAppointment, postAppointment, checkAppointment, updateAppointment, deltAppointment, getOneAppointment, deltMultiAppointment, getMultiAppointments, getAppointmentsByUser, searchAppointments } = require('../controllers/AppoinmentsController')
const router = express.Router()

router.route('/').get(getAppointment).post(postAppointment)

router.route('/check').post(checkAppointment)

router.route('/:id').delete(deltAppointment).get(getOneAppointment)

router.route('/multiple/:ids').delete(deltMultiAppointment).get(getMultiAppointments)

router.route('/user/:id').get(getAppointmentsByUser)

router.route('/:id/status').put(updateAppointment)

router.route('/search').post(searchAppointments)

module.exports = router

