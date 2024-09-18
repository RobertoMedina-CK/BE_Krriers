import express from "express";

const router = express.Router();

router.delete("/clientes/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM clientes WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/clientes", (req, res) => {
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

router.post("/clientes", (req, res) => {
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

export default router;
