const mongoose = require('mongoose');

const {
    errorMessages,
    errorStatuses
} = require('../constants');

const {User} = require('../models');

module.exports = {
    isBodyValid: (userValidator) => (req, res, next) => {
        try {
            const {body} = req;

            const {error} = userValidator.validate(body);

            if (error) {
                return next({
                    message: error.details[0].message,
                    status: errorStatuses.code_400
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserName: async (req, res, next) => {
        try {
            const {body: {username}} = req;

            const foundUser = await User
                .findOne({username})
                .lean();

            if (foundUser) {
                return next({
                    message: errorMessages.USER_NAME_ALREADY_EXISTS,
                    status: errorStatuses.code_409
                });
            }

            req.foundUser = foundUser;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserId: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            const isValidUserId = mongoose
                .Types
                .ObjectId
                .isValid(userId);

            if (!isValidUserId) {
                return next({
                    message: errorMessages.USER_ID_DOES_NOT_VALID,
                    status: errorStatuses.code_400
                });
            }

            const foundUser = await User
                .findById(userId)
                .lean();

            if (!foundUser) {
                return next({
                    message: errorMessages.USER_ID_DOES_NOT_EXIST,
                    status: errorStatuses.code_404
                });
            }

            req.foundUser = foundUser;

            next();
        } catch (e) {
            next(e);
        }
    }
};
