const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Data = require('./model/data');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('Connection error', err.message);
});

app.get('/assignment1', async (req, res) => {
    try {
        const data = await Data.find({}); 
        res.json(data); 
    } catch (err) {
        console.error('Error retrieving documents', err);
        res.status(500).send(err); 
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
