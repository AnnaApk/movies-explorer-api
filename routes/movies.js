const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  postMovie, getMovies, deleteMovieById,
} = require('../controllers/movies');

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/[a-z0-9\D]*\.{1}[a-z0-9\D]*/),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/[a-z0-9\D]*\.{1}[a-z0-9\D]*/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/[a-z0-9\D]*\.{1}[a-z0-9\D]*/),
    owner: Joi.string().alphanum().length(24).required(),
    movieId: Joi.string().alphanum().length(24).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), postMovie);

router.get('/movies', getMovies);

router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteMovieById);

module.exports = router;
