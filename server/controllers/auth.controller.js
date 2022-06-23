const Users = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
	register: async (req, res) => {
		try {
			const { fullname, username, email, password } = req.body;

			if (!(fullname && username && email && password)) return res.json({ error: 'Please fill all the fields' });

			const user_email = await Users.findOne({ email });
			if (user_email) return res.json({ error: 'This email already exists' });

			if (password.length < 6) return res.json({ error: 'Password must be at least 6 characters long' });

			const hassPassword = await bcrypt.hash(password, 12);

			const newUser = new Users({ fullname, username, email, password: hassPassword });

			await newUser.save();

			const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
			const endCode = jwt.verify(token, process.env.JWT_SECRET);

			return res.json({ success: 'Register success', token, user: endCode });
		} catch (error) {
			console.log(error);
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) return res.json({ error: 'Please fill all the fields' });

			const user = await Users.findOne({ email });
			if (!user) return res.json({ error: 'User does not exists' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.json({ error: 'Password is not correct ' });

			if (password.length < 6) return res.json({ error: 'Password must be at least 6 characters long' });

			const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
			const endCode = jwt.verify(token, process.env.JWT_SECRET);

			return res.json({ success: 'Login success', token, user: endCode });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = authController;
