import request from 'supertest';
import app from './api';
export const test=() => {
describe('GET /items', () => {
  it('should return all items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: 'item1', description: 'description1', price: 10 }]);
  });
});

describe('GET /items/:id', () => {
  it('should return an item by id', async () => {
    const response = await request(app).get('/items/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'item1', description: 'description1', price: 10 });
  });
  it('should return a 500 error if item does not exist', async () => {
    const response = await request(app).get('/items/100');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});

describe('POST /items', () => {
  it('should create a new item', async () => {
    const newItem = { name: 'item2', description: 'description2', price: 20 };
    const response = await request(app).post('/items').send(newItem);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});

describe('PUT /items/:id', () => {
  it('should update an existing item', async () => {
    const updatedItem = { name: 'updatedItem', description: 'updatedDescription', price: 30 };
    const response = await request(app).put('/items/1').send(updatedItem);
    expect(response.status).toBe(204);
  });
  it('should return a 500 error if item does not exist', async () => {
    const updatedItem = { name: 'updatedItem', description: 'updatedDescription', price: 30 };
    const response = await request(app).put('/items/100').send(updatedItem);
    expect(response.status).toBe(500);

    expect(response.body).toEqual({ error: 'Item not found' });
  });
});

describe('DELETE /items/:id', () => {
  it('should delete an existing item', async () => {
    const response = await request(app).delete('/items/1');
    expect(response.status).toBe(204);
  });
  it('should return a 500 error if item does not exist', async () => {
    const response = await request(app).delete('/items/100');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});
};