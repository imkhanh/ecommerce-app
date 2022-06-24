const Products = require('../models/Products');
const fs = require('fs');
const path = require('path');

const deleteImages = (images, mode) => {
	let basePath = path.resolve(__dirname, '../../client/public/uploads/products/');

	for (let i = 0; i < images.length; i++) {
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
			const product = await Products.findById(req.params.id).populate('category', '_id name').populate('ratingReviews.user', 'username email avartar');
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
	addToCart: async (req, res) => {
		try {
			const { cartProduct } = req.body;
			const products = await Products.find({
				_id: { $in: cartProduct },
			}).populate('category', '_id name');

			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	addToWish: async (req, res) => {
		try {
			const { wishProduct } = req.body;
			const products = await Products.find({
				_id: { $in: wishProduct },
			}).populate('category', '_id name');

			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	searchByName: async (req, res) => {
		try {
			const products = await Products.find({ name: { $regex: req.query.name, $options: 'i' } }).populate('category', '_id name');
			return res.json({ products });
		} catch (error) {
			console.log(error);
		}
	},
	productByCategory: async (req, res) => {
		try {
			const { cateId } = req.body;
			const products = await Products.find({
				category: cateId,
			}).populate('category', '_id name');

			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	productByPrice: async (req, res) => {
		try {
			const { price } = req.body;
			const products = await Products.find({
				price: { $lt: price },
			}).populate('category', '_id name');

			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	addReview: async (req, res) => {
		try {
			const { pId, uId, review, rating } = req.body;

			if (!review || !rating) return res.json({ error: 'Please fill all the fields' });

			// let checkReviewExists = await Products.findOne({ _id: pId });
			// console.log(checkReviewExists.ratingReviews);
			// if (checkReviewExists.ratingReviews.length > 0) {
			// 	checkReviewExists.map((item) => {
			// 		if (item.user === uId) {
			// 			return res.json({ error: 'Your already reviewed the product' });
			// 		}
			// 	});
			// }

			const newRatingReview = await Products.findByIdAndUpdate(pId, {
				$push: {
					ratingReviews: {
						user: uId,
						review: review,
						rating: rating,
					},
				},
			});

			if (newRatingReview) {
				return res.json({ success: 'Thanks for your review' });
			}
		} catch (error) {
			console.log(error);
		}
	},
	deleteReview: async (req, res) => {
		try {
			const { pId, rId } = req.body;

			await Products.findByIdAndUpdate(pId, {
				$pull: {
					ratingReviews: { _id: rId },
				},
			});

			return res.json({ success: 'Your review is deleted' });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
