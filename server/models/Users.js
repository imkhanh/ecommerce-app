const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		fullname: String,
		username: String,
		email: String,
		password: String,
		role: {
			type: Number,
			default: 1,
		},
		phone: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
