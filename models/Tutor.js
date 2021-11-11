const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    id_teacher: Number,
    name: String,
    lastname: String,
    email: String,
    password: String,
    phone: Number,
    description: String,
});

const Tutor = mongoose.model('Tutor', TutorSchema);

module.exports = Tutor;