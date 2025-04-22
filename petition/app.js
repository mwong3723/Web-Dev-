import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import signaturesRouter from './routes/signatures.js'; // if needed
import sequelize from './db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Define signatures array to store petition data
let signatures = []; // This should be your in-memory store (or replace it with a DB if needed)

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signatures', signaturesRouter); // if using this route file

// Handle POST request to add new signatures
app.post('/signatures', (req, res) => {
  const { name, email, city, state } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newSignature = { name, email, city, state };
  signatures.push(newSignature);  // Storing the new signature
  res.status(201).json(newSignature); // Sending back the new signature as response
});


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

export default app;
