const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {
    APP_PORT,
    MONGO_CONNECT_URL
} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL)
    .then(() => console.log('Mongo was connected successfully'));

app.listen(APP_PORT, () => {
    console.log(`App listening port: ${APP_PORT}`);
});
