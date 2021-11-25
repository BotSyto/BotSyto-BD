const User = require("./../models/User");
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
    name = name.trim();
    lastname = lastname.trim();
    email = email.trim();
    password = password.trim();

    if (name == "" ||
        lastname == "" ||
        email == "" ||
        password == "" ||
        phone == "" ||
        kind == ""
    ) {
        res.json({
            status: "FAILED",
            message: "Hay campos vacios",
        });
    }else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Nombre invalido",
        });
    }
    else {
        User.find({ email }).then((result) => {
            if (result.length) {
                res.json({
                    status: "FAILED",
                    message: " Ya existe un usuario registrado con ese correo."
                });
            }
            else {
                const id_user = phone //Generar Id de usuario
                const saltnum = 5 
                bcrypt.hash(password,saltnum).then((bcPassword) => {
                    const newUser = new User({
                        id_user,
                        name,
                        lastname,
                        email,
                        password: bcPassword,
                        phone,
                        kind,
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
                            message: "Error al guardar nuevo usuario"
                        });
                    });

                }).catch((err) => {
                    res.json({
                        status: "FAILED",
                        message: "Error en hasheo de password"
                    });
                });
            }

        }).catch((err) => {
            res.json({
                status: "FAILED",
                message: "Error al verificar existencias"
            });
        });
    }

});


//Signin
router.post('/signin', (req, res) => {
    let { email, password } = req.body
    email = email.trim();
    password = password.trim();
    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Hay campos vacios",
        });
    }
    else {
        User.find({ email })
            .then((resultUser) => {
                if (resultUser.length == 0) {
                    res.json({
                        status: "FAILED",
                        message: "El usuario no existe",
                    });
                } else {
                    const extPassword = resultUser[0].password;
                    bcrypt
                        .compare(password, extPassword)
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


// curl -d '{\"name\":\"Stal\",\"lastname\":\"edq\",\"email\":\"stal@gmail.com\",\"password\":\"pass\",\"phone\":123,\"kind\":1}' -X POST http://localhost:5000/user/signup