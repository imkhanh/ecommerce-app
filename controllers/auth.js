const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
	register: async (req, res) => {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) return res.json({ error: 'Please fill all the fields' });

			const user = await Users.findOne({ email });
			if (user) return res.json({ error: 'This email already exists' });
			if (password.length < 6) return res.json({ error: 'Password must be at least 6 characters long' });

			const hashPassword = await bcrypt.hash(password, 12);
			const newUser = new Users({ name, email, password: hashPassword });
			await newUser.save();

			return res.json({ success: 'Create an account successfully', user: { ...newUser._doc, password: '' } });
		} catch (error) {
			console.log(error);
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) return res.json({ error: 'Please fill all the fields' });
			if (password.length < 6) return res.json({ error: 'Password must be at least 6 characters long' });

			const user = await Users.findOne({ email });
			if (!user) return res.json({ error: 'User does not exists' });

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) return res.json({ error: 'Password is not correct' });

			const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
			const endCode = jwt.verify(token, process.env.JWT_SECRET);

			return res.json({ success: 'Login success', token, user: endCode });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = authController;
