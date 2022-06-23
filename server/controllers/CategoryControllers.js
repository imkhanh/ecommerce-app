const Categories = require('../models/Categories');

const productController = {
	getAllCategories: async (req, res) => {
		try {
			const categories = await Categories.find({});
			if (categories) {
				return res.json({ categories });
			}
		} catch (error) {
			console.log(error);
		}
	},
	addCategory: async (req, res) => {
		try {
			const { name, description, status, image } = req.body;
			const newCategory = new Categories({ name, description, status, image });

			await newCategory.save();
			return res.json({ category: newCategory });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
