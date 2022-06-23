require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// connect database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('========= Mongoose connect successfully =========');
	})
	.catch((err) => console.log('Database not connect'));

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api', require('./routes/auth.route'));

//run server
const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on:::: ${PORT}`);
});
