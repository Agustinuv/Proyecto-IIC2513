const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);
const { generateAccessToken } = require('../../utils/users');

// Datos de la tienda

describe("test update seller info", () => {
    it("should return status code 200", async () => {
        const seller = {
            name: 'panino',
            password: '123456',
            mail: 'panino@uc.cl',
            location: 'San joaquin'
        };
        const response_1 = await request.post('/seller/login').send(
            {
                mail: seller.mail,
                password: seller.password
            }
        );
        const testid = response_1.body.sellerid;
        const user_token = generateAccessToken(response_1.body.name);
        const user_update_info = 
            {
                name: 'updated panino',
                mail: 'panino@uc.cl',
                location: 'San Joaquin'
            }
    
        const response = await request.patch(`/seller/update/${testid}`)
            .set('Authorization', `Bearer ${user_token}`).send(user_update_info);
        expect(response.status).toBe(200);
        expect(response.body.mail).toBe(seller.mail);
        expect(response.body.name).toBe(user_update_info.name);
    });

    it("should return status code 200 and compare password", async () => {
        const seller = {
            name: 'panino',
            password: '123456',
            mail: 'panino@uc.cl'
        };
        const response_1 = await request.post('/seller/login').send(
            {
                mail: seller.mail,
                password: seller.password
            }
        );
        const testid = response_1.body.sellerid;
        const user_token = generateAccessToken(response_1.body.name);
        const user_update_info = 
            {
                name: 'panino',
                mail: 'panino@uc.cl',
                location: 'San joaquin',
                password: '123456',
                passwordConfirmation: '123456',
                oldPassword: '123456',
            }
    
        const response = await request.patch(`/seller/update/${testid}`)
            .set('Authorization', `Bearer ${user_token}`).send(user_update_info);
        expect(response.status).toBe(200);
        expect(response.body.mail).toBe(seller.mail);
        expect(response.body.name).toBe(user_update_info.name);
    });
});