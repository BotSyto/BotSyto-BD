const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryStudentSchema = new Schema({
    id_student: Number,
    
    
});

const HistoryStudent = mongoose.model('HistoryStudent', HistoryStudentSchema);

module.exports = HistoryStudent;