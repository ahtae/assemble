const express = require('express');
const multer = require('multer');
const path = require('path');
const authRouter = require('./controllers/auth');
const eventRouter = require('./controllers/event');
const registrationRouter = require('./controllers/registration');
const userRouter = require('./controllers/user');
const cors = require('cors');
const logger = require('./utils/logger');
const config = require('./utils/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const uploadConfig = require('./utils/upload');

const upload = multer(uploadConfig);
const app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use('/files', express.static(path.resolve(__dirname, '..', 'files')));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth/user', authRouter);
app.use('/api/users', upload.single('thumbnail'), userRouter);
app.use('/api/events', eventRouter);
app.use('/api/registration', registrationRouter);

app.use((err, req, res) => {
  console.error(err);
  console.error(err.stack);

  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
