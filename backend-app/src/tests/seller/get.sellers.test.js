const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);
const { generateAccessToken } = require('../../utils/users');

// Datos de la tienda

describe("test get sellers info", () => {
    it("should return status code 200", async () => {

        const response = await request.get("/seller/sellers");

        console.log(response.body)
        expect(response.status).toBe(200);
    });
});