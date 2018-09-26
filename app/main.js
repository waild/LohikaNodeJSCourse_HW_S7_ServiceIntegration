const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const ordersRoutes = require('./routes/orders');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', ordersRoutes);

module.exports = app;
