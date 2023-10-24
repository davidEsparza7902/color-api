const { Sequelize } = require('sequelize');
const config = require('../utils/config'); // Asegúrate de configurar correctamente la base de datos en este archivo
const logger = require('../utils/logger'); // Utiliza tu propio módulo de registro

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
});

// Conectarse a la base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);

    // Si la base de datos no existe, crea una nueva base de datos con el nombre especificado en la configuración
    try {
      await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.DB_NAME};`);
      logger.info(`Database ${config.DB_NAME} created successfully.`);
    } catch (error) {
      logger.error('Unable to create the database:', error);
    }
  }
};

module.exports = {sequelize, connectDB};
