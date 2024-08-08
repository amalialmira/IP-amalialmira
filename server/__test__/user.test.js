const app = require('../app')
const { test, expect, describe, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const { User } = require('../models')

beforeAll(async () => {
    await User.create({
        username: "john_doe",
        email: "john.doe@example.com",
        password: "1Abcd"
    })
})

afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});

describe('POST /register', () => {
    test('POST /register success should return id, username, and email', async () => {
        let response = await request(app).post('/register').send({
            username: "hoshi",
            email: "hoshi@example.com",
            password: "horanghae"
        })
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("username", "hoshi")
        expect(response.body).toHaveProperty("email", "hoshi@example.com") 
    })
    test('POST /register failed should return error message if username is null', async () => {
        let response = await request(app).post('/register').send({
            username: "",
            email: "hoshi@example.com",
            password: "horanghae"
        })
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "username cannot be empty")
    })
    test('POST /register failed should return error message if email is null', async () => {
        let response = await request(app).post('/register').send({
            username: "hoshi",
            email: "",
            password: "horanghae"
        })
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "email cannot be empty")
    })
    test('POST /register failed should return error message if password is null', async () => {
        let response = await request(app).post('/register').send({
            username: "hoshi",
            email: "hoshi@example.com",
            password: ""
        })
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "password cannot be empty")
    })
})

describe ('POST /login', () => {
    test('POST /login succeed should be return access token', async () => {
        let response = await request(app).post('/login').send({
            email: "john.doe@example.com",
            password: "1Abcd"
        })
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('access_token', expect.any(String))
    })
    test("POST /login Failed should be return error message if email is null", async () => {
        let response = await request(app).post('/login').send({
            email: "",
            password: "1Abcd"
        })
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'email/password is required')
    });
    test("POST /login Failed should be return error message if password is null", async () => {
        let response = await request(app).post('/login').send({
            email: "john.doe@example.com",
            password: ""
        })
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'email/password is required')
    })
    test("POST /login Failed should be return error message if email is not registered", async () => {
        let response = await request(app).post('/login').send({
            email: "abcde@1234.com",
            password: "123321"
        })
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'invalid email/password')
    })
    test("POST /login Failed should be return error message if password doesn't match", async () => {
        let response = await request(app).post('/login').send({
            email: "john.doe@example.com",
            password: "wrongpass"
        })
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'invalid email/password')
    })
})

describe ('POST /auth/google', () => {
    test('POST /auth/google success should return access token', async () => {
        let response = await request(app).post('/auth/google').send({
            googleToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyNmQ5MTdiMWZlOGRlMTMzODJhYTdjYzlhMWQ2ZTkzMjYyZjMzZTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDEwMTgyOTY5MTYzMjM2NDA4MjgiLCJlbWFpbCI6ImFtYWxpYWxtci53b3JrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTEM1SExOMWRlS3c3QjVWQXhWMXNlZyIsIm5hbWUiOiJBbWFsaWEgQWxtaXJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0l2cWdKOW9FUGNoTEs0ZEkxY1hWXzhpUHc3VURtS3hYUjhieHdLaGNSOXRnMi1nUT1zOTYtYyIsImdpdmVuX25hbWUiOiJBbWFsaWEiLCJmYW1pbHlfbmFtZSI6IkFsbWlyYSIsImlhdCI6MTcyMzAyNDg5MCwiZXhwIjoxNzIzMDI4NDkwfQ.jp0j0u0QBgL5PAUFQ9HzskogKIAD2bRKywoW235Zm7IfEWAj7wviMVM2P3Kxx5O1Xkw14b3Oon184gIzo5vM5t2aCreQML-cBU1mdVW8kjF1SdbUXuXBodWFfI-yHbhdggISsuea-F3FP4MOk5n3Us5tX4twoTUujKBGMCKrcASzPlHrnNJYWtFyGpEbUVEDAZnTIiY-m73xaWQ4G4YT8XcM0QAQZ2uT9v38detIH8ixKUQicbxxdPN-6Q0HuVbAOmaqWdMaF4jgOzK2IjFXsLjfZDGrfI-REww8w8qiuLldGpHx69yFXltLGtd_uGeEplV_hqoqiGHeK9Ykm55p5Q"
        })
        expect(response.status).toBe(200 || 201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('access_token', expect.any(String))
    })
})