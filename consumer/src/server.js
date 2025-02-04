
import {
  getConfigNumber,
  getDebug,
  getTopic,
  getTypeMessage,
} from "./config/config.js";
import "dotenv/config";
import { connection } from "./redpanda/consumer.js";

console.log(process.env.NUMBER_WORD);


const configNumber = getConfigNumber();
const typeMessage = getTypeMessage();
const topic = getTopic();
const debug = getDebug();

async function start() {
  connection()
}

start();
