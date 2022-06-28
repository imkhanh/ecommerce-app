const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const userController = {
	getAllUsers: async (req, res) => {
		try {
			const users = await Users.find({});
			if (users) {
				return res.json({ users });
			}
		} catch (error) {
			console.log(error);
		}
	},
	getSingleUser: async (req, res) => {
		try {
			const user = await Users.findById(req.params.id);
			if (!user) {
				return res.json({ error: 'User does not exists' });
			}

			return res.json({ user });
		} catch (error) {
			console.log(error);
		}
	},
	updateUser: async (req, res) => {
		try {
			const { fullname, username, email, phone } = req.body;

			const updateUser = await Users.findByIdAndUpdate({ _id: req.params.id }, { fullname, username, email, phone, updateAt: Date.now() }, { new: true });

			return res.json({ success: 'Success', user: updateUser });
		} catch (error) {
			console.log(error);
		}
	},
	changePassword: async (req, res) => {
		try {
			const { oldPass, newPass } = req.body;

			const user = await Users.findOne({ _id: req.params.id });
			if (!user) return res.json({ error: 'User does not exists' });

			const oldPassCheck = await bcrypt.compare(oldPass, user.password);
			if (oldPassCheck) {
				const newPassChange = await bcrypt.hash(newPass, 12);
				await Users.findByIdAndUpdate({ _id: req.params.id }, { password: newPassChange });

				return res.json({ success: 'Password updated successfully' });
			} else {
				return res.json({ error: 'Your old password is wrong' });
			}
		} catch (error) {
			console.log(error);
		}
	},
	deleteUser: async (req, res) => {
		try {
			await Users.findByIdAndDelete(req.params.id);

			return res.json({ success: 'User deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = userController;
