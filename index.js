const express = require('express');
const app = express();
require("dotenv").config();

const alquilerR = require("./routes/alquilerroutes");
const autosR = require("./routes/autosroutes");
const clientesR = require("./routes/clienteroutes");

const PORT = process.env.PORT || 6000;

app.use(express.json());


app.use("/api/alquiler", alquilerR);
app.use("/api/autos", autosR);
app.use("/api/clientes", clientesR);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
