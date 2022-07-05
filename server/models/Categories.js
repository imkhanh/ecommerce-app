const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: String,
		status: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('categories', categorySchema);
