const Customizes = require('../models/customizes');
const Products = require('../models/products');
const Users = require('../models/users');
const Categories = require('../models/categories');
const fs = require('fs');
const path = require('path');

const customizeController = {
	getAllData: async (req, res) => {
		try {
			const products = await Products.countDocuments();
			const users = await Users.countDocuments();
			const categories = await Categories.countDocuments();

			if (products && users && categories) {
				return res.json({ products, users, categories });
			}
		} catch (error) {
			console.log(error);
		}
	},
	getAllSlides: async (req, res) => {
		try {
			const slides = await Customizes.find({});
			if (slides) {
				return res.json({ slides });
			}
		} catch (error) {
			console.log(error);
		}
	},
	addSlide: async (req, res) => {
		try {
			const image = req.file.filename;

			if (!image) {
				return res.json({ error: 'Please add slide' });
			}

			const newSlide = new Customizes({ slideImage: image });
			await newSlide.save();

			return res.json({ success: 'Slide added successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	deleteSlide: async (req, res) => {
		try {
			const slide = await Customizes.findById(req.params.id);
			const filePath = path.resolve(`../../client/public/uploads/customizes/${slide.slideImage}`);

			const delSlide = await Customizes.findByIdAndDelete(req.params.id);
			if (delSlide) {
				fs.unlink(filePath, (err) => {
					if (err) console.log(err);
				});

				return res.json({ success: 'Slide deleted successfully' });
			}
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = customizeController;
