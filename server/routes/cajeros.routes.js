import express from "express";

const router = express.Router();

router.get("/cajeros", (req, res) => {
  db.query("SELECT * FROM cajeros", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.delete("/cajeros/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM cajeros WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/cajeros", (req, res) => {
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

router.post("/cajeros", (req, res) => {
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

export default router;
