import { Router } from "express";

const router = Router();

router.delete("/autos/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM autos WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/autos", (req, res) => {
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

router.get("/autos", (req, res) => {
  db.query("SELECT * FROM autos", (err, result) => {
    if (err) {
      console.log(err);
      9;
    } else {
      res.send(result);
    }
  });
});

router.post("/autos", (req, res) => {
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

router.get("/anioautos", (req, res) => {
  db.query("SELECT DISTINCT anio FROM autos", (err, result) => {
    if (err) {
      console.log(err);
      9;
    } else {
      res.send(result);
    }
  });
});
router.get("/marcaautos", (req, res) => {
  db.query("SELECT DISTINCT marca FROM autos", (err, result) => {
    if (err) {
      console.log(err);
      9;
    } else {
      res.send(result);
    }
  });
});

router.get("/modeloautos/:marca", (req, res) => {
  const marca = req.params.marca;
  db.query(
    "SELECT DISTINCT modelo FROM autos WHERE marca=?",
    [marca],
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
