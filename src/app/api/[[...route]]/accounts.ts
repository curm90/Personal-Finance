import { Hono } from 'hono';

const app = new Hono().get('/', (c) => c.json({ accounts: [] }));

export default app;
