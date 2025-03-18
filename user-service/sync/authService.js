const connect = require('../config/rabbitmq'); // Buat koneksi di config
const Profile = require('../models/Profile');

async function startConsumer() {
  const { channel } = await connect();

  channel.consume('USER_REGISTERED', async (msg) => {
    try {
      const { userId, username, city, gender, ipAddress, browser } = JSON.parse(
        msg.content.toString()
      );
      console.log('📥 Received new user:', userId, username);

      // 🔹 Create a new profile in User Service DB
      await Profile.create({
        userId,
        username,
        city,
        gender,
        ipAddress,
        browser,
      });

      console.log('✅ Profile created for User ID:', userId);
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing message:', error);
      channel.nack(msg, false, false); // Reject message
    }
  });

  channel.consume('UPDATE_USER_ID', async (msg) => {
    try {
      const { userId, profileId } = JSON.parse(msg.content.toString());
      console.log(
        '📥 Received update for user ID:',
        userId,
        'to profile ID:',
        profileId
      );

      // 🔹 Update the user ID in User Service DB
      await Profile.update({ userId: userId }, { where: { id: profileId } });

      console.log('✅ User ID updated from null to', userId);
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing message:', error);
      channel.nack(msg, false, false); // Reject message
    }
  });
}

module.exports = { startConsumer };
