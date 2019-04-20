const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/inventory', { useNewUrlParser: true });

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: String,
    email: String,
    password: String,
    IsAdmin: Boolean
});

UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this.email }, config.secret, { expiresIn: 86400 })
}

UserSchema.methods.hashPassword = function () {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
}

UserSchema.methods.comparePassword = function (password) {
    console.log(this.password)
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.log = function () {
    console.log(this);
}

module.exports = mongoose.model('User', UserSchema);