require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// connect database
const options = {
	autoIndex: false,
	family: 4,
};
mongoose
	.connect(process.env.MONGO_URI, options)
	.then(() => {
		console.log('========= Mongoose connect successfully =========');
	})
	.catch((err) => console.log('Database not connect'));

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api', require('./routes/AuthRoutes'));
app.use('/api/product', require('./routes/ProductRoutes'));
app.use('/api/category', require('./routes/CategoryRoute'));

//run server
const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on:::: ${PORT}`);
});