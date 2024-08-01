import request from 'supertest';
import app from '../server.mjs';

// TODO: replace current access token in .env 
const accessToken = process.env.TEST_ACCESS_TOKEN;
    
describe('User API', () => {
    let id = null;
    test('GET /user should return all users', async () => {
        const response = await request(app)
            .get('/user')
            .set('Authorization', `Bearer ${accessToken}`);
        
        
        expect(response.status).toBe(200);
    }, 10000); 

    test('POST /user should create a new user', async () => {
        const newUser = {
            username: 'testuser@gmail.com',
            password: 'testpassword',
            role: 'STUDENT'
        };

        const response = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(newUser);

        id = response.body._id;
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('role', newUser.role);
    });

    test('PUT /user should update a new user', async () => {
        const updateUser = {
            username: 'testuser1@gmail.com',
            password: 'testpassword',
            role: 'STUDENT'
        };

        const response = await request(app)
            .put(`/user/${id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updateUser);

        id = response.body._id;
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', updateUser.username);
        expect(response.body).toHaveProperty('role', updateUser.role);
    });

    test('DELETE /user should delete a new user', async () => {

        const response = await request(app)
            .delete(`/user/${id}`)
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200);
    });
});

describe('User Role API', () => {
    let id = null;
    test('GET /user role should return all users', async () => {
        const response = await request(app)
            .get('/role')
            .set('Authorization', `Bearer ${accessToken}`);
        
        
        expect(response.status).toBe(200);
    }, 10000); 

    test('POST /user role should create a new user', async () => {
        const newUserRole = {
            role: "7",
            access: ["ADMIN", "ADMIN"]
        };

        const response = await request(app)
            .post('/role')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(newUserRole);

        id = response.body._id;
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('role', newUserRole.role);
        expect(response.body).toHaveProperty('access', newUserRole.access);
    });

    test('PUT /user should update a new user', async () => {
        const updateUserRole = {
            role: "7",
            access: ["ADMIN", "STUDENT"]
        };

        const response = await request(app)
            .put(`/role/${id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updateUserRole);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('role', updateUserRole.role);
        expect(response.body).toHaveProperty('access', updateUserRole.access);
    });

    test('DELETE /user should delete a new user', async () => {

        const response = await request(app)
            .delete(`/role/${id}`)
            .set('Authorization', `Bearer ${accessToken}`)

        expect(response.status).toBe(200);
    });
});
