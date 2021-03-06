const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const validateRegistrationInput = require('../validation/validateRegistrationInput');
const validateLoginInput = require('../validation/validateLoginInput');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

authRouter.post('/login', async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (isCorrectPassword) {
        const userForToken = {
          id: user._id,
          email: user.email,
        };

        const token = jwt.sign(userForToken, config.JWT_SECRET);

        res.status(200).send({ token, userId: user._id });
      } else {
        res.status(400).json({ message: 'Wrong email or password!' });
      }
    } else {
      res.status(400).json({ message: 'User does not exist!' });
    }
  } catch (error) {
    next(error);
  }
});

authRouter.post('/register', async (req, res, next) => {
  const { errors, isValid } = validateRegistrationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const { email, firstName, lastName, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(401).json({ message: 'The user already exists!' });
    } else if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });
      const userForToken = {
        id: user._id,
        email: user.email,
      };

      const token = jwt.sign(userForToken, config.JWT_SECRET);

      res.status(200).send({ token, userId: user.id });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
