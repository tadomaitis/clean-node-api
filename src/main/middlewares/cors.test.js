const request = require('supertest')
const app = require('../config/app')

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (_, res) => {
      res.send('ok')
    })
    const res = await request(app).get('/testcors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
