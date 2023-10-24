const cors = require('cors');
const express = require('express');
const { connectDB } = require('./database/config');
const app = express();
const colorRouter = require('./controllers/colors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
connectDB();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/colors', colorRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler); 

module.exports = app;
