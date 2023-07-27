const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);
const { generateAccessToken } = require('../../utils/users');

// Datos del usuario

describe("test get user info", () => {
    it("should return status code 200", async () => {
        const user = {
            userName: 'johndoe',
            password: '123456',
            mail: 'test1@uc.cl'
        };
        const response_1 = await request.post('/user/login').send(
            {
                mail: user.mail,
                password: user.password
            }
        );
        const testid = response_1.body.userid;
        const user_token = generateAccessToken(user.userName);
    
        const response = await request.get(`/user/profile/${testid}`)
            .set('Authorization', `Bearer ${user_token}`);
        expect(response.status).toBe(200);
        expect(response.body.mail).toBe(user.mail);
        expect(response.body.username).toBe(user.userName);
    });
});