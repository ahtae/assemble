const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  eventType: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  price: {
    type: Number,
    default: 0.0,
  },
});

EventSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
  virtuals: true,
});

EventSchema.virtual('thumbnail_url').get(function () {
  return `http://localhost:8000/files/${this.thumbnail}`;
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
