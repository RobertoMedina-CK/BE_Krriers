import { Router } from "express";
import { db } from "./libs/db.js";

const router = Router();

router.post("/webhook", (req, res) => console.log(req.body));

router.post("/create", (req, res) => {
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

router.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/update", (req, res) => {
  const telefono = req.body.telefono;
  const nombre = req.body.nombre;
  const buyer = req.body.buyer;
  const foldernum = req.body.foldernum;

  db.query(
    "UPDATE clientes SET nombre=?,buyer=?,foldernum=? WHERE telefono=?",
    [nombre, buyer, foldernum, telefono],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.delete("/delete/:telefono", (req, res) => {
  const telefono = req.params.telefono;

  db.query(
    "DELETE FROM clientes WHERE telefono=?",
    [telefono],
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
