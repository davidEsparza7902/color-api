const colorRouter = require('express').Router();
const js2xmlparser = require('js2xmlparser');
const Color = require('../models/color');
const logger = require('../utils/logger');
const middleware = require('../utils/middleware');
const pagination = require('../utils/pagination');

colorRouter.get('/', async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Color.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']]
    });
    const totalPages = Math.ceil(count / limit);
    const responseColors = rows.map(color => {
        return formatColorResponse(color);
    });
    const responseData = pagination.generatePagination(request, responseColors, count, limit);

    if (request.accepts('json'))
        response.status(200).json(responseData);
    else if (request.accepts('xml')) {
        response.set('Content-Type', 'application/xml');
        response.status(200).send(js2xmlparser.parse('colors', responseData));
    }
    
});


colorRouter.get('/:id', middleware.validateId, async (request, response, next) => {
    try {
        const color = await Color.findByPk(request.params.id);
        if (color) {
            const c = formatColorResponse(color);
            response.status(200).json(c);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
    
});
colorRouter.post('/', middleware.validateColor, async (request, response, next) => {
    try {
        const body = request.body;
        const color = await Color.create({
            name: body.name,
            color: body.color,
            pantone: body.pantone,
            year: body.year
        });
        const newColor = formatColorResponse(color);
        response.status(201).json(newColor);
    } catch (error) {
        next(error);
    }
});

colorRouter.put('/:id',middleware.validateId, middleware.validateColor, async (request, response, next) => {
    try {
        const body = request.body;
        const color = await Color.findByPk(request.params.id);
        if (color) {
            color.name = body.name;
            color.color = body.color;
            color.pantone = body.pantone;
            color.year = body.year;
            await color.save();
            const updatedColor = formatColorResponse(color);
            response.json(updatedColor);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

colorRouter.delete('/:id', middleware.validateId, async (request, response, next) => {
    try {
        const color = await Color.findByPk(request.params.id);
        if (color) {
            await color.destroy();
            response.status(204).end();
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

const formatColorResponse = (color) => {
    return {
        id: color.id,
        name: color.name,
        color: `#${color.color}`,
        pantone: color.pantone,
        year: color.year
    };
};

module.exports = colorRouter;