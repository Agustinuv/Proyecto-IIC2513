const supertest = require('supertest');
const app = require('../../app');
const db = require('../../models');
const request = supertest(app);

describe("test delete seller", () => {
    
    it("should return status code 200", async () => {
        const response = await request.post('/seller/sign-in').send({
            name: "johndoe6",
            mail: "test6@uc.cl",
            location: "Juan soaquin",
            password: "123456",
            passwordConfirmation: "123456"
        });
        const testid = response.body.sellerid;
        const authHeader = response.headers['authorization'];
        const user_token = authHeader && authHeader.split(' ')[1];

        const response_2 = await request.delete(`/seller/delete/${testid}`)
            .set('Authorization', `Bearer ${user_token}`);
        expect(response_2.status).toBe(200);
        expect(response_2.body.message).toBe("Usuario eliminado");
        expect(response_2.cookies).toBe(undefined);
    });
});