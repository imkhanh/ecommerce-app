const Products = require('../models/products');
const path = require('path');
const fs = require('fs');

const deleteImages = (images, mode) => {
	let basePath = path.join(__dirname, '../../client/public/uploads/products/');

	for (var i = 0; i < images.length; i++) {
		let filePath = '';
		if (mode === 'file') {
			filePath = basePath + `${images[i].filename}`;
		} else {
			filePath = basePath + `${images[i]}`;
		}

		fs.unlink(filePath, (err) => {
			if (err) return err;
		});
	}
};

const productController = {
	getAllProducts: async (req, res) => {
		try {
			const products = await Products.find({}).populate('category', '_id title');
			if (products) return res.json({ products });
		} catch (error) {
			console.log(error);
		}
	},
	getSingleProduct: async (req, res) => {
		try {
			const product = await Products.findById(req.params.id).populate('category', '_id title');
			if (product) return res.json({ product });
		} catch (error) {
			console.log(error);
		}
	},
	addProduct: async (req, res) => {
		try {
			const images = req.files;
			const { title, category, description, colors, sizes, price, quantity, offer, status } = req.body;
			if (!(title && category && description && price && quantity)) {
				deleteImages(images, 'file');
				return res.json({ error: 'Please fill all the fields' });
			}

			if (images.length < 2) {
				deleteImages(images, 'file');
				return res.json({ error: 'Must to provide 2 images' });
			}
			const allImage = [];

			for (const img of images) {
				allImage.push(img.filename);
			}

			const newProduct = new Products({ title, images: allImage, category, description, colors, sizes, price, quantity, offer, status });
			await newProduct.save();

			return res.json({ success: 'Product added successfully', products: newProduct });
		} catch (error) {
			console.log(error);
		}
	},
	editProduct: async (req, res) => {},
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
	addCartProduct: async (req, res) => {
		try {
			const { cartProduct } = req.body;

			const products = await Products.find({
				_id: { $in: cartProduct },
			});
			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	addWishProduct: async (req, res) => {
		try {
			const { wishProduct } = req.body;

			const products = await Products.find({
				_id: { $in: wishProduct },
			});
			if (products) {
				return res.jon({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	addReview: async (req, res) => {},
	deleteReview: async (req, res) => {},
};

module.exports = productController;
