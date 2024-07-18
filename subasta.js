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

app.post("/webhook", (req,res)=>(
    console.log(req.body)
))

app.post("/create", (req,res)=>{
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const direcion = req.body.direccion;
    const subasta = req.body.subasta;
    const precio = req.body.precio;

       
    
    db.query('INSERT INTO subastas(telefono,nombre,direccion,subasta,precio) VALUES (?,?,?,?,?)', [telefono,nombre,direcion,subasta,precio],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.get("/subastas", (req,res)=>{
    db.query('SELECT * FROM subastas', 
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
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const subasta = req.body.subasta;
    const precio = req.body.precio;

       
    
    db.query('UPDATE subastas SET nombre=?,direccion=?,subasta=?,precio=? WHERE telefono=?',[nombre,direccion,subasta,precio,telefono],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});




app.delete("/delete/:telefono", (req,res)=>{
    const telefono = req.params.telefono;
    
    
    
    db.query('DELETE FROM subastas WHERE telefono=?',[telefono],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.listen(3001,()=> {
    console.log("Corriendo en el puerto 3001")
})