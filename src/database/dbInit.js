const db = require('./dbConnection');
const logger = require('../utils/logger');
const config = require('../utils/config');


// Create database and table if they don't exist
const Color = require('../models/color');

async function dbInit() {
    try{
        await db.sync({alter: true});
        logger.info('Database initialized');
    } catch (err) {
        logger.error(err);
    } finally {
        await db.close();
        process.exit();
    }
}
dbInit();
