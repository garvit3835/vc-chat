const request = require('supertest');
const app = require('./app'); // Import your chat server app

describe('Chat Server', () => {
  test('should return "Hello, world!" when making GET request to /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });

  // Add more tests as needed
});
