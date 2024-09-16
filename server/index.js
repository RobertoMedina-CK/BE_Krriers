'use strict'

import express from "express";
// import app from express();
//const mysql = require("mysql2");
import cors from "cors";
import axios from "axios";
import { db, spacesDO } from "./config.js";
import aws from 'aws-sdk';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload'
import { uploadFile, getFiles, getFile, downloadFile, getFileURL } from './s3.js'

const app = express()

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(fileUpload())

// const spaces = new aws.S3({
//   endpoint: new aws.Endpoint(spacesDO.url),
//   accessKeyId: spacesDO.accessKeyId,
//   secretAccessKey: spacesDO.secretAccessKey
// })


app.get('/files', async (req, res) => {
  const result = await getFiles()
  res.json(result.Contents)
})

app.get('/files/:fileName', async (req, res) => {
  const result = await getFileURL(req.params.fileName)
  res.json({
    url: result
  })
})

app.get('/downloadfile/:fileName', async (req, res) => {
  await downloadFile(req.params.fileName)
  res.json({ message: "archivo descargado" })
})


app.post('/files', async (req, res) => {
  console.log(req.files)
  const result = await uploadFile(req.files.file)
  res.json({ result })
})

app.use(express.static('images'))

// const db = mysql.createConnection({
//     host: "riderarmour-do-user-17269276-0.e.db.ondigitalocean.com",
//     user: "doadmin",
//     password: "AVNS_BlosgjkTIrb16Qnd1lh",
//     database:"krriers",
//     port:25060,
//     ssl:{rejectUnauthorized:false}

// });
// db.connect((err)=>{
//    if (err) {console.error("Error de Conexion", err); return}
//    console.log("Conectado a la base de datos");
// })

app.post("/webhook", (req, res) => {
  const url = "https://hook.us1.make.com/g3f3chvgvhv0ali6g6jp68am5tuu7p8a";
  const texto = {
    username: "Webhook",
    avatar_url: "https://i.imgur.com/4M34hi2.png",
    content: "Text message. Up to 2000 characters.",
  };
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(texto),
  }).then((response) => {
    console.log(response);
  });
});

app.post("/autos", (req, res) => {
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const anio = req.body.anio;
  const fee = req.body.fee;
  const tipo = req.body.tipo;

  db.query(
    "INSERT INTO autos(marca,modelo,anio,fee,tipo) VALUES (?,?,?,?,?)",
    [marca, modelo, anio, fee, tipo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/cajeros", (req, res) => {
  const nombre = req.body.nombre;
  const password = req.body.password;

  db.query(
    "INSERT INTO cajeros(nombre,password) VALUES (?,?)",
    [nombre, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/clientes", (req, res) => {
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const buyer = req.body.buyer;
  const foldernum = req.body.foldernum;

  db.query(
    "INSERT INTO clientes(telefono,nombre,buyer,foldernum) VALUES (?,?,?,?)",
    [telefono, nombre, buyer, foldernum],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/subastas", (req, res) => {
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const direcion = req.body.direccion;
  const subasta = req.body.subasta;
  const precio = req.body.precio;

  db.query(
    "INSERT INTO subastas(telefono,nombre,direccion,subasta,precio) VALUES (?,?,?,?,?)",
    [telefono, nombre, direcion, subasta, precio],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/transportistas", (req, res) => {
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const dot = req.body.dot;
  const margen = req.body.margen;

  db.query(
    "INSERT INTO transportistas(telefono,nombre,dot,margen) VALUES (?,?,?,?)",
    [telefono, nombre, dot, margen],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/pedidosabc", (req, res) => {
  const id = req.body.id;
  const lot = req.body.lot;
  const fees = req.body.fees;
  const notas = req.body.notas;
  const titulo = req.body.titulo;
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const buyer = req.body.buyer;
  const pin = req.body.pin;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const anio = req.body.anio;
  const subasta = req.body.subasta;
  const direccion = req.body.direccion;
  const fecha = req.body.fecha;
  const color = req.body.color;
  const precio = req.body.precio;
  const fechafinal = req.body.fechafinal;
  const deposito = req.body.deposito;
  const fechallegada = req.body.fechallegada;
  const feescarrier = req.body.feescarrier;
  const fechaasignacarrier = req.body.fechaasignacarrier;
  const nombrecarrier = req.body.nombrecarrier;
  const preciofinal = req.body.preciofinal;
  const storage = req.body.storage;
  const estado = req.body.estado;

  db.query(
    "INSERT INTO pedidos(lot,nombre,telefono,buyer,pin,precio,anio,marca,modelo,deposito,subasta,fecha,direccion,color,notas,estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      lot,
      nombre,
      telefono,
      buyer,
      pin,
      precio,
      anio,
      marca,
      modelo,
      deposito,
      subasta,
      fecha,
      direccion,
      color,
      notas,
      estado,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/whatsappFile', (req, res) => {
  const body = req.body

  const params = {
    Bucket: spacesDO.spaceName,
    Key: body.fileName,
    Expires: 60 * 3, // Expires in 3 minutes
    ContentType: body.fileType,
    ACL: 'public-read', // Remove this to make the file private
  }

  const signedUrl = spaces.getSignedUrl('putObject', params)

  res.json({ signedUrl })
})


app.get("/autos", (req, res) => {
  db.query("SELECT * FROM autos", (err, result) => {
    if (err) {
      console.log(err);
      9;
    } else {
      res.send(result);
    }
  });
});

app.get("/anioautos", (req, res) => {
  db.query("SELECT DISTINCT anio FROM autos", (err, result) => {
    if (err) {
      console.log(err);
      9;
    } else {
      res.send(result);
    }
  });
});
app.get("/marcaautos", (req, res) => {
  db.query("SELECT DISTINCT marca FROM autos", (err, result) => {
    if (err) {
      console.log(err);
      9;
    } else {
      res.send(result);
    }
  });
});

app.get("/modeloautos/:marca", (req, res) => {
  const marca = req.params.marca
  db.query('SELECT DISTINCT modelo FROM autos WHERE marca=?', [marca],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/asigna", (req, res) => {
  db.query(
    "SELECT * FROM pedidos WHERE nombrecarrier IS NULL",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/asignacompletado", (req, res) => {
  db.query(
    `SELECT * FROM pedidos WHERE nombrecarrier IS NOT NULL and pagadocarrier = 'N'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/llegada", (req, res) => {
  db.query(
    `SELECT * FROM pedidos WHERE fechafinal IS NULL or fechafinal = ''`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/caja", (req, res) => {
  db.query(
    `SELECT * FROM pedidos WHERE fechafinal IS NULL or fechafinal=''`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.get("/cajafinalizados", (req, res) => {
  db.query(
    `SELECT * FROM pedidos WHERE fechafinal IS NOT NULL`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/cajareporte", (req, res) => {
  db.query(`SELECT * FROM pedidos WHERE fechafinal IS NULL or fechafinal=''`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  }
  );
});

app.get("/reppedsinasignar", (req, res) => {
  db.query(
    `SELECT * FROM pedidos WHERE fechaasignacarrier IS NULL`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/cajeros", (req, res) => {
  db.query("SELECT * FROM cajeros", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/cajerosauth", (req, res) => {
  const nombre = req.body.nombre;
  const password = req.body.password;

  db.query(`SELECT * FROM cajeros WHERE nombre=? AND password=?`, [nombre, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/subastas", (req, res) => {
  db.query("SELECT * FROM subastas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/subastaspedidos", (req, res) => {
  db.query("SELECT DISTINCT subasta FROM subastas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/direccionpedidos", (req, res) => {
  db.query("SELECT DISTINCT direccion FROM subastas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/transportistas", (req, res) => {
  db.query("SELECT * FROM transportistas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/pedidos", (req, res) => {
  db.query("SELECT * FROM pedidos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/pedidosabc", (req, res) => {
  db.query("SELECT * FROM pedidos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/pedidosabc", (req, res) => {
  const id = req.body.id;
  const lot = req.body.lot;
  const fees = req.body.fees;
  const notas = req.body.notas;
  const titulo = req.body.titulo;
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const buyer = req.body.buyer;
  const pin = req.body.pin;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const anio = req.body.anio;
  const subasta = req.body.subasta;
  const direccion = req.body.direccion;
  const fecha = req.body.fecha;
  const color = req.body.color;
  const precio = req.body.precio;
  const fechafinal = req.body.fechafinal;
  const deposito = req.body.deposito;
  const fechallegada = req.body.fechallegada;
  const feescarrier = req.body.feescarrier;
  const fechaasignacarrier = req.body.fechaasignacarrier;
  const nombrecarrier = req.body.nombrecarrier;
  const preciofinal = req.body.preciofinal;
  const storage = req.body.storage;
  const estado = req.body.estado;

  db.query(
    "UPDATE pedidos SET lot=?,nombre=?,telefono=?,buyer=?,pin=?,precio=?,anio=?,marca=?,modelo=?,deposito=?,subasta=?,fecha=?,direccion=?,color=?,notas=?,estado=? WHERE id=?",
    [
      lot,
      nombre,
      telefono,
      buyer,
      pin,
      precio,
      anio,
      marca,
      modelo,
      deposito,
      subasta,
      fecha,
      direccion,
      color,
      notas,
      estado,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/autos", (req, res) => {
  const id = req.body.id;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const anio = req.body.anio;
  const fee = req.body.fee;
  const tipo = req.body.tipo;

  db.query(
    "UPDATE autos SET marca=?,modelo=?,anio=?,fee=?,tipo=? WHERE id=?",
    [marca, modelo, anio, fee, tipo, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/llegada", (req, res) => {
  const id = req.body.id;
  const lot = req.body.lot;
  const fees = req.body.fees;
  const notas = req.body.notas;
  const titulo = req.body.titulo;
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const buyer = req.body.buyer;
  const pin = req.body.pin;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const anio = req.body.anio;
  const subasta = req.body.subasta;
  const direccion = req.body.direccion;
  const fecha = req.body.fecha;
  const precio = req.body.precio;
  const fechafinal = req.body.fechafinal;
  const deposito = req.body.deposito;
  const fechallegada = req.body.fechallegada;
  const feescarrier = req.body.feescarrier;
  const fechaasignacarrier = req.body.fechaasignacarrier;
  const nombrecarrier = req.body.nombrecarrier;

  db.query(
    "UPDATE pedidos SET fees=?,titulo=?,notas=?,feescarrier=?,fechallegada=? WHERE id=?",
    [fees, titulo, notas, feescarrier, fechallegada, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/caja", (req, res) => {
  const id = req.body.id;
  const lot = req.body.lot;
  const fees = req.body.fees;
  const notas = req.body.notas;
  const titulo = req.body.titulo;
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const buyer = req.body.buyer;
  const pin = req.body.pin;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const anio = req.body.anio;
  const subasta = req.body.subasta;
  const direccion = req.body.direccion;
  const fecha = req.body.fecha;
  const precio = req.body.precio;
  const fechafinal = req.body.fechafinal;
  const deposito = req.body.deposito;
  const fechallegada = req.body.fechallegada;
  const feescarrier = req.body.feescarrier;
  const fechaasignacarrier = req.body.fechaasignacarrier;
  const nombrecarrier = req.body.nombrecarrier;
  const preciofinal = req.body.preciofinal;
  const storage = req.body.storage;
  const cajero = req.body.cajero;

  db.query(
    "UPDATE pedidos SET precio=?,fees=?,deposito=?,storage=?,preciofinal=?,fechafinal=?,cajero=? WHERE id=?",
    [precio, fees, deposito, storage, preciofinal, fechafinal, cajero, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/cierrepedido", async (req, res) => {
  const pagadocarrier = req.body.pagadocarrier;
  const subastaList = req.body.filteredAsigna;

  try {
    subastaList.forEach((val) => {
      db.query("UPDATE pedidos SET pagadocarrier=? WHERE id=?", [
        pagadocarrier,
        val.id,
      ]);
    });
    res.send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error,
    });
  }
});

const sendWA = async () => {
  const options = {
    method: "POST",
    url: "https://api.whatsender.io/v1/messages",
    headers: {
      "Content-Type": "application/json",
      Token:
        "a5f3e31e292ca94e753f059f929978004755682e6836caf9bfa941488bef8a2bd3b0fb6abfefd67c",
    },
    data: {
      phone: "+19566009878",
      media: { file: "66bfd8970ce2677ac2275dee" },
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

app.put("/asigna", async (req, res) => {
  //const id = req.body.id;
  const fechaasignacarrier = req.body.fechaasignacarrier;
  const nombrecarrier = req.body.nombrecarrier;
  const subastaList = req.body.subastaList;

  try {
    subastaList.forEach((val) => {
      db.query(
        "UPDATE pedidos SET fechaasignacarrier=?,nombrecarrier=?,pagocarrier=? WHERE id=?",
        [fechaasignacarrier, nombrecarrier, val.pagocarrier, val.id]
      );
    });
    sendWA();
    res.send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error,
    });
  }
});

app.put("/clientes", (req, res) => {
  const id = req.body.id;
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const buyer = req.body.buyer;
  const foldernum = req.body.foldernum;

  db.query(
    "UPDATE clientes SET telefono=?,nombre=?,buyer=?,foldernum=? WHERE id=?",
    [telefono, nombre, buyer, foldernum, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/cajeros", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const password = req.body.password;

  db.query(
    "UPDATE cajeros SET nombre=?,password=? WHERE id=?",
    [nombre, password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/subastas", (req, res) => {
  const id = req.body.id;
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const direccion = req.body.direccion;
  const subasta = req.body.subasta;
  const precio = req.body.precio;

  db.query(
    "UPDATE subastas SET telefono=?,nombre=?,direccion=?,subasta=?,precio=? WHERE id=?",
    [telefono, nombre, direccion, subasta, precio, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/transportistas", (req, res) => {
  const id = req.body.id;
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const dot = req.body.dot;
  const margen = req.body.margen;

  db.query(
    "UPDATE transportistas SET telefono=?,nombre=?,dot=?,margen=? WHERE id=?",
    [telefono, nombre, dot, margen, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/pedidosabc/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM pedidos WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/autos/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM autos WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/cajeros/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM cajeros WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/clientes/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM clientes WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/subastas/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM subastas WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/transportistas/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM transportistas WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log("Corriendo Digital Ocean");
});
