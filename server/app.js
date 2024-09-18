import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import auth from "./routes/auth.routes.js";
import files from "./routes/files.routes.js";
import transportistas from "./routes/transportistas.routes.js";
import pedidos from "./routes/pedidos.routes.js";
import subastas from "./routes/subastas.routes.js";
import autos from "./routes/subastas.routes.js";
import clientes from "./routes/clientes.routes.js";
import caja from "./routes/caja.routes.js";
import cajeros from "./routes/cajeros.routes.js";
import webhook from "./routes/webhook.routes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads/",
  })
);

// Routes
app.use(auth);
app.use(files);
app.use(transportistas);
app.use(pedidos);
app.use(subastas);
app.use(autos);
app.use(clientes);
app.use(cajeros);
app.use(caja);
app.use(webhook);

// Static files
app.use(express.static("images"));

export default app;
