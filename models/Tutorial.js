const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorialSchema = new Schema({
    name: String,
    description: String,
    kind: Boolean,
});

const Tutorial = mongoose.model('Tutorial', TutorialSchema);

module.exports = Tutorial;