const request = require('supertest');
const app = require('../app.js');
const sequelize = require('../db/sequelize');
const Reservation = require('../models/Reservation.js');

describe('Reservations route', () => {
  // Clean up any existing reservations before running the tests
  beforeAll(async () => {
    await Reservation.destroy({
      where: { customer_email: 'test@example.com' },
    });
  });

  // Clean up any created reservations and close the database connection after running the tests
  afterAll(async () => {
    await Reservation.destroy({
      where: { customer_email: 'test@example.com' },
    });
    await sequelize.close();
  });

  // Test for GET requests to /reservations
  it('should respond with a status code of 200 for GET requests', async () => {
    const response = await request(app).get('/reservations');
    expect(response.statusCode).toBe(200);
  });

  // Test that the response body for GET requests to /reservations is an array
  it('should return an array of reservations for GET requests', async () => {
    const response = await request(app).get('/reservations');
    expect(Array.isArray(response.body)).toBe(true);
  });

  let testReservation;

  // Test for creating a new reservation with POST requests to /reservations
  it('should create a new reservation for POST requests', async () => {
    const reservationData = {
      customer_name: 'Test User',
      customer_email: 'test@example.com',
      customer_count: 2,
      reservation_datetime: '2024-05-01 18:00:00',
    };

    const response = await request(app)
      .post('/reservations')
      .send(reservationData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('reservation_number');

    // Store created reservation for future tests
    testReservation = JSON.parse(JSON.stringify(response.body));
  });

  // Test for updating an existing reservation with PUT requests to /reservations/:id
  it('should update an existing reservation for PUT requests', async () => {
    const reservationId = testReservation.reservation_number;

    const updatedReservationData = {
      customer_name: 'Test User',
      customer_email: 'test@example.com',
      customer_count: 2,
      reservation_datetime: '2024-05-02 18:00:00',
    };

    const response = await request(app)
      .put(`/reservations/${reservationId}`)
      .send(updatedReservationData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      'reservation_number',
      reservationId
    );
    expect(response.body).toHaveProperty(
      'reservation_datetime',
      new Date(
        updatedReservationData.reservation_datetime
      ).toISOString()
    );
  });

  // Test for getting a specific reservation with GET requests to /reservations/:id
  it('should get a specific reservation for GET requests with a valid reservation ID', async () => {
    const reservationId = testReservation.reservation_number;

    const response = await request(app).get(
      `/reservations/${reservationId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      'reservation_number',
      reservationId
    );
  });

  // Test for getting a reservation with an invalid ID
  it('should respond with a status code of 404 for GET requests with an invalid reservation ID', async () => {
    const reservationId = 999;

    const response = await request(app).get(
      `/reservations/${reservationId}`
    );
    expect(response.statusCode).toBe(404);
  });

  // Test for POST requests with missing reservation data
  it('should respond with a status code of 400 for POST requests with missing reservation data', async () => {
    const reservationData = {
      customer_name: 'Failing Test',
    };

    const response = await request(app)
      .post('/reservations')
      .send(reservationData);
    expect(response.statusCode).toBe(400);
  });

  // Test for PUT requests with an invalid reservation ID
  it('should respond with a status code of 404 for PUT requests with an invalid reservation ID', async () => {
    const reservationId = 999;
    const updatedReservationData = {
      customer_name: 'Test User',
      customer_email: 'test@example.com',
      customer_count: 3,
      reservation_datetime: '2024-05-02 18:00:00',
    };

    const response = await request(app)
      .put(`/reservations/${reservationId}`)
      .send(updatedReservationData);
    expect(response.statusCode).toBe(404);
  });

  // Test for PUT requests with missing updated reservation data
  it('should respond with a status code of 400 for PUT requests with missing updated reservation data', async () => {
    const reservationId = testReservation.reservation_number;
    const updatedReservationData = {
      customer_name: 'Test User',
      customer_email: 'test@example.com',
    };

    const response = await request(app)
      .put(`/reservations/${reservationId}`)
      .send(updatedReservationData);
    expect(response.statusCode).toBe(400);
  });

  // Test for DELETE requests with an invalid reservation ID
  it('should respond with a status code of 404 for DELETE requests with an invalid reservation ID', async () => {
    const reservationId = 999;

    const response = await request(app).delete(
      `/reservations/${reservationId}`
    );
    expect(response.statusCode).toBe(404);
  });

  // Test for deleting an existing reservation with DELETE requests
  it('should delete an existing reservation for DELETE requests', async () => {
    const reservationId = testReservation.reservation_number;

    const response = await request(app).delete(
      `/reservations/${reservationId}`
    );
    expect(response.statusCode).toBe(204);
  });
});
