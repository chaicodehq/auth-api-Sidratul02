import { Router } from 'express';
import { register, login, me } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

/**
 * TODO: Define auth routes
 *
 * POST   /register  → register (no auth required)
 * POST   /login     → login (no auth required)
 * GET    /me        → me (requires authenticate middleware)
 */

const router = Router();

// Register (no auth)
router.post('/register', register);

// Login (no auth)
router.post('/login', login);

// Get current user (protected)
router.get('/me', authenticate, me);

export default router;
