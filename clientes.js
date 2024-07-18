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
    const buyer = req.body.buyer;
    const foldernum = req.body.foldernum;
       
    
    db.query('INSERT INTO clientes(telefono,nombre,buyer,foldernum) VALUES (?,?,?,?)', [telefono,nombre,buyer,foldernum],
        (err,result)=>{
            if(err){
                console.log(err);
             } else {
                res.send(result);
             }
        }
    );
});


app.get("/clientes", (req,res)=>{
    db.query('SELECT * FROM clientes', 
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
    const buyer = req.body.buyer;
    const foldernum = req.body.foldernum;
       
    
    db.query('UPDATE clientes SET nombre=?,buyer=?,foldernum=? WHERE telefono=?',[nombre,buyer,foldernum,telefono],
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
    
    
    
    db.query('DELETE FROM clientes WHERE telefono=?',[telefono],
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