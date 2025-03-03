import type {} from 'hono';

declare module 'hono' {
  interface Env {
    Bindings: {
      DB: D1Database;
    };
  }
}
