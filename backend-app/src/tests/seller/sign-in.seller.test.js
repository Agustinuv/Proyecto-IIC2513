const supertest = require('supertest');
const app = require('../../app');
const db = require('../../models');
const request = supertest(app);
const {generateAccessToken} = require('../../utils/users');

beforeAll(async () => {
    db.sequelize.authenticate();
});

afterAll(async () => {
    const test_user = await db.Seller.findOne({ where: { mail: 'test4@uc.cl' } });
    await test_user.destroy();
    await db.sequelize.close();
});

describe("test post seller sign in", () => {
    
    it("should return status code 201", async () => {
        const response = await request.post('/seller/sign-in').send({
            name: "paninis",
            mail: "test4@uc.cl",
            location: "San joquin",
            password: "123456",
            passwordConfirmation: "123456"
        });
        expect(response.status).toBe(201);
        expect(response.body.mail).toBe("test4@uc.cl");
        const authHeader = response.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const expected_token = generateAccessToken(response.body.name);
        expect(token).toBe(expected_token);
    });

    it("should return status code 400", async () => {
        const response = await request.post('/seller/sign-in').send({
            name: "paninis",
            mail: "test4@uc.cl",
            location: "San joquin",
            password: "123456",
            passwordConfirmation: "123456"
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Ya existe una tienda con ese mail");
    });

    it("should return status code 400", async () => {
        const response = await request.post('/seller/sign-in').send({
            name: "paninis",
            mail: "test5@uc.cl",
            location: "San joquin",
            password: "123456",
            passwordConfirmation: "1234567"
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Contraseñas no coinciden");
    });

    it("should return status code 400", async () => {
        const response = await request.post('/seller/sign-in').send({
            name: "paninis",
            mail: "test5uc.cl",
            location: "San joquin",
            password: "123456",
            passwordConfirmation: "123456"
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Email inválido");
    });

});
