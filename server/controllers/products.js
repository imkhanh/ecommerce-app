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
			const { title, category, description, price, quantity, discount, status } = req.body;

			if (!(title && category && description && price && quantity)) {
				deleteImages(images, 'file');
				return res.json({ error: 'Please fill all the fields' });
			} else if (images.length < 1) {
				deleteImages(images, 'file');
				return res.json({ error: 'Must to provide 2 images' });
			} else {
				const allImage = [];
				for (const img of images) {
					allImage.push(img.filename);
				}

				const afterDiscount = Math.round(price - (price * discount) / 100);

				const newProduct = new Products({ title, images: allImage, category, description, price, price_discount: afterDiscount, quantity, discount, status });
				await newProduct.save();

				return res.json({ success: 'Product added successfully', product: newProduct });
			}
		} catch (error) {
			console.log(error);
		}
	},
	editProduct: async (req, res) => {
		try {
			const editImages = req.files;
			const { title, category, images, description, price, quantity, discount, status } = req.body;

			if (!(title && category && description && price && quantity)) {
				deleteImages(images, 'file');
				return res.json({ error: 'Please fill all the fields' });
			} else if (images.length === 1) {
				deleteImages(images, 'file');
				return res.json({ error: 'Must to provide 2 images' });
			} else {
				let data = { title, category, images, description, price, quantity, discount, status };
				const allImages = [];
				for (const img of editImages) {
					allImages.push(img.filename);
				}
				const afterDiscount = Math.round(price - (price * discount) / 100);
				data = { ...data, images: allImages, price_discount: afterDiscount };
				deleteImages(images.split(','), 'string');

				const editProduct = await Products.findByIdAndUpdate({ _id: req.params.id }, data, { new: true });

				return res.json({ success: 'Product edited successfully', product: editProduct });
			}
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
	addCartProduct: async (req, res) => {
		try {
			const { cartProduct } = req.body;

			const products = await Products.find({
				_id: { $in: cartProduct },
			})
				.populate('category', '_id title')
				.sort('-createdAt');
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
			})
				.populate('category', '_id title')
				.sort('-createdAt');

			if (products) {
				return res.json({ products });
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
			return res.json({ success: 'Review deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
