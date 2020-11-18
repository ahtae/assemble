const express = require('express');
const getTokenFrom = require('../utils/getTokenFrom');
const eventRouter = express.Router();
const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

eventRouter.get('/:eventType', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ message: 'Token missing or invalid!' });
    } else {
      const { eventType } = req.params;
      const events = await Event.find({ eventType });

      if (events) {
        res.json({ events });
      } else {
        res
          .status(400)
          .json({ message: 'Events with this type do not exist!' });
      }
    }
  } catch (error) {
    next(error);
  }
});

eventRouter.get('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ message: 'Token missing or invalid!' });
    } else {
      const events = await Event.find({});

      res.json({ events });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = eventRouter;
