import { createClient } from 'redis'

export const redisClient = await createClient({
  url: "redis://localhost:6379",
  password: "redispwd",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();