const amqp = require('amqplib');

async function deleteQueue() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.deleteQueue('USER_REGISTERED');

  console.log('Queue deleted');

  await channel.close();
  await connection.close();
}

deleteQueue();
