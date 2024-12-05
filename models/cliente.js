'use strict';

const bcrypt = require('bcrypt')
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    tableName: 'clientes',
    hooks:{
      beforeCreate: async (cliente)=>{
        if (cliente.password){
          const salt = await bcrypt.genSalt(10);
          cliente.password = await bcrypt.hash(cliente.password, salt);
        }
    },
    beforeUpdate: async (cliente) =>{
      if (cliente.password && cliente.changed('password')){
        const salt = await bcrypt.genSalt(10);
        cliente.password = await bcrypt.hash(cliente.password, salt);
      }
    }
  },
}
);
  return Cliente;
};