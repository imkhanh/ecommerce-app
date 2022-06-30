const Categories = require('../models/categories');
const path = require('path');
const fs = require('fs');

const productController = {
	getAllCategories: async (req, res) => {
		try {
			const categories = await Categories.find({});
			if (categories) return res.json({ categories });
		} catch (error) {
			console.log(error);
		}
	},
	getSingleCategory: async (req, res) => {
		try {
			const category = await Categories.findById(req.params.id);
			if (category) return res.json({ category });
		} catch (error) {
			console.log(error);
		}
	},
	addCategory: async (req, res) => {
		try {
			const imageFile = req.file.filename;
			const filePath = path.resolve(__dirname, `../../client/public/uploads/categories/${imageFile}`);

			const { title, description, status } = req.body;
			if (!title) {
				fs.unlink(filePath, (err) => {
					if (err) return err;
				});
				return res.json({ error: 'Please fill all the fields' });
			}

			const newCategory = new Categories({ image: imageFile, title, description, status });
			await newCategory.save();

			return res.json({ success: 'Category added succssfully', category: newCategory });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
