import "dotenv/config";
import { connection } from "./redpanda/consumer.js";

async function start() {
  connection();
}

start();
