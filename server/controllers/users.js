const Users = require('../models/users');
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
	editUser: async (req, res) => {
		try {
			const { name, email, phone, address, gender } = req.body;
			const editUser = await Users.findByIdAndUpdate({ _id: req.params.id }, { name, email, phone, address, gender }, { new: true });

			await editUser.save();
			return res.json({ success: 'User edited successfully' });
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
	changePassword: async (req, res) => {
		try {
			let { uId, oldPassword, newPassword } = req.body;
			if (!uId || !oldPassword || !newPassword) {
				return res.json({ error: 'Please fil all the fields' });
			}

			const user = await Users.findOne({ _id: uId });

			const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
			if (checkOldPassword) {
				newPassword = await bcrypt.hash(newPassword, 12);
				await Users.findByIdAndUpdate(uId, { password: newPassword });
				return res.json({ success: 'Password updated successfully' });
			} else {
				return res.json({ success: 'Your old password is wrong' });
			}
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = userController;
