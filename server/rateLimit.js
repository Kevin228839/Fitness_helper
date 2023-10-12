const Redis = require('ioredis');
require('dotenv').config();

const rateLimiter = async (req, res, next) => {
  const redisClient = new Redis();
  try {
    const ts = Math.floor(Date.now() / 1000);
    const clientInfo = await redisClient.hgetall(req.ip);
    if (Object.keys(clientInfo).length === 0) {
      await redisClient.hset(req.ip, {
        createdAt: ts,
        count: 1
      });
      return next();
    }
    if ((ts - parseInt(clientInfo.createdAt)) > process.env.rate_limit_duration_in_seconds) {
      await redisClient.hset(req.ip, {
        createdAt: ts,
        count: 1
      });
      return next();
    }
    if (clientInfo.count >= parseInt(process.env.rate_limit_request_allowed)) {
      return res.status(429).json({ message: 'rate limiting' });
    } else {
      await redisClient.hset(req.ip, {
        count: parseInt(clientInfo.count) + 1
      });
      next();
    }
  } catch (err) {
    next(err);
  } finally {
    redisClient.disconnect();
  }
};

module.exports = rateLimiter;
