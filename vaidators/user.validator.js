const Joi = require('joi');

const {
    userTypes,
    regexps
} = require('../constants');

const userJoiProps = {
    username:
        Joi.string(),

    first_name:
        Joi.string(),

    last_name:
        Joi.string(),

    email:
        Joi.string()
            .regex(regexps.EMAIL),

    password:
        Joi.string()
            .length(8)
            .regex(regexps.PASSWORD),

    user_type:
        Joi.string()
            .valid(...Object.values(userTypes))
};

const {
    username,
    first_name,
    last_name,
    email,
    password,
    user_type
} = userJoiProps;

module.exports = {
    createUser: Joi.object({
        username: username.required(),
        first_name: first_name.required(),
        last_name: last_name.required(),
        email: email.required(),
        password: password.required(),
        user_type: user_type.required()
    }),

    updateUser: Joi.object({
        first_name,
        last_name,
        email,
        password,
        user_type
    })
};
