const express  = require('express')
const { getInventory, postInventory, updateInventory, deltInventory, getOneInventory, deltMultiInventory, getMultiInventory } = require('../controllers/InventoryController')
const router = express.Router()

router.route('/').get(getInventory).post(postInventory)

router.route('/:id').put(updateInventory).delete(deltInventory).get(getOneInventory)

router.route('/:ids').delete(deltMultiInventory).get(getMultiInventory)

module.exports = router