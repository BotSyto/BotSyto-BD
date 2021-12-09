const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentTutorialSchema = new Schema({
    id_student: Number,
    id_tutorial: Number, 
    nota: Number,
    valoracion: Number,
    percent: Number,
    avance: Number,
});

const StudentTutorial = mongoose.model('StudentTutorial', StudentTutorialSchema);

module.exports = StudentTutorial;