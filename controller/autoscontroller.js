const { Autos } = require('../models');

const {Op} = require('sequelize');

exports.autosDisponibles = async (req, res) => {
    try {
        const autos = await Autos.findAll({ 
            where: { disponibilidad: {[Op.gt]:0} } 
        });
        res.json(autos);
    } catch (e) {
        console.error("Error desde autosDisponibles",e)
        res.json({ mensaje: "error", e });
    }
};

exports.registrarAuto = async (req, res) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    const { marca, modelo, imagen, valorAlquiler, year, disponibilidad } = req.body; 
    try {
        const datosAuto = { marca, modelo, imagen, valorAlquiler, year };
        if (disponibilidad !== undefined) {
            autoData.disponibilidad = disponibilidad;
        }

        const nuevoAuto = await Autos.create(datosAuto);
        res.json(nuevoAuto);

    } catch (e) {
        console.error('Error al crear el auto:', e); 
        res.status(500).json({ mensaje: "Error desde resgistrarAutos", error: e.message });
    }
};
exports.actualizarAuto = async (req, res) => {
    const {id} = req.params;
    const {marca, modelo, imagen , valorAlquiler, year, disponibilidad} = req.body;
    
    try{
        const Actualizar = await Autos.update(
            {marca, modelo, imagen, valorAlquiler, year, disponibilidad},
            {where:{id}}
        );
        if(Actualizar[0]===0){
            return res.status(404).json({mjs:"Auto no encontrado"})
        }
        res.json({mjs:"Auto actualizado correctamente"})
    }
    catch(e){
        console.error('Error al actualizar Auto', e);
        res.status(500).json({mjs:"Error desde actualizarAuto",e})
    }
}

exports.eliminarAuto = async(req,res) =>{
    const {id} = req.params;
    try{
        const Eliminar = await Autos.destroy({where :{id}})
        
        if(Eliminar ===0){
            return res.status(404).json({mjs:'Auto no encontrado'})
        }
        res.json({mjs:"Auto eliminado correctamente"});

    }catch(e){
        console.error('Error al eliminar auto',e)
        res.status(500).json({mjs:"Error desde eliminarAuto"})
    }
}
