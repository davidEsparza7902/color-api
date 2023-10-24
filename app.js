const cors = require("cors");
const express = require("express");
const dbConfig = require("./src/database/dbConfig");
const app = express();
const colorRouter = require("./src/controllers/colors");
const middleware = require("./src/utils/middleware");

dbConfig.dbInit();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/colors", colorRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler); 

module.exports = app;
