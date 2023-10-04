const express  = require('express')
const { 
    getRecords, 
    postRecords, 
    getOneRecord, 
    getMultipleRecords, 
    deltRecord
} = require('../controllers/PatientRecordsController')
const { 
    addMedicalHistory, 
    editMedicalHistory, 
    getOneMedicalHistory, 
    deleteMedicalHistory
} = require('../controllers/MedicalHistoryController')
const router = express.Router()

router.route('/').get(getRecords).post(postRecords)

router.route('/:id').get(getOneRecord).delete(deltRecord)

router.route('/:ids').get(getMultipleRecords)

router.route('/:id/medical-history').post(addMedicalHistory)

router.route('/medical-history/:id').put(editMedicalHistory).get(getOneMedicalHistory).delete(deleteMedicalHistory)

module.exports = router