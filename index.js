const express = require('express');
const app = express();
require("dotenv").config();

const cors = require('cors');
app.use(cors({
  origin: '*', // Permite solicitudes desde cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
