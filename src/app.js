import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

/**
 * TODO: Create Express app
 *
 * 1. Create app with express()
 * 2. Add express.json() middleware
 * 3. Add GET /health route → { ok: true }
 * 4. Mount auth routes at /api/auth
 * 5. Mount user routes at /api/users
 * 6. Add notFound middleware
 * 7. Add errorHandler middleware (must be last!)
 * 8. Return app
 */
export function createApp() {
// 1. Create app
  const app = express();

  // 2. Middleware
  app.use(express.json());

  // 3. Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ ok: true });
  });

  // 4. Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);

  // 5. 404 handler
  app.use(notFound);

  // 6. Error handler (MUST be last)
  app.use(errorHandler);

  // 7. Return app
  return app;}
