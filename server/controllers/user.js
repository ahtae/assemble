const express = require('express');
const User = require('../models/user');
const Event = require('../models/event');

const userRouter = express.Router();

userRouter.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user) {
      res.json({ user });
    } else {
      res.status(400).json({ message: 'User does not exist!' });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:userId/events', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user) {
      const events = await Event.find({ user: userId });

      res.json({ events });
    } else {
      res.status(400).json({ message: 'User does not exist!' });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.post('/:userId/events', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { title, description, price, eventType, date } = req.body;
    const { filename } = req.file;
    const user = await User.findById(userId);
    console.log(req.file);

    if (user) {
      const events = await Event.create({
        title,
        description,
        price,
        eventType,
        date,
        thumbnail: filename,
        user: userId,
      });

      res.json({ events });
    } else {
      res.status(400).json({ message: 'User does not exist!' });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/:userId/events/:eventId', async (req, res, next) => {
  try {
    const { userId, eventId } = req.params;
    const user = await User.findById(userId);

    if (user) {
      await Event.findByIdAndDelete(eventId);

      res.status(204).json({ message: 'Successfully deleted!' });
    } else {
      res.status(400).json({ message: 'User does not exist!' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
