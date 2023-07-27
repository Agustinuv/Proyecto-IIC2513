const supertest = require('supertest');
const app = require('../../app');
const db = require('../../models');
const request = supertest(app);
const {generateAccessToken} = require('../../utils/users');

beforeAll(async () => {
    db.sequelize.authenticate();
});

afterAll(async () => {
    const test_user = await db.User.findOne({ where: { mail: 'test2@uc.cl' } });
    await test_user.destroy();
    await db.sequelize.close();
});

describe("test post user sign in", () => {
    
    it("should return status code 201", async () => {
        const response = await request.post('/user/sign-in').send({
            fullName: "John Doe2",
            userName: "johndoe2",
            mail: "test2@uc.cl",
            password: "123456",
            passwordConfirmation: "123456"
        });
        expect(response.status).toBe(201);
        expect(response.body.mail).toBe("test2@uc.cl");
        const authHeader = response.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const expected_token = generateAccessToken(response.body.username);
        expect(token).toBe(expected_token);
    });

    it("should return status code 400", async () => {
        const response = await request.post('/user/sign-in').send({
            fullName: "John Doe",
            userName: "johndoe",
            mail: "test1@uc.cl",
            password: "123456",
            passwordConfirmation: "123456"
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Ya existe un usuario con ese mail");
    });

    it("should return status code 400", async () => {
        const response = await request.post('/user/sign-in').send({
            fullName: "John Doe",
            userName: "johndoe",
            mail: "test3@uc.cl",
            password: "123456",
            passwordConfirmation: "12345"
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Contraseñas no coinciden");
    });

    it("should return status code 400", async () => {
        const response = await request.post('/user/sign-in').send({
            fullName: "John Doe",
            userName: "johndoe",
            mail: "test3uc.cl",
            password: "123456",
            passwordConfirmation: "123456"
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Email inválido");
    });
});
