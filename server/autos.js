import { Router } from "express";
const router = Router();

router.post("/webhook", (req, res) => console.log(req.body));

router.post("/create", (req, res) => {
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const anio = req.body.anio;
  const fee = req.body.fee;

  db.query(
    "INSERT INTO autos(marca,modelo,anio,fee) VALUES (?,?,?,?)",
    [marca, modelo, anio, fee],
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
    } else {
      res.send(result);
    }
  });
});

router.put("/update", (req, res) => {
  const id = req.body.id;
  const marca = req.body.marca;
  const modelo = req.body.modelo;
  const anio = req.body.anio;
  const fee = req.body.fee;

  db.query(
    "UPDATE autos SET marca=?,modelo=?,anio=?,fee=? WHERE id=?",
    [marca, modelo, anio, fee, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM autos WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

export default router;

