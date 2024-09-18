import { Router } from "express";
import { db } from "../libs/db.js";

const router = Router();

router.delete("/transportistas/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM transportistas WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/transportistas", (req, res) => {
  db.query("SELECT * FROM transportistas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/transportistas", (req, res) => {
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

router.put("/transportistas", (req, res) => {
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

export default router;
