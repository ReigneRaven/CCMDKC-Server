const asyncHandler = require('express-async-handler')
const Inventory = require('../models/InventoryModel')


//Get All Inventory
//@route GET /api/inventory
//@access Public
const getInventory = asyncHandler (async (req, res) => {
    const inventory = await Inventory.find({Inventory})
    res.status(200).json(inventory)
})

//Get One Inventory
//@route GET /api/inventory/:id
//@access Public
const getOneInventory = asyncHandler (async (req, res) => {
    const inventory = await Inventory.findById(req.params.id)

    if(!inventory){
        res.status(400)
        throw new Error('Appointment no found')
    }
    
    res.status(200).json(inventory)
})

//Get Multiple Inventory
//@route GET /api/inventory/:ids
//@access Public
const getMultiInventory = asyncHandler (async (req, res) => {
    const inventory = await Inventory.find({Inventory})
    res.status(200).json(inventory)
})


//Post an Inventory
//@route POST /api/inventory
//@access Public
const postInventory = asyncHandler (async (req, res) => {
    const { 
        itemName,
        itemDescription,
        stocksAvailable
     } = req.body

    if(!itemName && !stocksAvailable){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if Inventory exist
    const inventoryExist = await Appointments.findOne({itemName})

    if(inventoryExist){
        res.status(400)
        throw new Error('Timeslot already in use')
    }

    const inventory = await Inventory.create({
        itemName,
        itemDescription,
        stocksAvailable
    })

    if(inventory){
        res.status(201).json({
            _id: inventory.id,
            itemName: inventory.itemName,
            itemDescription: inventory.itemDescription,
            stocksAvailable: inventory.stocksAvailable
        })
    } else {
        res.status(400)
        throw new Error('Cant add Appointment')
    }
})


//Update an Inventory
//@route PUT /api/inventory/:id
//@access Public
const updateInventory = asyncHandler (async (req, res) => {
    const inventory = await Inventory.findById(req.params.id)

    if(!inventory){
        res.status(400)
        throw new Error('Inventory not found')
    }

    const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedInventory)
})


//Delete an Inventory
//@route DELETE /api/inventory/:id
//@access Public
const deltInventory = asyncHandler (async (req, res) => {
    const inventory = await Inventory.findById(req.params.id)

    if(!inventory){
        res.status(400)
        throw new Error('User no found')
    }

    await inventory.deleteOne()

    res.status(200).json({ id: req.params.id})
})


//Delete Multiple Inventory
//@route DELETE /api/inventory/:ids
//@access Public
const deltMultiInventory = asyncHandler (async (req, res) => {
    const inventory = await Inventory.findById(req.params.id)

    if(!inventory){
        res.status(400)
        throw new Error('User no found')
    }

    await inventory.deleteMany()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getInventory,
    getOneInventory,
    getMultiInventory,
    postInventory,
    updateInventory,
    deltInventory,
    deltMultiInventory
}