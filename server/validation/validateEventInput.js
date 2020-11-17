const Validator = require('validator');
const validText = require('./validText');

const validateEventInput = (data) => {
  const errors = {};

  data.title = validText(data.title) ? data.title : '';
  data.description = validText(data.description) ? data.description : '';
  data.eventType = validText(data.eventType) ? data.eventType : '';
  data.price = validText(data.price) ? data.price : '';
  data.thumbnail = validText(data.thumbnail) ? data.thumbnail : '';

  if (Validator.isEmpty(data.title)) {
    errors.email = 'Title field is required!';
  }

  if (Validator.isEmpty(data.description)) {
    errors.password = 'Description field is required!';
  }

  if (Validator.isEmpty(data.eventType)) {
    errors.eventType = 'Event type is required!';
  }

  if (Validator.price.isEmpty(data.eventType)) {
    errors.eventType = 'Price is required!';
  }

  if (Validator.thumbnail.isEmpty(data.thumbnail)) {
    errors.thumbnail = 'Thumbnail is required!';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateEventInput;
