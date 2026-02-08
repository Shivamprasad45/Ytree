// import Redis from "ioredis";

// /**
//  * RateLimiter class to handle different rate limiting tiers using Redis.
//  * Uses a sliding window counter approach.
//  */
// class RateLimiter {
//     private redis: Redis;

//     constructor(redisUrl: string) {
//         this.redis = new Redis(redisUrl);

//         this.redis.on("error", (err) => {
//             console.error("Redis error:", err);
//         });
//     }

//     /**
//      * General rate limit check
//      * @param identifier - Unique identifier for the client (e.g., IP address or User ID)
//      * @param limit - Maximum number of requests allowed in the window
//      * @param windowInSeconds - Time window in seconds
//      * @returns object containing 'success', 'remaining', and 'reset' time
//      */
//     async checkLimit(identifier: string, limit: number, windowInSeconds: number) {
//         const key = `ratelimit:${identifier}`;
//         const now = Date.now();
//         const windowStart = now - (windowInSeconds * 1000);

//         try {
//             // Remove old entries outside the window
//             await this.redis.zremrangebyscore(key, 0, windowStart);

//             // Count current entries
//             const requestCount = await this.redis.zcard(key);

//             if (requestCount >= limit) {
//                 // Find when the first request expires to calculate reset time
//                 const firstRequest = await this.redis.zrange(key, 0, 0, "WITHSCORES");
//                 const resetTime = firstRequest.length > 1
//                     ? Math.ceil((parseInt(firstRequest[1]) + (windowInSeconds * 1000) - now) / 1000)
//                     : windowInSeconds;

//                 return {
//                     success: false,
//                     limit,
//                     remaining: 0,
//                     reset: resetTime
//                 };
//             }

//             // Add current request
//             await this.redis.zadd(key, now, `${now}-${Math.random()}`);
//             // Set expiry on the key to clean up eventually
//             await this.redis.expire(key, windowInSeconds);

//             return {
//                 success: true,
//                 limit,
//                 remaining: limit - (requestCount + 1),
//                 reset: windowInSeconds
//             };
//         } catch (error) {
//             console.error("Rate limiting logic error:", error);
//             // Fallback to allow request in case of Redis failure
//             return { success: true, limit, remaining: 1, reset: 0 };
//         }
//     }

//     /**
//      * Rate limit for Authentication APIs (Login/Signup)
//      * Stricter: 5 attempts per 1 minute
//      */
//     async checkAuthLimit(identifier: string) {
//         return this.checkLimit(`auth:${identifier}`, 5, 60);
//     }

//     /**
//      * Rate limit for General APIs
//      * 100 requests per 1 minute
//      */
//     async checkGeneralApiLimit(identifier: string) {
//         return this.checkLimit(`api:${identifier}`, 100, 60);
//     }

//     /**
//      * Rate limit for sensitive actions like Mailer/Contact
//      * 3 requests per 5 minutes
//      */
//     async checkSensitiveActionLimit(identifier: string) {
//         return this.checkLimit(`sensitive:${identifier}`, 3, 300);
//     }
// }

// // Export a singleton instance
// const REDIS_URL = process.env.REDIS_URL || "";
// export const rateLimiter = new RateLimiter(REDIS_URL);
// export default RateLimiter;
