const userRouter = require('express').Router();

const userController = require('../controllers/user.controller');

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userController.getUserById);
userRouter.post('/:userId', userController.createUser);
userRouter.put('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

module.exports = userRouter;
