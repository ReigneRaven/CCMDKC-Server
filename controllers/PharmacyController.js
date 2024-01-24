const asyncHandler = require('express-async-handler')
const Pharmacy = require('../models/PharmModel')

// Get All Pharmacy Entries
//@route GET 'api/pharmacy/all'
const getAllPharm =  asyncHandler(async (req, res) => {
    const pharmacyData = await Pharmacy.find();
    res.status(200).json(pharmacyData);
  });


// Post a New Pharmacy Entry
const postPharm = asyncHandler(async (req, res) => {
    const { userId, quantity, modeCOD, itemId, totalPrice } = req.body;
  
    // Create a new Purchase instance
    const purchase = new Purchase({
      userId,
      quantity,
      modeCOD,
      itemId,
      totalPrice,
    });
  
    // Save the purchase to the database
    await purchase.save();
  
    // Respond with a success message or relevant data
    res.status(201).json({
      success: true,
      message: 'Purchase recorded successfully',
      purchase: {
        _id: purchase.id,
        userId: purchase.userId,
        quantity: purchase.quantity,
        modeCOD: purchase.modeCOD,
        itemId: purchase.itemId,
        totalPrice: purchase.totalPrice,
        createdAt: purchase.createdAt,
      },
    });
  });

  module.exports = {
    getAllPharm,
    postPharm,
  }
