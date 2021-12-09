var express = require('express')
var app = express();
var cors = require('cors');
app.use(cors());


var mongoose = require("mongoose");
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json())
var UserRouter = require('./api/User');
var TutorialRouter = require('./api/Tutorial');

const User = require('./models/User');
const Tutorial = require('./models/Tutorial');

var uri = `mongodb://127.0.0.1:27017/BTST`;

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
app.use('/tutorial', TutorialRouter);

var request = require('request');

function updateUser(postData) {
    var ops = {
        uri: 'http://localhost:5000/user/signup',
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(ops, function (error, response) {
        console.log(error, response.body);
        return;
    });
}


function updateTuto(postData) {
    var ops = {
        uri: 'http://localhost:5000/tutorial/subirTuto',
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(ops, function (error, response) {
        console.log(error, response.body);
        return;
    });
}

// updateTuto(
//     {
//         "name"          : "Ingles basico" ,
//         "description": "ingles para principiantes",
//         "category": "idiomas",
//         "value": "1",
//         "data": { "paso1" : "think" },
//     }
// )

//  updateUser({
//      "name": "Simon",
//      "lastname": "Cieza",
//      "email": "sc@gmail.com",
//      "password": "passone",
//      "phone": "991",
//      "kind": "0"
//  });

// updateUser({
//     "name": "Studsimon",
//     "lastname": "Ent",
//     "email": "simontudent@gmail.com",
//     "password": "passone",
//     "phone": "990",
//     "kind": "0"
// });



app.listen(5000, () => {
    console.log(`Servidor corriendo en el puerto 5000`);
})