const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rM185347$",
    database:"krriers"

});

app.post("/create", (req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargos;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES (?,?,?,?,?', [nombre,edad,pais,cargo,anios],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send("Empleado Registrado con exito!!");
             }
        }
    );

});
app.listen(3001,()=> {
    console.log("Corriendo en el puerto 3001")
})