const faker = require('faker');
const Color = require('../models/color');
const db = require('../database/dbConnection');
const logger = require('../utils/logger');

let numberOfRecords = 10;
if (process.argv[2]) {
    if (isNaN(process.argv[2])) {
        logger.error('Argument must be a number');
        process.exit();
    }
    if (process.argv[2] < 1) {
        logger.error('Argument must be greater than 0');
        process.exit();
    }
    if (process.argv[2] >= 1000) {
        logger.error('Argument must be less than 1000');
        process.exit();
    }
    numberOfRecords = process.argv[2];
}

const seedDatabase = async () => {
    try {
        await Color.destroy({
            where: {},
            truncate: true
        });
        logger.info('Seeding database...');
        await db.sync({alter: true});
        for (let i = 0; i < numberOfRecords; i++) {
            const hex = faker.internet.color().substring(1);
            const pantone = `${faker.random.number({min: 10, max: 99})}-${faker.random.number({min: 1000, max: 9999})}`;
            await Color.create({
                name: faker.commerce.color(),
                color: hex,
                pantone: pantone,
                year: faker.date.past().getFullYear()
            });
        }
        logger.info(`Database seeded with ${numberOfRecords} records`);
    } catch (err) {
        logger.error(err);
    } finally {
        await db.close();
        process.exit();
    }
}
seedDatabase();
