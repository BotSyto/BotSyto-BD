const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id_user: Number,
    name: String,
    lastname: String,
    email: String,
    password: String,
    phone: Number,
    kind: Boolean
});

const User = mongoose.model('User', UserSchema);

module.exports = User;