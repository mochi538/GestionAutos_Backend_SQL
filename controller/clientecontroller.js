const bcrypt = require("bcrypt");
const { Cliente } = require("../models");
const jwt = require('jsonwebtoken');

//login
exports.loginCliente = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const cliente = await Cliente.findOne({ where: { correo } });
    if (!cliente) {
      return res.status(404).json({ mjs: "Cliente no encontrado" });
    }
    const passwordValido = await bcrypt.compare(password, cliente.password);

    if (!passwordValido) {
      return res.status(401).json({ mjs: "Contraseña incorrecta", password });
    }
    const token = jwt.sign(
      { id: cliente.id, correo: cliente.correo }, // Payload del token
      process.env.JWT_SECRET, // Asegúrate de tener una clave secreta en el .env
      { expiresIn: '1h' } // El token expirará en 1 hora
    );
    return res.status(200).json({ msg: "Autenticación exitosa" });
  } catch (error) {
    console.error("Error al iniciara sesion:", error);
    res
      .status(500)
      .json({ msj: "Error al iniciar sesion", error: error.message });
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
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    res
      .status(500)
      .json({ mensaje: "Error al crear el cliente", error: error.message });
  }
};

exports.verClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      attributes:['id','nombre','correo','numLi','createdAt', 'updatedAt']
    });
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener los clientes", error: error.message });
  }
};
