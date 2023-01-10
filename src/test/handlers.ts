import { faker } from '@faker-js/faker';
import { rest } from 'msw';
import { wait } from './wait';

export const restHandlers = [
  rest.post('https://api.server.com/auth/login', async (req, res, ctx) => {
    const body = await req.json();

    await wait(10);
    if (!body.username || !body.password) {
      return res(ctx.json({ error: 'Invalid data' }), ctx.status(400));
    }

    return res(
      ctx.json({
        username: body.username,
        email: faker.internet.email(),
        id: faker.datatype.number(),
      })
    );
  }),
];
