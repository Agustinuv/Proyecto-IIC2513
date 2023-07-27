const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);
const { generateAccessToken } = require('../../utils/users');

// Datos de la tienda

describe("test get seller info", () => {
    it("should return status code 200", async () => {
        const seller = {
            name: 'panino',
            password: '123456',
            mail: 'panino@uc.cl',
            location: "San joaquin"
        };
        const response_1 = await request.post('/seller/login').send(
            {
                mail: seller.mail,
                password: seller.password
            }
        );
        const testid = response_1.body.sellerid;
        const user_token = generateAccessToken(seller.name);
    
        const response = await request.get(`/seller/profile/${testid}`)
            .set('Authorization', `Bearer ${user_token}`);
        expect(response.status).toBe(200);
        expect(response.body.mail).toBe(seller.mail);
        expect(response.body.name).toBe(seller.name);
        expect(response.body.location).toBe(seller.location);
    });
});