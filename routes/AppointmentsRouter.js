const express  = require('express')
const { getAppointment, postAppointment, checkAppointment, updateAppointment, deltAppointment, getOneAppointment, deltMultiAppointment, getMultiAppointments, getAppointmentsByUser } = require('../controllers/AppoinmentsController')
const router = express.Router()

router.route('/').get(getAppointment).post(postAppointment)

router.route('/check').post(checkAppointment)

router.route('/:id').put(updateAppointment).delete(deltAppointment).get(getOneAppointment)

router.route('/multiple/:ids').delete(deltMultiAppointment).get(getMultiAppointments)

router.route('/user/:id').get(getAppointmentsByUser);

module.exports = router