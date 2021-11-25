const Tutorial = require("./../models/Tutorial");
const express = require("express");
const router = express.Router();

router.post('/subirTuto',(req,res) =>{
    let{name,description}=req.body
    name=name.trim();
    description=description.trim();
    if(name==""||description==""){
        res.json({
            status: "FAILED",
            message: "Hay campos vacios",
        });
    }else{
        Tutorial.find({name}).then( (result) =>{
            if(result.length){
                res.json({
                    status: "FAILED",
                    message: "Ya hay un tutorial registrado con ese nombre",
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

router.get('/rp',(req,res)=>{
    res.json({
        status: "Ok",
        data: "tuto"
    });

});

module.exports=router;