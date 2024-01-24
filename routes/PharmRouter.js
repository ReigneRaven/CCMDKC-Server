const express = require('express');
const router = express.Router();
const {
    postPharm,
    getAllPharm,
} = require('../controllers/PharmacyController')

router.route('/pharmacy').post(postPharm)

router.route('/pharmacy/all').get(getAllPharm)