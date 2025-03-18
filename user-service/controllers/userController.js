const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const connect = require('../config/rabbitmq');

exports.getMyProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure `JWT_SECRET` is set in `.env`

    const userId = decoded.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const profile = await Profile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//TODO: Implement upload image
exports.updateProfile = async (req, res) => {
  try {
    const { username, image, city, gender } = req.body;

    const profile = await Profile.findOne({
      where: { userId: req.params.userId },
    });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (profile.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (username) profile.username = username;
    if (image) profile.image = image;
    if (city) profile.city = city;
    if (gender) profile.gender = gender;
    await profile.save();

    return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { username, gender, city, browser, ipAddress } = req.body;
    if (!username || !gender || !city || !browser || !ipAddress) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }

    const profile = await Profile.create({
      username,
      gender,
      city,
      browser,
      ipAddress,
    });

    const { channel } = await connect();
    channel.sendToQueue(
      'USER_CREATED',
      Buffer.from(
        JSON.stringify({
          username,
          ipAddress: ipAddress,
          profileId: profile.id,
        })
      )
    );

    return res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.params.userId },
    });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    await Profile.destroy({ where: { userId: req.params.userId } });

    const { channel } = await connect();
    channel.sendToQueue(
      'DELETE_USER',
      Buffer.from(
        JSON.stringify({
          userId: req.params.userId,
        })
      )
    );

    return res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return res.status(500).json({ error: error.message });
  }
};
