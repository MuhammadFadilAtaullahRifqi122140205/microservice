const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const connect = require('../config/rabbitmq'); // Import RabbitMQ connection
const axios = require('axios');

exports.register = async (req, res) => {
  try {
    const { username, password, city, gender } = req.body;

    if (!username || !password || !city || !gender) {
      return res
        .status(400)
        .json({ error: 'Please provide all required fields' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const ipAddress = await axios.get('https://api64.ipify.org?format=json');
    const user = await User.create({
      username,
      password: hashedPassword,
      ipAddress: ipAddress.data.ip,
    });

    // Kirim data ke User Service melalui RabbitMQ
    const browser = req.headers['user-agent'];
    const { channel } = await connect();
    channel.sendToQueue(
      'USER_REGISTERED',
      Buffer.from(
        JSON.stringify({
          userId: user.id,
          username,
          city,
          gender,
          ipAddress: ipAddress.data.ip,
          browser,
        })
      )
    );

    res
      .status(201)
      .json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path;
      if (field === 'username') {
        return res.status(400).json({ error: 'Username already exists' });
      } else if (field === 'ipAddress') {
        return res.status(400).json({ error: 'IP address already registered' });
      }
    }
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id'],
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
