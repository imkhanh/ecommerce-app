const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		category: { type: ObjectId, ref: 'categories' },
		price: { type: Number, required: true },
		sold: { type: Number, default: 0 },
		quantity: { type: Number, default: 0 },
		images: { type: Array, default: [], required: true },
		offer: { type: String, required: true },
		status: { type: String, required: true },
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
