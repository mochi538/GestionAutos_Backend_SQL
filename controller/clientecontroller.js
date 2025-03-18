const { Cliente } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

exports.loginCliente = async (req, res) => {
  try {
    const { correo, password } = req.body;
    
    // Buscar el cliente en la base de datos
    const cliente = await Cliente.findOne({ where: { correo } });

    if (!cliente) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }

    // Validar la contraseña
    const passwordValido = await bcrypt.compare(password, cliente.password);
    console.log(`Tipo de password ingresado: ${typeof password}`);
    console.log(`Resultado bcrypt.compare: ${passwordValido}`);

    if (!passwordValido) {
      console.log("Password:", cliente.password);
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    // Generar el token
    const token = jwt.sign(
      { id: cliente.id, correo: cliente.correo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      msg: "Autenticación exitosa",
      token,
      cliente: {
        id: cliente.id,
        nombre: cliente.nombre,
        correo: cliente.correo,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

////////////////////////////
exports.registrarCliente = async (req, res) => {
  try {
    const { nombre, correo, numLic, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const existe = await Cliente.findOne({where:{correo}});
    if(existe){
      return res.status(400).json({error:'Usuario existente'})
    }

    const nuevoCliente = await Cliente.create({
      nombre,
      correo,
      numLic,
      password: hashedPassword,
    });
    res.status(201).json(nuevoCliente);
    console.log(`Contraseña: ${nuevoCliente.password}`)
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    res
      .status(500)
      .json({ mensaje: "Error al crear el cliente", error: error.message });
  }
};

exports.actualizarPassword = async(req, res)=> {
  const nuevoHash = await bcrypt.hash("nueva_contraseña", 10);

  await Cliente.update(
    { password: nuevoHash },
    { where: { correo: "prueba@gmail.com" } }
  );

  console.log("Contraseña actualizada correctamente");
}

exports.verClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      attributes:['id','nombre','correo','numLic','createdAt', 'updatedAt']
    });
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener los clientes", error: error.message });
  }
};
