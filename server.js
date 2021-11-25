var express = require('express')
var app = express();
var mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
var UserRouter = require('./api/User');
var TutorialRouter = require('./api/Tutorial');

const User = require('./models/User');
const Tutorial = require('./models/Tutorial');

var uri = `mongodb://127.0.0.1:27017/botsytoDB`;

mongoose.connect(uri, {
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('open', _ => {
    console.log('DB conectada en ', uri);
});

db.on('error', err => {
    console.log(err);
});

app.use('/user', UserRouter);
app.use('/tutorial',TutorialRouter);

app.listen(5000, () => {
    console.log(`Servidor corriendo en el puerto 5000`);
})