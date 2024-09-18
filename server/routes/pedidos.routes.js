import { Router } from "express";
import { db } from "../libs/db.js";
import { sendWA } from "../libs/whatsapp.js";

const router = Router();

router.get("/pedidos", (req, res) => {
  db.query("SELECT * FROM pedidos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/pedidosabc", (req, res) => {
  db.query("SELECT * FROM pedidos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/pedidosabc", (req, res) => {
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

router.delete("/pedidosabc/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM pedidos WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/pedidosabc", (req, res) => {
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

router.put("/asigna", async (req, res) => {
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

router.get("/asigna", (req, res) => {
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

router.get("/llegada", (req, res) => {
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

router.get("/reppedsinasignar", (req, res) => {
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

router.put("/llegada", (req, res) => {
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

router.put("/cierrepedido", async (req, res) => {
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

router.get("/asignacompletado", (req, res) => {
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

export default router;
