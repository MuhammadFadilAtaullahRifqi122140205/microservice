const connect = require('../config/rabbitmq'); // Buat koneksi di config
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function startSubscribe() {
  const { channel } = await connect();

  channel.consume('USER_CREATED', async (msg) => {
    try {
      const { username, ipAddress, profileId } = JSON.parse(
        msg.content.toString()
      );
      console.log('📥 Received new user:', username);

      const password = bcrypt.hashSync('password', 10);

      // 🔹 Create a new profile in User Service DB
      const user = await User.create({
        username,
        ipAddress,
        password,
      });

      channel.sendToQueue(
        'UPDATE_USER_ID',
        Buffer.from(
          JSON.stringify({
            userId: user.id,
            profileId: profileId,
          })
        )
      );

      console.log('✅ Profile created for User ID:', user.id);
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing message:', error);
      channel.nack(msg, false, false); // Reject message
    }
  });
  channel.consume('DELETE_USER', async (msg) => {
    try {
      const { userId } = JSON.parse(msg.content.toString());
      console.log('📥 Received delete user:', userId);
      await User.destroy({ where: { id: userId } });
      console.log('✅ User deleted:', userId);
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing message:', error);
      channel.nack(msg, false, false); // Reject message
    }
  });
}

module.exports = { startSubscribe };
