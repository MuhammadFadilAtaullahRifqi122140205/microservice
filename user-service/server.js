const express = require('express');
const Profile = require('./models/Profile'); // Assume we have a Profile model
const connect = require('./rabbitmq'); // Import RabbitMQ connection

const app = express();
app.use(express.json());

async function startConsumer() {
  const { channel } = await connect();

  channel.consume('USER_REGISTERED', async (msg) => {
    const { userId, email } = JSON.parse(msg.content.toString());
    console.log('📥 Received new user:', userId, email);

    // 🔹 Create a new profile in User Service DB
    await Profile.create({ userId, name: 'New User', email });

    console.log('✅ Profile created for User ID:', userId);
    channel.ack(msg);
  });
}

startConsumer(); // Start listening to RabbitMQ messages

app.listen(4002, () => console.log('✅ User Service running on port 4002'));
