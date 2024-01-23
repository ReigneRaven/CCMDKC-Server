const mongoose = require('mongoose')

const pharmacySchema = mongoose.Schema({  
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Pharmacy', pharmacySchema)