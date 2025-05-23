import * as api from '../tests/api/api.ts';
import { expect, test } from './fixtures/auth-fixture.ts';
import { createRandomUser } from './api/types.ts';

const bookingData = createRandomUser();

let bookingId: number;

test.beforeEach(async ({ context }) => {
  const { response, data } = await api.createBooking({ context }, bookingData);
  bookingId = data.bookingid;
  expect(response.status()).toBe(200);
});

test.afterEach(async ({ context }) => {
  const { response } = await api.deleteBooking({ context }, bookingId);
  expect(response.status()).toBe(201);
});

test('Get bookings', async ({ context }) => {
  const { response, data } = await api.getBookingIds({ context });
  expect(response.status()).toBe(200);

  const bookingIds = data.map(b => b.bookingid);
  expect(bookingIds).toContain(bookingId);
});
