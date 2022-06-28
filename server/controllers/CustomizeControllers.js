const Customizes = require('../models/Customizes');
const fs = require('fs');
const path = require('path');
const Users = require('../models/Users');
const Products = require('../models/Products');
const Categories = require('../models/Categories');

const customizeController = {
	getAllData: async (req, res) => {
		try {
			const users = await Users.find({}).count();
			const products = await Products.find({}).count();
			const categories = await Categories.find({}).count();

			if ((users, products, categories)) {
				return res.json({ users, products, categories });
			}
		} catch (error) {
			console.log(error);
		}
	},
	getAllSlides: async (req, res) => {
		try {
			const images = await Customizes.find({});
			if (images) {
				return res.json({ images });
			}
		} catch (error) {
			console.log(error);
		}
	},
	uploadSlideImage: async (req, res) => {
		try {
			const image = req.file.filename;
			if (!image) return res.json({ error: 'All field required' });

			const newSlideImage = new Customizes({ slideImage: image });

			await newSlideImage.save();
			return res.json({ success: 'Image upload successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	deleteSlideImage: async (req, res) => {
		try {
			const image = await Customizes.findById(req.params.id);
			const filePath = path.resolve(__dirname, `../../client/public/uploads/slides/${image.slideImage}`);

			const deleteImage = await Customizes.findByIdAndDelete(req.params.id);
			if (deleteImage) {
				fs.unlink(filePath, (err) => {
					if (err) return err;
				});

				return res.json({ success: 'Image deleted successfully' });
			}
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = customizeController;
