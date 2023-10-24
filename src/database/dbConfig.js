const db = require("./dbConnection");
const logger = require("../utils/logger");
const colorSeeder = require("../seeders/colorSeeder");
const dbConnect = async () => {
	try {
		await db.authenticate();
		logger.info("Database connection has been established successfully.");
	} catch (error) {
		logger.error("Unable to connect to the database:", error);
	}
};
const dbInit = async () => {
	try {
		await db.sync({ alter: true});
		logger.info("Database connection has been established successfully.");
	} catch (error) {
		logger.error("Unable to connect to the database:", error);
	}
};
const dbClose = async () => {
	await db.close();
};
const dbReset = async () => {
	await db.sync({ force: true });
};
const dbSeed = async (n) => {
	await colorSeeder(n);
};

module.exports = { dbInit, dbClose, dbReset, dbSeed, dbConnect };
