require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on::::${PORT}`);
});
