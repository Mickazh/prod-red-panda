import { Kafka, logLevel } from "kafkajs";
import { getTopic, getLocalBroker } from "../config/config.js";

const isLocalBroker = getLocalBroker();
const redpanda = new Kafka({
  brokers: [
    isLocalBroker ? `${process.env.HOST_IP}:9092` : "redpanda-0:9092",
    "localhost:19092",
  ],
});

const consumer = redpanda.consumer({ groupId: "test-group" });
const topic = getTopic();

export async function connection() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
          date: convertTimestamp(message.timestamp),
        });
      },
    });
  } catch (error) {
    console.error(error);
  }
}

const convertTimestamp = (timestamp) => {
  let date = new Date(+timestamp);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return day + "/" + month + "/" + year + " à " + hours + ":" + minutes;
};
