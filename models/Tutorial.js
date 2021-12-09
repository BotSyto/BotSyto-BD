const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorialSchema = new Schema({
    id_tutorial: Number,
    name: String,
    descripcion: String,
    category: String,
    value: Number,
    data: Map,
    //comentarios: Array,   //[["student","comentario","fecha"],[]]
});

const Tutorial = mongoose.model('Tutorial', TutorialSchema);

module.exports = Tutorial;