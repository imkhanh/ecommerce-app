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
			const product = await Products.findById(req.params.id).populate('category', '_id title').populate('ratingReviews.user', '_id name email');
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

			const discount = Math.round(((offer - price) / price) * 100).toString();

			const newProduct = new Products({ title, images: allImage, category, description, colors, sizes, price, discountPrice: discount, quantity, offer, status });
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
	addReview: async (req, res) => {
		try {
			const { pId, uId, rating, review } = req.body;

			if (!pId || !uId || !rating || !review) return res.json({ error: 'Please fill all the fields' });

			const product = await Products.findOne({ _id: pId });
			product.ratingReviews.map((item) => {
				if (item.user === uId) {
					return res.json({ error: 'You already reviewed the product' });
				}
			});

			const newReview = await Products.findByIdAndUpdate(pId, {
				$push: {
					ratingReviews: {
						user: uId,
						rating: rating,
						review: review,
					},
				},
			});
			await newReview.save();
			return res.json({ success: 'Thanks for your review' });
		} catch (error) {
			console.log(error);
		}
	},
	deleteReview: async (req, res) => {
		try {
			const { rId, pId } = req.body;

			if (!rId || !pId) return res.json({ error: 'Please fill all the fields' });

			await Products.findByIdAndUpdate(pId, {
				$pull: { ratingReviews: { _id: rId } },
			});
			return res.json({ error: 'Review deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
