// const Redis = require("ioredis");

// // Mocking the class logic since we want to run this as a standalone script
// class RateLimiter {
//     constructor(redisUrl) {
//         this.redis = new Redis(redisUrl);
//     }

//     async checkLimit(identifier, limit, windowInSeconds) {
//         const key = `ratelimit:test:${identifier}`;
//         const now = Date.now();
//         const windowStart = now - (windowInSeconds * 1000);

//         try {
//             await this.redis.zremrangebyscore(key, 0, windowStart);
//             const requestCount = await this.redis.zcard(key);

//             if (requestCount >= limit) {
//                 return { success: false, remaining: 0 };
//             }

//             await this.redis.zadd(key, now, `${now}-${Math.random()}`);
//             await this.redis.expire(key, windowInSeconds);

//             return { success: true, remaining: limit - (requestCount + 1) };
//         } catch (error) {
//             console.error(error);
//             return { success: true };
//         }
//     }
// }

// async function test() {
//     const REDIS_URL = "redis://default:R4rv2cs1iK6TZw4xdTG7ZFuXp5DyLCQx@redis-14927.crce214.us-east-1-3.ec2.cloud.redislabs.com:14927";
//     const limiter = new RateLimiter(REDIS_URL);
//     const id = "test-user-" + Date.now();

//     console.log("Starting rate limit test for ID:", id);

//     for (let i = 1; i <= 7; i++) {
//         const res = await limiter.checkLimit(id, 5, 10);
//         console.log(`Request ${i}: ${res.success ? "✅ Success" : "❌ Rate Limited"} (Remaining: ${res.remaining})`);
//     }

//     process.exit(0);
// }

// test();
