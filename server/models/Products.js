const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		category: { type: ObjectId, ref: 'categories' },
		price: { type: Number, required: true },
		discount: Number,
		price_discount: Number,
		sold: { type: Number, default: 0 },
		quantity: { type: Number, required: true },
		images: { type: Array, default: [], required: true },
		status: String,
		ratingReviews: [
			{
				rating: String,
				review: String,
				user: { type: ObjectId, ref: 'users' },
				createdAt: {
					type: Date,
					defautl: Date.now(),
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('products', productSchema);
