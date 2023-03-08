const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    favorites: {
        type: Array,
        required: true
    },
    wishlist: {
        type: Array,
        required: true
    },
    picUrl: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema)

module.exports = User;