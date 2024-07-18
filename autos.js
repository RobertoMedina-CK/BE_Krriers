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
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const anio = req.body.anio;
    const fee = req.body.fee;
    
    
    
    db.query('INSERT INTO autos(marca,modelo,anio,fee) VALUES (?,?,?,?)', [marca,modelo,anio,fee],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.get("/autos", (req,res)=>{
    db.query('SELECT * FROM autos', 
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
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const anio = req.body.anio
    const fee = req.body.fee;
        
    
    db.query('UPDATE autos SET marca=?,modelo=?,anio=?,fee=? WHERE id=?',[marca,modelo,anio,fee,id],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});

app.delete("/delete/:id", (req,res)=>{
    const id = req.params.id;
    
    
    
    db.query('DELETE FROM autos WHERE id=?',id,
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