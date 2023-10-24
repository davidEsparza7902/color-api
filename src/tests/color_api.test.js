const supertest = require('supertest');
const Color = require('../models/color');
const { sequelize, connectDB } = require('../database/config');
const app = require('../../app');
const api = supertest(app);

const initialColors = [
    {
        name: 'red',
        color: 'FF0000',
        pantone: '18-1662',
        year: 2001
    },
    {
        name: 'blue',
        color: '0000FF',
        pantone: '19-1662',
        year: 2002
    },
    {
        name: 'green',
        color: '00FF00',
        pantone: '20-1662',
        year: 2003
    }
];

describe ('GET /api/colors', () => {
    beforeAll(async () => {
        // conectarse a la bd
        await connectDB();
    });
    beforeEach (async () => {
        await Color.destroy({
            where: {},
            truncate: true
        });
        await Color.bulkCreate(initialColors);
    });
    test ('The colors are returned as json', async () => {
        await api
            .get('/api/colors')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    },30000);
    test ('There are three colors', async () => {
        const response = await api.get('/api/colors');
        expect(response.body.data).toHaveLength(initialColors.length);
    },30000);
    test ('The first color is red', async () => {
        const response = await api.get('/api/colors');
        expect(response.body.data[0].name).toBe('red');
    },30000);
});
describe ('GET /api/colors/:id', () => {
    beforeEach (async () => {
        await Color.destroy({
            where: {},
            truncate: true
        });
        await Color.bulkCreate(initialColors);
    });
    test ('A valid color id returns a color', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        const response = await api.get(`/api/colors/${color.id}`);
        expect(response.body.name).toBe(color.name);
    },30000);
    test ('An invalid color id returns a 404', async () => {
        const response = await api.get('/api/colors/999999');
        expect(response.status).toBe(404);
    },30000);
});
describe ('POST /api/colors', () => {
    beforeEach (async () => {
        await Color.destroy({
            where: {},
            truncate: true
        });
        await Color.bulkCreate(initialColors);
    });
    test ('A valid color can be added', async () => {
        const newColor = {
            name: 'black',
            color: '000000',
            pantone: '21-1662',
            year: 2004
        };
        await api
            .post('/api/colors')
            .send(newColor)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const colors = await Color.findAll();
        expect(colors).toHaveLength(initialColors.length + 1);
        const names = colors.map(c => c.name);
        expect(names).toContain(newColor.name);
    },30000);
    test ('A color without a name is not added', async () => {
        await api
            .post('/api/colors')
            .send({
                color: '000000',
                pantone: '21-1662',
                year: 2020
            })
            .expect(400);
        const colors = await Color.findAll();
        expect(colors).toHaveLength(initialColors.length);
    },30000);
    test ('A color without a color is not added', async () => {
        const newColor = {
            name: 'black',
            pantone: '21-1662',
            year: 2004
        };
        await api
            .post('/api/colors')
            .send(newColor)
            .expect(400);
        const colors = await Color.findAll();
        expect(colors).toHaveLength(initialColors.length);
    },30000);
    test ('A color with a color that is not hexadecimal is not added', async () => {
        const newColor = {
            name: 'black',
            color: '00000G',
            pantone: '21-1662',
            year: 2004
        };
        await api
            .post('/api/colors')
            .send(newColor)
            .expect(400);
        const colors = await Color.findAll();
        expect(colors).toHaveLength(initialColors.length);
    },30000);
    test ('A color with a color that is not 3 or 6 characters long is not added', async () => {
        const newColor = {
            name: 'black',
            color: '0000000',
            pantone: '21-1662',
            year: 2004
        };
        await api
            .post('/api/colors')
            .send(newColor)
            .expect(400);
        const colors = await Color.findAll();
        expect(colors).toHaveLength(initialColors.length);
    },30000);
    test ('A color with a pantone that is not 7 characters long is not added', async () => {
        const newColor = {
            name: 'black',
            color: '000000',
            pantone: '211662',
            year: 2004
        };
        await api
            .post('/api/colors')
            .send(newColor)
            .expect(400);
        const colors = await Color.findAll();
        expect(colors).toHaveLength(initialColors.length);
    },30000);
    test ('A color with a pantone that does not match the pattern is not added', async () => {
        const newColor = {
            name: 'black',
            color: '000000',
            pantone: '211-662',
            year: 2004
        };
        await api
            .post('/api/colors')
            .send(newColor)
            .expect(400);
        const colors = await Color.findAll();
        expect(colors).toHaveLength(initialColors.length);
    },30000);
    test ('A color with a year that is not a number is not added', async () => {
        const newColor = {
            name: 'black',
            color: '000000',
            pantone: '21-1662',
            year: '2004'
        };
        await api
            .post('/api/colors')
            .send(newColor)
            .expect(400);
        const colors = await Color.findAll();
        expect(colors).toHaveLength(initialColors.length);
    },30000);

});
describe ('PUT /api/colors/:id', () => {
    beforeEach (async () => {
        await Color.destroy({
            where: {},
            truncate: true
        });
        await Color.bulkCreate(initialColors);
    });
    test ('A valid color can be updated', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        const newColor = {
            name: 'black',
            color: '000000',
            pantone: '21-1662',
            year: 2004
        };
        await api
            .put(`/api/colors/${color.id}`)
            .send(newColor)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const updatedColor = await Color.findByPk(color.id);
        expect(updatedColor.name).toBe(newColor.name);
    },30000);
    test ('A color without a name is not updated', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        const newColor = {
            color: '000000',
            pantone: '21-1662',
            year: 2004
        };
        await api
            .put(`/api/colors/${color.id}`)
            .send(newColor)
            .expect(400);
        const updatedColor = await Color.findByPk(color.id);
        expect(updatedColor.name).toBe(color.name);
    },30000);
    test ('A color without a color is not updated', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        const newColor = {
            name: 'black',
            pantone: '21-1662',
            year: 2004
        };
        await api
            .put(`/api/colors/${color.id}`)
            .send(newColor)
            .expect(400);
        const updatedColor = await Color.findByPk(color.id);
        expect(updatedColor.color).toBe(color.color);
    },30000);
    test ('A color with a color that is not hexadecimal is not updated', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        const newColor = {
            name: 'black',
            color: '00000G',
            pantone: '21-1662',
            year: 2004
        };
        await api
            .put(`/api/colors/${color.id}`)
            .send(newColor)
            .expect(400);
        const updatedColor = await Color.findByPk(color.id);
        expect(updatedColor.color).toBe(color.color);
    },30000);
    test ('A color with a color that is not 3 or 6 characters long is not updated', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        const newColor = {
            name: 'black',
            color: '0000000',
            pantone: '21-1662',
            year: 2004
        };
        await api
            .put(`/api/colors/${color.id}`)
            .send(newColor)
            .expect(400);
        const updatedColor = await Color.findByPk(color.id);
        expect(updatedColor.color).toBe(color.color);
    },30000);
    test ('A color with a pantone that is not 7 characters long is not updated', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        const newColor = {
            name: 'black',
            color: '000000',
            pantone: '211662',
            year: 2004
        };
        await api
            .put(`/api/colors/${color.id}`)
            .send(newColor)
            .expect(400);
        const updatedColor = await Color.findByPk(color.id);
        expect(updatedColor.pantone).toBe(color.pantone);
    },30000);
    test ('A color with a pantone that does not match the pattern is not updated', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        const newColor = {
            name: 'black',
            color: '000000',
            pantone: '211-662',
            year: 2004
        };
        await api
            .put(`/api/colors/${color.id}`)
            .send(newColor)
            .expect(400);
        const updatedColor = await Color.findByPk(color.id);
        expect(updatedColor.pantone).toBe(color.pantone);
    },30000);
    test ('A color with a year that is not a number is not updated', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        const newColor = {
            name: 'black',
            color: '000000',
            pantone: '21-1662',
            year: '2004'
        };
        await api
            .put(`/api/colors/${color.id}`)
            .send(newColor)
            .expect(400);
        const updatedColor = await Color.findByPk(color.id);
        expect(updatedColor.year).toBe(color.year);
    },30000);
});
describe ('DELETE /api/colors/:id', () => {
    beforeEach (async () => {
        await Color.destroy({
            where: {},
            truncate: true
        });
        await Color.bulkCreate(initialColors);
    });
    test ('A valid color can be deleted', async () => {
        const colors = await Color.findAll();
        const color = colors[0];
        await api
            .delete(`/api/colors/${color.id}`)
            .expect(204);
        const deletedColor = await Color.findByPk(color.id);
        expect(deletedColor).toBe(null);
    },30000);
    test ('An invalid color id returns a 404', async () => {
        await api
            .delete('/api/colors/999999')
            .expect(404);
    },30000);
});
