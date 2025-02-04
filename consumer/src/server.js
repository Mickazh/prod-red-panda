import {
  getConfigNumber,
  getDebug,
  getTopic,
  getTypeMessage,
} from "./config/config.js";
import "dotenv/config";
import { connection } from "./redpanda/consumer.js";
import { redisClient } from "./redis/client.js";

async function start() {
  connection();
}
import { createClient } from 'redis';

const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

await client.set('key', 'value');
const value = await client.get('key');
await client.disconnect();
// console.log(await redisClient.get("test"));

start();
