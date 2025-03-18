'use strict';

const bcrypt = require('bcrypt')
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    
    static associate(models) {
      Cliente.hasMany(models.Alquiler, { foreignKey: 'clienteId' });
    }
  }
  Cliente.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false},

    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    numLic:{
      type: DataTypes.STRING,
      allowNull: false},

    password:{
      type: DataTypes.STRING,
      allowNull: false},
  }, 
  {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes'
  }
)
  return Cliente;
};