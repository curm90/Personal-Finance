import { z } from 'zod';
import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { and, eq, inArray } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

import { db } from '@/db/drizzle';
import { accounts, insertAccountsSchema } from '@/db/schema';

const app = new Hono()
  .get('/', clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const data = await db
      .select({ id: accounts.id, name: accounts.name })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));

    return c.json({ data });
  })
  .get('/:id', clerkMiddleware(), zValidator('param', z.object({ id: z.string().optional() })), async (c) => {
    const auth = getAuth(c);
    const { id } = c.req.valid('param');

    if (!id) {
      return c.json({ error: 'Account not found' }, 400);
    }

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const [data] = await db
      .select({ id: accounts.id, name: accounts.name })
      .from(accounts)
      .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)));

    if (!data) {
      return c.json({ error: 'Account not found' }, 404);
    }

    return c.json({ data });
  })
  .post('/', clerkMiddleware(), zValidator('json', insertAccountsSchema.pick({ name: true })), async (c) => {
    const auth = getAuth(c);
    const { name } = c.req.valid('json');

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const [data] = await db
      .insert(accounts)
      .values({ id: createId(), name, userId: auth.userId })
      .returning();

    return c.json({ data });
  })
  .post(
    '/bulk-delete',
    clerkMiddleware(),
    zValidator('json', z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const auth = getAuth(c);
      const { ids } = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .delete(accounts)
        .where(and(eq(accounts.userId, auth.userId), inArray(accounts.id, ids)))
        .returning({
          id: accounts.id,
        });

      return c.json({ data });
    }
  );

export default app;
