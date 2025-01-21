const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Workshop Management APIs', () => {
  it('should create a workshop', async () => {
    const response = await request(app)
      .post('/api/workshops')
      .send({ title: 'Node.js Workshop', description: 'Learn Node.js basics' });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Node.js Workshop');
  });

  it('should enroll a learner', async () => {
    const response = await request(app).post('/api/workshops/1/enroll');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Enrollment successful.');
  });
});
