import { Router } from "express";
const router = Router();

router.get("/subastas", (req, res) => {
  db.query("SELECT * FROM subastas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/subastaspedidos", (req, res) => {
  db.query("SELECT DISTINCT subasta FROM subastas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/subastas", (req, res) => {
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

router.delete("/subastas/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM subastas WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/subastas", (req, res) => {
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

router.get("/direccionpedidos", (req, res) => {
  db.query("SELECT DISTINCT direccion FROM subastas", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

export default router;
