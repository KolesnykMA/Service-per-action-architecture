const express = require('express');
const {
    userJwtMiddleware,
} = require('../../middlewares/auth');
const usersController = require('./usersController');

const usersRouter = express();

usersRouter
    .get(
        '/',
        usersController.list,
    )
    .get(
        '/:userId',
        usersController.show,
    )
    .post(
        '/',
        usersController.create,
    )
    .put(
        '/:userId',
        userJwtMiddleware,
        usersController.update,
    )
    .delete(
        '/:userId',
        userJwtMiddleware,
        usersController.remove,
    )
;

module.exports = usersRouter;
