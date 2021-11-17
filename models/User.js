const {model, Schema} = require('mongoose');

const {
    modelNames,
    userTypes
} = require('../constants');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    first_name: {
        type: String,
        default: '',
        trim: true
    },
    last_name: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    user_type: {
        type: String,
        required: true,
        default: userTypes.DRIVER,
        enum: Object.values(userTypes)
    }
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
});

module.exports = model(modelNames.USER, userSchema);
