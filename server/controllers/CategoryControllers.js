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
			return res.json({ success: 'Category added successfully', category: newCategory });
		} catch (error) {
			console.log(error);
		}
	},
	editCategory: async (req, res) => {
		try {
			const { name, description, status } = req.body;
			if (!(name && description && status)) return res.json({ error: 'Please fill all the fields' });

			const updateCategory = await Categories.findByIdAndUpdate({ _id: req.params.id }, { name, description, status }, { new: true });
			if (updateCategory) {
				return res.json({ success: 'Category updated successfully' });
			}
		} catch (error) {
			console.log(error);
		}
	},
	deleteCategory: async (req, res) => {
		try {
			await Categories.findByIdAndDelete(req.params.id);

			return res.json({ success: 'Category deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
