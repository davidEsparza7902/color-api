const faker = require("faker");
const Color = require("../models/color");
const db = require("../database/dbConnection");
const logger = require("../utils/logger");

const seedDatabase = async (n) => {
	try {
		await Color.destroy({
			where: {},
			truncate: true
		});
		logger.info("Seeding database...");
		await db.sync({alter: true});
		for (let i = 0; i < n; i++) {
			const hex = faker.internet.color().substring(1);
			const pantone = `${faker.random.number({min: 10, max: 99})}-${faker.random.number({min: 1000, max: 9999})}`;
			await Color.create({
				name: faker.commerce.color(),
				color: hex,
				pantone: pantone,
				year: faker.date.past().getFullYear()
			});
		}
		logger.info(`Database seeded with ${n} records`);
	} catch (err) {
		logger.error(err);
	} 
};
module.exports = seedDatabase;
