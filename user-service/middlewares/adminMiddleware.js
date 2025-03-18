module.exports = (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
