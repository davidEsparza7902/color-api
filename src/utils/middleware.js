const { ValidationError } = require("sequelize");
const Color = require("../models/color");
const logger = require("./logger");

const requestLogger = (request, response, next) => {
	logger.info("Method:", request.method);
	logger.info("Path:", request.path);
	logger.info("Body:", request.body);
	logger.info("---");
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);
	if (error.name === "SequelizeValidationError" ) {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "SequelizeUniqueConstraintError") {
		return response.status(400).json({ error: error.message });
	}
	next(error);
};


const validateColor = async (request, response, next) => {
	try {
		const body = request.body;

		if (!body.name) {
			throw new ValidationError("name is missing");
		}
		//year
		if (body.year) {
			const year = Number(body.year);
			if (isNaN(year)) {
				throw new ValidationError("year must be a number");
			}
		}
		//pantone
		if (body.pantone) {
			if (body.pantone.length !== 7) {
				throw new ValidationError("pantone must be 7 characters long");
			}
			// must have this pattern "12-6901"
			const pantoneRegex = /^[0-9]{2}-[0-9]{4}$/;
			if (!pantoneRegex.test(body.pantone)) {
				throw new ValidationError("pantone must have this pattern \"11-1111\"");
			}
		}

		if (!body.color) {
			throw new ValidationError("color is missing");
		}

		if (body.color.length !== 6 && body.color.length !== 3) {
			throw new ValidationError("color must be 6 or 3 characters long");
		}

		const hexRegex = /^[0-9a-fA-F]+$/;

		if (!hexRegex.test(body.color)) {
			throw new ValidationError("color must be hexadecimal");
		}

		if (body.color.length === 3) {
			body.color = body.color.split("").map(c => c + c).join("");
		}

		body.color = body.color.toUpperCase();
		next();
	} catch (error) {
		next(error);
	}
};
const validateId = async (request, response, next) => {
	try {
		const id = request.params.id;
		const num = Number(id);
		if (isNaN(num)) {
			throw new ValidationError("id must be a number");
		} 
		const color = await Color.findByPk(id);
		if (!color) {
			response.status(404).end();
		}
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	validateColor,
	validateId
};