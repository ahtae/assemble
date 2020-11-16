const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  date: {
    type: String,
    default: Date.now
  },
  approved: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }
});

RegistrationSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = Registration;
