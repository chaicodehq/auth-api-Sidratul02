/**
 * TODO: Global error handler
 *
 * 1. Handle Mongoose validation errors (error.name === 'ValidationError'):
 *    - Return 400 with { error: { message: error.message } }
 * 2. Handle Mongoose duplicate key errors (error.code === 11000):
 *    - Return 409 with { error: { message: "Email already exists" } }
 * 3. Handle all other errors:
 *    - Return 500 with { error: { message: error.message } }
 */

export function errorHandler(error, req, res, next) {
  // 1. Mongoose Validation Error
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: { message: error.message }
    });
  }

  // 2. Duplicate Key Error (e.g., email already exists)
  if (error.code === 11000) {
    return res.status(409).json({
      error: { message: "Email already exists" }
    });
  }

  // 3. Generic Server Error
  return res.status(500).json({
    error: { message: error.message }
  });
}
