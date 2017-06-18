let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    token: {
        value: { type: String, default: '' },
        expiresAt: { type: String, required: true }
    },

    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);