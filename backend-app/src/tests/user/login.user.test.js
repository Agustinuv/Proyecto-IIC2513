const supertest = require('supertest');
const app = require('../../app');
const db = require('../../models');
const {generateAccessToken} = require('../../utils/users');
const request = supertest(app);


describe("test post user login", () => {

    it("should return status code 201", async () => {
        const testMail = "test1@uc.cl";
        const testPassword = "123456";
        const response = await request.post('/user/login').send({
            mail: testMail,
            password: testPassword
        });
        expect(response.status).toBe(200);

        const authHeader = response.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const expected_token = generateAccessToken(response.body.username);
        expect(token).toBe(expected_token);
        expect(response.body.mail).toBe(testMail);
    });
});