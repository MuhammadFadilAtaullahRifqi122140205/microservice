const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('USER_CREATED', { durable: true });
    await channel.assertQueue('DELETE_USER', { durable: true });
    console.log('✅ Connected to RabbitMQ');
    return { connection, channel };
  } catch (error) {
    console.error('❌ RabbitMQ Connection Failed:', error);
  }
}

module.exports = connect;
