const express = require('express');
const bodyParser = require('body-parser');
const workshopRoutes = require('./routes/workshopRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api', workshopRoutes);
app.use('/api', notificationRoutes);

module.exports = app;
