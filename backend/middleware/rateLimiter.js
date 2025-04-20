
const rateLimit = require('express-rate-limit');

const createRateLimiter = (options = {}) => {
  const defaultOptions = {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  };

  return rateLimit({
    ...defaultOptions,
    ...options,
  });
};

module.exports = createRateLimiter;
