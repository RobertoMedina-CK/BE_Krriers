import { Router } from "express";
const router = Router();

router.post("/webhook", (req, res) => console.log(req.body));

router.post("/create", (req, res) => {
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

router.get("/subastas", (req, res) => {
  db.query("SELECT * FROM subastas", (err, result) => {
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
  const direccion = req.body.direccion;
  const subasta = req.body.subasta;
  const precio = req.body.precio;

  db.query(
    "UPDATE subastas SET nombre=?,direccion=?,subasta=?,precio=? WHERE telefono=?",
    [nombre, direccion, subasta, precio, telefono],
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
    "DELETE FROM subastas WHERE telefono=?",
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
