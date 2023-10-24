require("dotenv").config();
const logger = require("./logger");
let PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME;
if (process.env.NODE_ENV === "test") {
	logger.info("Test environment detected");
	PORT = process.env.TEST_PORT;
	DB_HOST = process.env.TEST_DB_HOST;
	DB_USER = process.env.TEST_DB_USER;
	DB_PASS = process.env.TEST_DB_PASS;
	DB_NAME = process.env.TEST_DB_NAME;
} else if (process.env.NODE_ENV === "development") {
	logger.info("Development environment detected");
	PORT = process.env.DEV_PORT;
	DB_HOST = process.env.DEV_DB_HOST;
	DB_USER = process.env.DEV_DB_USER;
	DB_PASS = process.env.DEV_DB_PASS;
	DB_NAME = process.env.DEV_DB_NAME;
} else if (process.env.NODE_ENV === "production") {
	logger.info("Production environment detected");
	PORT = process.env.PROD_PORT;
	DB_HOST = process.env.PROD_DB_HOST;
	DB_USER = process.env.PROD_DB_USER;
	DB_PASS = process.env.PROD_DB_PASS;
	DB_NAME = process.env.PROD_DB_NAME;
}

module.exports = { PORT,
	DB_HOST,
	DB_USER,
	DB_PASS,
	DB_NAME
};
