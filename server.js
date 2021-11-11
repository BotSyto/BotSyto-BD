var express = require('express')
var app = express();
var mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
var UserRouter = require('./api/User');
const User = require('./models/User')
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

async function runCode() {
    var admin = new User({
      id_user: "111",
    name: "Cesar",
    lastname: "Augusto",
    email: "tri@gmail.com",
    password: "des",
    phone: "921",
    kind: "1"
    });
  
    var doc = await admin.save()
}

//runCode().catch(error => { console.error(error) });

// app.post('/user/signup', function(req, res) {
//     console.log('receiving data ...');
//     console.log('body is ',req.body);
//     res.send(req.body);
// });


var request = require('request');
function updateUser(postData){
            var ops = {
                uri: 'http://localhost:5000/user/signup',
                body: JSON.stringify(postData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(ops, function (error, response) {
                console.log(error,response.body);
                return;
            });
        }

// updateUser({
//     "name": "Simon",
//     "lastname": "Cieza",
//     "email": "sc@gmail.com",
//     "password": "passone",
//     "phone": "991",
//     "kind": "1"
// });

app.listen(5000, () => {
    console.log(`Servidor corriendo en el puerto 5000`);
})