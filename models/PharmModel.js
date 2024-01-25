const mongoose = require('mongoose');

const pharmacySchema = mongoose.Schema({
    UserName:{
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    modeCOD: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Order Received'],
        default: 'Pending' 
      }
}, {
    timestamps: true
});

module.exports = mongoose.model('Purchase', pharmacySchema);
