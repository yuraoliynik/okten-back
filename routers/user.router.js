const userRouter = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');
const {userValidator} = require('../vaidators');

userRouter.get(
    '/',
    userController.getAllUsers
);

userRouter.get(
    '/:userId',
    userMiddleware.checkUserId,
    userController.getUserById
);
userRouter.post(
    '/:userId',
    userMiddleware.isBodyValid(userValidator.createUser),
    userMiddleware.checkUserName,
    userController.createUser
);
userRouter.put(
    '/:userId',
    userMiddleware.isBodyValid(userValidator.updateUser),
    userMiddleware.checkUserId,
    userController.updateUser
);
userRouter.delete(
    '/:userId',
    userMiddleware.checkUserId,
    userController.deleteUser
);

module.exports = userRouter;
