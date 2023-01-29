require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const helmet = require('helmet');
const process = require('process');
const { errors } = require('celebrate');

const { NODE_ENV, DB } = process.env;

const cors = require('cors');

const options = [
  'https://lovely.movies.nomoredomains.sbs',
  'http://lovely.movies.nomoredomains.sbs',
  'lovely.movies.nomoredomains.sbs',
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
];

const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { limiter } = require('./middlewares/limiter');
const NotFoundError = require('./errors/notFoundError');
const { isAuthorized } = require('./middlewares/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const signupRoute = require('./routes/signup');
const signinRoutr = require('./routes/signin');

const { PORT = 3000 } = process.env;

const app = express();

app.use('*', cors(options));

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? DB : 'mongodb://localhost:27017/moviesdb', { useNewUrlParser: true });

app.use(requestLogger);

// app.use(limiter);

app.use(signupRoute);
app.use(signinRoutr);
app.use(isAuthorized);
app.use(userRoute);
app.use(movieRoute);

app.use((req, res, next) => {
  const err = new NotFoundError('Route is not defauned!');
  next(err);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  next();
  return res.status(500).send({ message: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
