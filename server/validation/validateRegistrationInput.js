const Validator = require('validator');
const validText = require('./valid-text');

const validateRegistrationInput = (data) => {
  const errors = {};

  data.handle = validText(data.handle) ? data.handle : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = 'Handle must be between 2 and 30 characters!';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required!';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required!';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid!';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required!';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters!';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateRegistrationInput;
