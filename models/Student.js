const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    id_student: Number,
    name: String,
    lastname: String,
    email: String,
    password: String,
    phone: Number,
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;