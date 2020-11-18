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
const http = require('http');
const socketio = require('socket.io');

const app = express();
const upload = multer(uploadConfig);

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

const server = http.Server(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
  },
});

const connectedUsers = {};

io.on('connection', (socket) => {
  const { userId } = socket.handshake.query;

  if (userId) {
    connectedUsers[userId] = socket.id;
  }
});

app.use('/files', express.static(path.resolve(__dirname, '..', 'files')));

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  next();
});

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

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
