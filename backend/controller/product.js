const Product = require('../models/Product');
const fs = require('fs');

exports.create = async (req, res) => {
	const { filename } = req.file;
	const {
		name,
		description,
		price,
		productCategory,
		countInStock,
	} = req.body;

	try {
		let product = new Product();
		product.fileName = filename;
		product.name = name;
		product.description = description;
		product.price = price;
		product.productCategory = productCategory;
		product.countInStock = countInStock;

		await product.save();

		res.json({
			successMessage: `${name} was created`,
			product,
		});
	} catch (err) {
		console.log(err, 'productController.create error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.readAll = async (req, res) => {
	try {
		const products = await Product.find({}).populate(
			'productCategory',
			'category'
		);

		res.json({ products });
	} catch (err) {
		console.log(err, 'productController.readAll error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.read = async (req, res) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findById(productId);

		res.json(product);
	} catch (err) {
		console.log(err, 'productController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.update = async (req, res) => {
	const productId = req.params.productId;

	req.body.fileName = req.file.filename;

	const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

	fs.unlink(`/backend/uploads/${oldProduct.fileName}`, err => {
		if (err) throw err;
		console.log('Image successfully deleted from the filesystem');
	});

	res.json({
		successMessage: 'Product successfully updated',
	});
};

exports.delete = async (req, res) => {
	try {
		const productId = req.params.productId;
		const deletedProduct = await Product.findByIdAndDelete(productId);

		fs.unlink(`backend/uploads/${deletedProduct.fileName}`, err => {
			if (err) throw err;
			console.log(
				'Image successfully deleted from filesystem: ',
				deletedProduct.fileName
			);
		});

		res.json(deletedProduct);
	} catch (err) {
		console.log(err, 'productController.delete error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};