const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Please a value']
    },
    itemDescription: {
        type: String,
        required: [true, 'Please a value']
    },
    stocksAvailable: {
        type: String,
        required: [true, 'Please a value']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Inventory', inventorySchema)