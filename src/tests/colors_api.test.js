const { db, dbInit} = require("../database/dbConfig");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);
const Color = require("../models/color");

// This is a test suite
dbInit();
describe("Colors API", () => {
	beforeAll(async () => {
		await dbInit();
	});
	afterAll( async () => {
		await db.close();
	});
	beforeEach(async () => {
		await Color.destroy({ where: {} });
		await Color.bulkCreate([
			{ name: "red", color: "FF0000", pantone: "19-1664", year: 2001 },
			{ name: "green", color: "00FF00", pantone: "19-1664", year: 2002 },
			{ name: "blue", color: "0000FF", pantone: "19-1664", year: 2003 }
		]);
	});
	describe("GET /api/colors", () => {
		test("should return all colors", async () => {
			const response = await api.get("/api/colors");
			expect(response.status).toBe(200);
			expect(response.body.length).toBe(3);
		});
	}, 10000);
	describe("GET /api/colors/:id", () => {
		test("should return a color with id 1", async () => {
			const response = await api.get("/api/colors/1");
			expect(response.status).toBe(200);
			expect(response.body.name).toBe("red");
		}, 10000);
		test("should return status 404 if color with id 4 is not found", async () => {
			const response = await api.get("/api/colors/4");
			expect(response.status).toBe(404);
		}, 10000);
	}, 10000);
	describe("POST /api/colors", () => {
		test("should return status 201 and create a new color", async () => {
			const response = await api.post("/api/colors").send({ name: "green" });
			expect(response.status).toBe(201);
			expect(response.body.name).toBe("green");
			const colors = await Color.findAll();
			expect(colors.length).toBe(4);
		}, 10000);
		test("should return status 400 if name is missing", async () => {
			const response = await api.post("/api/colors").send({});
			expect(response.status).toBe(400);
			expect(response.body.error).toBe("name is missing");
			const colors = await Color.findAll();
			expect(colors.length).toBe(4);
		}, 10000);
	}, 10000);
	describe("PUT /api/colors/:id", () => {
		test("should return status 200 and update the color with id 1", async () => {
			const response = await api.put("/api/colors/1").send({ name: "blue" });
			expect(response.status).toBe(200);
			expect(response.body.name).toBe("blue");
			const colors = await Color.findAll();
			expect(colors.length).toBe(4);
		}, 10000);
		test("should return status 404 if color with id 4 is not found", async () => {
			const response = await api.put("/api/colors/4").send({ name: "blue" });
			expect(response.status).toBe(404);
			const colors = await Color.findAll();
			expect(colors.length).toBe(4);
		}, 10000);
	}, 10000);
	describe("DELETE /api/colors/:id", () => {
		test("should return status 204 and delete the color with id 1", async () => {
			const response = await api.delete("/api/colors/1");
			expect(response.status).toBe(204);
			const colors = await Color.findAll();
			expect(colors.length).toBe(3);
		}, 10000);
		test("should return status 404 if color with id 4 is not found", async () => {
			const response = await api.delete("/api/colors/4");
			expect(response.status).toBe(404);
			const colors = await Color.findAll();
			expect(colors.length).toBe(3);
		}, 10000);
	}, 10000);
	
}, 10000);