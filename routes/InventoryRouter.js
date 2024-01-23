// const express  = require('express')
// const { getInventory, postInventory, updateInventory, deltInventory, getOneInventory, deltMultiInventory, getMultiInventory } = require('../controllers/InventoryController')
// const router = express.Router()

// router.route('/').get(getInventory).post(postInventory)

// router.route('/:id').put(updateInventory).delete(deltInventory).get(getOneInventory)

// router.route('/:ids').delete(deltMultiInventory).get(getMultiInventory)

// module.exports = router

const express = require('express');
const { getInventory, postInventory, updateInventory, deltInventory, getOneInventory, deltMultiInventory, getMultiInventory } = require('../controllers/InventoryController');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('File Received:', file.originalname);
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  

const upload = multer({ storage: storage });

router.route('/').get(getInventory).post(upload.single('itemImg'), postInventory);

router.route('/:id').put(updateInventory).delete(deltInventory).get(getOneInventory);

router.route('/:ids').delete(deltMultiInventory).get(getMultiInventory);

module.exports = router;
