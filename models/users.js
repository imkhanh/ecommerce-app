const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		password: String,
		role: { type: Number, default: 0 },
		gender: String,
		phone: Number,
		address: String,
		active: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
