const Products = require('../models/Products');
const fs = require('fs');
const path = require('path');

const deleteImages = (images, mode) => {
	let basePath = path.resolve(__dirname + '../../client/public/uploads/products');

	for (let i = 0; i < images.length; i++) {
		let filePath = '';
		if (mode === 'file') {
			filePath = basePath + `${images[i].filename}`;
		} else {
			filePath = basePath + `${images[i]}`;
		}

		fs.unlink(filePath, (err) => {
			if (err) console.log(err);
		});
	}
};

const productController = {
	getAllProducts: async (req, res) => {
		try {
			const products = await Products.find({}).populate('category', '_id name');
			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	getSingleProduct: async (req, res) => {
		try {
			const product = await Products.findById(req.params.id);
			if (!product) {
				return res.json({ error: 'Product does not exists' });
			}
			return res.json({ product });
		} catch (error) {
			console.log(error);
		}
	},
	addProduct: async (req, res) => {
		try {
			const images = req.files;
			const { name, description, category, price, quantity, offer, status } = req.body;
			if (!(name && description && category && price && quantity && offer && status)) {
				deleteImages(images, 'file');
				return res.json({ error: 'Please fill all the fields' });
			}
			if (images.length < 2) {
				deleteImages(images, 'file');
				return res.json({ error: 'Must be at least 2 image' });
			}

			const imageArray = [];
			for (const img of images) {
				imageArray.push(img.filename);
			}
			const newProduct = new Products({ images: imageArray, name, description, category, price, quantity, offer, status });
			await newProduct.save();

			return res.json({ success: 'Success', product: newProduct });
		} catch (error) {
			console.log(error);
		}
	},
	updateProduct: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
	deleteProduct: async (req, res) => {
		try {
			const productObj = await Products.findById(req.params.id);
			const deleteProduct = await Products.findByIdAndDelete(req.params.id);

			if (deleteProduct) {
				deleteImages(productObj.images, 'string');
				return res.json({ success: 'Product deleted successfully' });
			}
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
