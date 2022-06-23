const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		status: { type: String, required: true },
		image: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('categories', categorySchema);