const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');
const Event = require('../models/event');
const getTokenFrom = require('../utils/getTokenFrom');

const userRouter = express.Router();

userRouter.get('/:userId', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ message: 'Token missing or invalid!' });
    } else {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (user) {
        res.json({ user });
      } else {
        res.status(400).json({ message: 'User does not exist!' });
      }
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:userId/events', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ message: 'Token missing or invalid!' });
    } else {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (user) {
        const events = await Event.find({ user: userId });

        res.json({ events });
      } else {
        res.status(400).json({ message: 'User does not exist!' });
      }
    }
  } catch (error) {
    next(error);
  }
});

userRouter.post('/:userId/events', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ message: 'Token missing or invalid!' });
    } else {
      const { userId } = req.params;
      const { title, description, price, eventType, date } = req.body;
      const filename = req.file ? req.file.filename : '';
      const user = await User.findById(userId);

      if (user) {
        const eventData = {
          title,
          description,
          price,
          eventType,
          date,
          user: userId,
          thumbnail: filename
        };

        const events = await Event.create(eventData);

        res.json({ events });
      } else {
        res.status(400).json({ message: 'User does not exist!' });
      }
    }
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/:userId/events/:eventId', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ message: 'Token missing or invalid!' });
    } else {
      const { userId, eventId } = req.params;
      const user = await User.findById(userId);

      if (user) {
        await Event.findByIdAndDelete(eventId);

        res.status(204).json({ message: 'Successfully deleted!' });
      } else {
        res.status(400).json({ message: 'User does not exist!' });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
