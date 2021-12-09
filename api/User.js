const User = require("./../models/User");
const Student = require("./../models/Student");
const Tutor = require("../models/Tutor");
const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
//Signup
router.post('/signup', (req, res) => {
    let {
        name,
        lastname,
        email,
        password,
        phone,
        kind,
    } = req.body
    name = name.toString().trim();
    lastname = lastname.trim();
    email = email.trim();
    password = password.trim();

    if (name == "" ||
        lastname == "" ||
        email == "" ||
        password == "" ||
        phone == "" 
    ) {

        res.json({
            status: "FAILED",
            message: "Hay campos vacios",
        });
    } else {

        var UserType = kind == 0 ? Student : Tutor;

        UserType.find({
            phone
        }).then((result) => {
            if (result.length != 0) {
                res.json({
                    status: "FAILED",
                    message: " Ya existe un usuario registrado con ese numero."
                });
            } else {
                const id_student = phone //generar un id
                const saltnum = 5
                bcrypt.hash(password, saltnum).then((bcPassword) => {
                    const newUser = new UserType({
                        id_student,
                        name,
                        lastname,
                        email,
                        password: bcPassword,
                        phone,
                        kind,
                        // description: "student",
                        // average: {},
                        // meets: 1,
                        // tutorial: [1],
                    });
                    newUser.save().then((result) => {
                        res.json({
                            status: "SUCCESS",
                            message: "Registro satisfactorio",
                            data: result,
                        });
                    }).catch((err) => {
                        res.json({
                            status: "FAILED",
                            message: "Error al guardar."
                        });
                    });

                }).catch((err) => {
                    res.json({
                        status: "FAILED",
                        message: "Error en hasheo."
                    });
                });
            }

        }).catch((err) => {
            res.json({
                status: "FAILED",
                message: "Error al Verificar"
            });
        });
    }

});


//Signin
router.post('/signin', (req, res) => {
    let {
        email,
        password,
        kind
    } = req.body;
    console.log(email);
    console.log(password);
    email = email.toString().trim();
    password = password.toString().trim();
    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Hay campos vacios",
        });
    } else {
        var Tabla = kind == 0 ? Student : Tutor;
        Tabla.find({
               "email":email
            })
            .then((resultUser) => {
                if (resultUser.length == 0) {
                    res.json({
                        status: "FAILED",
                        message: "El usuario no existe",
                    });
                } else {
                    const extPassword = resultUser[0].password;
                    bcrypt.compare(password, extPassword)
                        .then((result) => {
                            if (result) {
                                // Password match
                                res.json({
                                    status: "SUCCESS",
                                    message: "Inicio de sesión satisfactorio",
                                    data: resultUser,
                                });
                            } else {
                                res.json({
                                    status: "FAILED",
                                    message: "Contraseña inválida!",
                                });
                            }
                        })
                        .catch((err) => {
                            res.json({
                                status: "FAILED",
                                message: "Ocurrió un error mientras se comparaban las contraseñas",
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "Se produjo un error al verificar si existía el usuario!",
                });

            });


    }
})

module.exports = router;


// curl -d '{\"name\":\"Stal\",\"lastname\":\"edq\",\"email\":\"stal@gmail.com\",\"password\":\"pass\",\"phone\":123,\"kind\":1}' -X POST http://localhost:5000