const express = require('express');

const {
    postPharm,
    getAllPharm,
    getPurchasesByUser,
    updatePurchase,
    updateInventory
} = require('../controllers/PharmacyController')


const router = express.Router()

router.route('/').post(postPharm)

router.route('/all').get(getAllPharm)

router.route('/getPurchase/:id').get(getPurchasesByUser)

router.route('/:id/orderstatus').put(updatePurchase)

router.route('inventory/:id').put(updateInventory)



module.exports = router