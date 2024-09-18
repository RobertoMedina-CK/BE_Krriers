import { Router } from "express";
const router = Router();

router.get("/caja", (req, res) => {
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

router.get("/cajafinalizados", (req, res) => {
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

router.get("/cajareporte", (req, res) => {
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

router.put("/caja", (req, res) => {
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

export default router;
