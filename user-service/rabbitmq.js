const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost'; // Make sure RabbitMQ is running

async function connect() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  // ✅ Ensure the queue exists before consuming
  await channel.assertQueue('USER_REGISTERED', { durable: true });

  console.log('✅ Connected to RabbitMQ - USER_REGISTERED queue asserted');

  return { connection, channel };
}

module.exports = connect;
