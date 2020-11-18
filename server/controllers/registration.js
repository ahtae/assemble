const express = require('express');
const jwt = require('jsonwebtoken');
const Event = require('../models/event');
const Registration = require('../models/registration');
const getTokenFrom = require('../utils/getTokenFrom');
const config = require('../utils/config');
const registrationRouter = express.Router();

registrationRouter.post('/:eventId', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ message: 'Token missing or invalid!' });
    } else {
      const userId = decodedToken.id;
      const { eventId } = req.params;
      const event = Event.find({ id: eventId });

      if (event) {
        const registration = await Registration.create({
          user: userId,
          event: eventId,
        });

        await registration
          .populate('event')
          .populate('user', '-password')
          .execPopulate();

        const ownerSocket = req.connectedUsers[registration.event.user];
        console.log(registration.event.user);

        if (ownerSocket) {
          req.io.to(ownerSocket).emit('registration_request', registration);
        }

        res.json(registration);
      }
    }
  } catch (error) {
    next(error);
  }
});

registrationRouter.get('/:registrationId', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ message: 'Token missing or invalid!' });
    } else {
      const { registrationId } = req.params;
      const registration = await Registration.findById(registrationId);

      if (registration) {
        await registration.populate('event').populate('user').execPopulate();

        return res.json(registration);
      } else {
        res.status(400).json({ message: 'Registration not found!' });
      }
    }
  } catch (error) {
    next(error);
  }
});

registrationRouter.post(
  '/:registrationId/approvals',
  async (req, res, next) => {
    try {
      const token = getTokenFrom(req);
      const decodedToken = jwt.verify(token, config.JWT_SECRET);

      if (!token || !decodedToken.id) {
        return res.status(401).json({ message: 'Token missing or invalid!' });
      } else {
        const { registrationId } = req.params;
        const registration = await Registration.findById(registrationId);

        if (registration) {
          registration.approved = true;

          await registration.save();

          res.json(registration);
        } else {
          res.status(400).json({ message: 'Registration not found!' });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

registrationRouter.post(
  '/:registrationId/rejections',
  async (req, res, next) => {
    try {
      const token = getTokenFrom(req);
      const decodedToken = jwt.verify(token, config.JWT_SECRET);

      if (!token || !decodedToken.id) {
        return res.status(401).json({ message: 'Token missing or invalid!' });
      } else {
        const { registrationId } = req.params;
        const registration = await Registration.findById(registrationId);

        if (registration) {
          registration.approved = false;

          await registration.save();

          res.json(registration);
        } else {
          res.status(400).json({ message: 'Registration not found!' });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = registrationRouter;
