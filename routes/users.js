const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById,
  patchUser,
  authorizedUser,
} = require('../controllers/users');

// router.get('/users', getUsers);

router.get('/users/me', authorizedUser);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30),
  }),
}), patchUser);

// router.patch('/users/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().pattern(/^https?:\/\/[a-z0-9\D]*\.{1}[a-z0-9\D]*/),
//   }),
// }), patchUserAvatar);

module.exports = router;
