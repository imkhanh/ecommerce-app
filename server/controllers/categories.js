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
			const { title, description, status } = req.body;

			const filePath = path.resolve(__dirname, `../../client/public/uploads/categories/${imageFile}`);

			if (!(imageFile && title && description && status)) {
				fs.unlink(filePath, (err) => {
					if (err) return err;
				});
				return res.json({ error: 'Please fill all the fields' });
			}

			const checkTitleExists = await Categories.findOne({ title });
			if (checkTitleExists) {
				fs.unlink(filePath, (err) => {
					if (err) return err;
				});
				return res.json({ error: 'Title already exists' });
			}
			const newCategory = new Categories({ image: imageFile, title, description, status });
			await newCategory.save();

			return res.json({ success: 'Category added succssfully', category: newCategory });
		} catch (error) {
			console.log(error);
		}
	},
	editCategory: async (req, res) => {
		try {
			const editImageFile = req.file.filename;
			const { title, description, status, image } = req.body;
			const filePath = path.resolve(__dirname, `../../client/public/uploads/categories/${editImageFile}`);

			if (!(image && title && description && status)) {
				fs.unlink(filePath, (err) => {
					if (err) return err;
				});
				return res.json({ error: 'Please fill all the fields' });
			}

			await Categories.findByIdAndUpdate({ _id: req.params.id }, { image: editImageFile, title, description, status }, { new: true });
			return res.json({ success: 'Category edited successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	deleteCategory: async (req, res) => {
		try {
			const product = await Categories.findById(req.params.id);
			const filePath = path.resolve(__dirname, `../../client/public/uploads/categories/${product.image}`);

			const deleteCat = await Categories.findByIdAndDelete(req.params.id);

			if (deleteCat) {
				fs.unlink(filePath, (err) => {
					if (err) return err;
				});
				return res.json({ success: 'Category deleted successfully' });
			}
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
