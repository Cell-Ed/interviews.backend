import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 3600000, // 1 hr
  max: 100,
  message: 'You have exceeded the limit of 100 requests per hour.',
  headers: true,
});
