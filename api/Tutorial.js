const Tutorial = require("./../models/Tutorial");
const express = require("express");
const router = express.Router();

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