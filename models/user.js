let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    token: {
        value: { type: String, default: '' },
        expiresAt: { type: Date }
    },

    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
});

userSchema.pre('save', function (next) {
    let user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);

        callback(null, isMatch);
    });
};

userSchema.statics.hashPassword = function (passwordToHash, callback) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(passwordToHash, salt, function (err, hash) {
            if (err) return callback(err);

            callback(null, hash);
        });
    });
};

module.exports = mongoose.model('User', userSchema);;