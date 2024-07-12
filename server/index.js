const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "rudy",
    password: "123456",
    database:"krriers"

});
db.connect((err)=>{
   if (err) {console.error("Error de Conexion", err); return}
   console.log("Conectado a la base de datos");
})

app.post("/create", (req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    
    
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES (?,?,?,?,?)', [nombre,edad,pais,cargo,anios],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send("Empleado Registrado con exito!!");
             }
        }
    );
});

app.get("/empleados", (req,res)=>{
    db.query('SELECT * FROM empleados', 
                (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.put("/update", (req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    
    
    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send("Empleado Actualizado con exito!!");
             }
        }
    );
});



app.listen(3001,()=> {
    console.log("Corriendo en el puerto 3001")
})