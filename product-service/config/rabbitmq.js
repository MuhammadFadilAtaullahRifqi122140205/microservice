const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('PRODUCT', { durable: true });
    console.log('✅ Connected to RabbitMQ');
    return { connection, channel };
  } catch (error) {
    console.error('❌ RabbitMQ Connection Failed:', error);
  }
}

module.exports = connect;
