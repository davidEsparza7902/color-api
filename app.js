const cors = require('cors');
const express = require('express');

const app = express();
const colorRouter = require('./src/controllers/colors');
const logger = require('./src/utils/logger');
const middleware = require('./src/utils/middleware');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/colors', colorRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler); 

module.exports = app;
