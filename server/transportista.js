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

app.post("/transportistas", (req,res)=>{
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    const dot = req.body.dot;
    
       
    
    db.query('INSERT INTO transportistas(telefono,nombre,dot) VALUES (?,?,?)', [telefono,nombre,dot],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.get("/transportistas", (req,res)=>{
    db.query('SELECT * FROM transportistas', 
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
    const dot = req.body.dot;
        
    db.query('UPDATE transportistas SET nombre=?,dot=? WHERE telefono=?',[nombre,dot,telefono],
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
    
    
    
    db.query('DELETE FROM transportistas WHERE telefono=?',[telefono],
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