const {errorStatuses} = require('../constants');
const {User} = require('../models');
const {userUtil} = require('../utils');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await User
                .find()
                .lean();

            res
                .json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const {foundUser} = req;

            res
                .json(foundUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {body} = req;

            const createdUser = await User.create(body);

            const normedUser = userUtil.normalize(createdUser);

            res
                .status(errorStatuses.code_201)
                .json(normedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {params: {userId}, body} = req;

            const updatedUser = await User
                .findByIdAndUpdate(
                    userId,
                    body,
                    {new: true, runValidators: true}
                ).lean();

            res
                .status(errorStatuses.code_201)
                .json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            await User.deleteOne({id: userId});

            res
                .sendStatus(errorStatuses.code_204);
        } catch (e) {
            next(e);
        }
    }
};
