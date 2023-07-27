const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);
const { generateAccessToken } = require('../../utils/users');

// Datos del usuario

describe("test update user info", () => {
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
        const user_update_info = 
            {
                fullName: 'John Doe 12',
                userName: 'johndoe12',
                mail: 'test1@uc.cl'
            }
    
        const response = await request.patch(`/user/update/${testid}`)
            .set('Authorization', `Bearer ${user_token}`).send(user_update_info);
        expect(response.status).toBe(200);
        expect(response.body.mail).toBe(user.mail);
        expect(response.body.userName).toBe(user_update_info.userName);
        expect(response.body.fullName).toBe(user_update_info.fullName);
    });

    it("should return status code 200 and compare password", async () => {
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
        const user_update_info = 
            {
                fullName: 'John Doe 12',
                userName: 'johndoe12',
                mail: 'test1@uc.cl',
                password: '123456',
                passwordConfirmation: '123456',
                oldPassword: '123456',
            }
    
        const response = await request.patch(`/user/update/${testid}`)
            .set('Authorization', `Bearer ${user_token}`).send(user_update_info);
        expect(response.status).toBe(200);
        expect(response.body.mail).toBe(user.mail);
        expect(response.body.userName).toBe(user_update_info.userName);
        expect(response.body.fullName).toBe(user_update_info.fullName);
    });
});