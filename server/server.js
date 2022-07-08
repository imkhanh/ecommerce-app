require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// connect database
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('========= Mongoose connect successfully ========='))
	.catch((err) => console.log('Database not connect'));

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api', require('./routes/auth'));
app.use('/api/product', require('./routes/products'));
app.use('/api/category', require('./routes/categories'));
app.use('/api/user', require('./routes/users'));
app.use('/api/customize', require('./routes/customizes'));
app.use('/api/braintree', require('./routes/braintree'));
app.use('/api/order', require('./routes/orders'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

//run server
const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on:::: ${PORT}`);
});
