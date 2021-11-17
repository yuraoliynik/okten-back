const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {
    APP_PORT,
    MONGO_CONNECT_URL
} = require('./configs/config');

const {userRouter} = require('./routers');

const app = express();

mongoose.connect(MONGO_CONNECT_URL)
    .then(() => console.log('Mongo was connected successfully'));

app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({msg: err.message});
});

app.listen(APP_PORT, () => {
    console.log(`App listening port: ${APP_PORT}`);
});
