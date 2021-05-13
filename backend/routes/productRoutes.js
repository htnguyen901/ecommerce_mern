const express = require('express');
const router = express.Router();

const {getAllProducts,getProductById} = require('../controller/productController');

//Get all products from db
//@route get /api/product
//@access Public
router.get('/', getAllProducts)

//Get a product by id from db
//@route get /api/product/:id
//@access Public
router.get('/:id', getProductById)

module.exports = router;