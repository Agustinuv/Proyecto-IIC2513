const supertest = require('supertest');
const app = require('../../app');
const db = require('../../models');
const request = supertest(app);

describe("test delete user", () => {
    
    it("should return status code 200", async () => {
        const response = await request.post('/user/sign-in').send({
            fullName: "John Doe 6",
            userName: "johndoe6",
            mail: "test5@uc.cl",
            password: "123456",
            passwordConfirmation: "123456"
        });
        const testid = response.body.userid;
        const user_token = response.body.token;

        const response_2 = await request.delete(`/user/delete/${testid}`)
            .set('Authorization', `Bearer ${user_token}`);
        expect(response_2.status).toBe(200);
        expect(response_2.body.message).toBe("Usuario eliminado");
        expect(response_2.cookies).toBe(undefined);
    });
});