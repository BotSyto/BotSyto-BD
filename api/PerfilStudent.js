// Array tutos;

// {buscar(id.tutos) en Tutorial}

// => Tutorials

// front(Tutoriales){
//     print tutorial.titulos
// }

//

const Student = require("./../models/Student");
const StudentTutorial = require("./../models/StudentTutorial");
const express = require("express");
const router = express.Router();

router.get('/tutosID',(req,res) =>{
    let {idStudent} = req.body
    
    StudentTutorial.find({idStudent},{id_tutorial:1}).then( result => {
        //retorna result
        //result.map( (tuto) => {
        //     ids.append(tuto.id_tutorial);
        // });
        res.json({
                men: "Tutoriales en Curso",
                rpta: result
        });
    });
});

router.get('/tutosName',(req,res) =>{
    let {idStudent} = req.body
    
    StudentTutorial.find({idStudent}).then( result => {
        //retorna result
        res.json({
            men: "Tutoriales en Curso",
            rpta: result.name
       })
    }   
    )
});

router.get('/')