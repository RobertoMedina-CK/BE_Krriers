import { Router } from "express";
import { db } from "../libs/db.js";

export const router = Router();

router.post("/cajerosauth", (req, res) => {
  const nombre = req.body.nombre;
  const password = req.body.password;

  db.query(
    `SELECT * FROM cajeros WHERE nombre=? AND password=?`,
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
