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
        type: Number,
        required: [true, 'Please a value']
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemImg: {
        type: String, // Assuming you are storing the file path as a string
        default: "/default/image.jpg"
      },
}, {
    timestamps: true
})

module.exports = mongoose.model('Inventory', inventorySchema)