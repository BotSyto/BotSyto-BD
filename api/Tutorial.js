const Tutorial = require("./../models/Tutorial");
const express = require("express");
const router = express.Router();


router.post('/subirTuto', (req, res) => {
    let { name,
        description,
        category,
        value,
        data,
    } = req.body
    name = name.trim();
    description = description.trim();
    if (name == "" || description == "") {
        res.json({
            status: "FAILED",
            message: "Hay campos vacios",
        });
    } else {
        Tutorial.find({ name }).then((result) => {
            if (result.length) {
                res.json({
                    status: "FAILED",
                    message: "Ya hay un tutorial registrado con ese nombre",
                });
            } else {
                var maxid;
                Tutorial.find({}, { id_tutorial: 1, _id: 0 }).sort({ id_tutorial: -1 }).limit(1).then(
                    (result) => {
                        maxid = result[0]["id_tutorial"];
                        console.log(maxid + 1);
                    }
                )
                const newTuto = new Tutorial({
                    id_tutorial: maxid + 1,
                    name,
                    description,
                    category,
                    value,
                    data,
                }
                );
                newTuto.save().then((result) => {
                    res.json({
                        status: "SUCCESS",
                        message: "Tutorial subido exitosamente",
                    });
                }).catch((err) => {
                    res.json({
                        status: "FAILED",
                        message: "Error al subir tutorial"
                    });
                });
            }
        })
    }

});


router.get('/tutorial', (req, res) => {
    let { idTutorial } = req.body
    Tutorial.find({ idTutorial }).then((result) => {

        res.json({
            status: "Ok",
            data: result,
        }
        );

    }

    )
});


router.get('/rp', (req, res) => {
    res.json({
        status: "Ok",
        data: "tuto"
    });

});

module.exports = router;