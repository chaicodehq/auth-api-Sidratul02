import bcrypt from 'bcryptjs';
import  User  from '../models/user.model.js';
import { signToken } from '../utils/jwt.js';

/**
 * TODO: Register a new user
 *
 * 1. Extract name, email, password from req.body
 * 2. Check if user with email already exists
 *    - If yes: return 409 with { error: { message: "Email already exists" } }
 * 3. Create new user (password will be hashed by pre-save hook)
 * 4. Return 201 with { user } (password excluded by default)
 */
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Check if user with email already exists
     const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: { message: "Email already exists" }
      });
    }

    // Create user (password hashed via pre-save hook)
    const user = await User.create({ name, email, password });
    user.password = undefined;

    res.status(201).json({ user });

  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Login user
 *
 * 1. Extract email, password from req.body
 * 2. Find user by email (use .select('+password') to include password field)
 * 3. If no user found: return 401 with { error: { message: "Invalid credentials" } }
 * 4. Compare password using bcrypt.compare(password, user.password)
 * 5. If password wrong: return 401 with { error: { message: "Invalid credentials" } }
 * 6. Generate JWT token with payload: { userId: user._id, email: user.email, role: user.role }
 * 7. Return 200 with { token, user } (exclude password from user object)
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Get user with password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        error: { message: "Invalid credentials" }
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: { message: "Invalid credentials" }
      });
    }

    // Generate token
    const token = signToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    // Remove password before sending response
    user.password = undefined;

    res.status(200).json({
      token,
      user
    });

  } catch (error) {
    next(error);
  }
}


/**
 * TODO: Get current user
 *
 * 1. req.user is already set by auth middleware
 * 2. Return 200 with { user: req.user }
 */
export async function me(req, res, next) {
  try {
    res.status(200).json({
      user: req.user
    });
  } catch (error) {
    next(error);
  }
}
