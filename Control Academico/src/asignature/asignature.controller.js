'use strict'

import jwt from 'jsonwebtoken'
import Asignature from './asignature.model.js'
import { checkUpdate } from '../utils/validator.js'

export const newAsignature = async(req, res)=>{
    try{

        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        //obtener el token de los headers
        let { authorization } = req.headers
   
        let { username } = jwt.verify(authorization, secretKey)
       //Capturar el formulario (body)
       let data = req.body
       data.username = username
       //Guardar la informacion de la BD
       let asignature = new Asignature(data)
       await asignature.save()
       //Responder al usuario
       return res.send({message: `Creada con éxito`})
       }catch(err){
           console.error(err)
           return res.status(500).send({message: 'Error, no se pudo crear la asignatura', err: err.errors})
       }
}


export const updateAsignature = async(req, res) => {
    try {
        // ID de la publicacion a actualizar
        let { id } = req.params;
        // Obtener los datos a actualizar
                //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        //obtener el token de los headers
        let { authorization } = req.headers
        //Obtener el uid del usuario que envió el token
        let { username } = jwt.verify(authorization, secretKey)
        const asignatura = await Asignature.findById(id);
                                    // if para verificar que el id es el mismo que el del token y que deje actualizar
        if(asignatura.username == username){
        // simon
        let data = req.body;
        // Validar si los datos traen información
        let update = checkUpdate(data, id);
        if (!update) return res.status(400).send({ message: 'Se han enviado datos que no se pueden actualizar o faltan datos' });

        // Validar permisos (tokenización) *hoy no se ve*

        // Actualizar en la base de datos
        let updateAsignatura = await Asignature.findOneAndUpdate(
            { _id: id }, // ObjectID <- hexadecimal (Hora del sistema, versión de MongoDB, Clave privada)
            data, // Datos que se van a actualizar
            { new: true } // Objeto de la BD ya actualizado
        );

        // Validar la actualización
        if (!updateAsignatura) return res.status(401).send({ message: 'No actualizado' });
       
        // Responder al usuario
        return res.send({ message: 'Actualización exitosa', updateAsignatura });
    } else {
        return res.status(400).send({ message: 'No se pudo actualizar ya que no es tu Asignatura.' })
    }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error actualizando la Asignatura' });
    }
}

export const deleteAsignature = async(req, res) => {
    try{
        // ID de la publicacion a actualizar
        let { id } = req.params;
        // Obtener los datos a actualizar
                //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        //obtener el token de los headers
        let { authorization } = req.headers
        //Obtener el uid del usuario que envió el token
        let { username } = jwt.verify(authorization, secretKey)
        const asignatura = await Asignature.findById(id);
                                    // if para verificar que el id es el mismo que el del token y que deje actualizar
        if(asignatura.username == username){
        // Eliminar (deleteOne / findOneAndDelete)
        let deletedAsignatura = await Asignature.findOneAndDelete({_id: id})
        // Verificar que se elimino
        if(!deletedAsignatura) return res.status(404).send({message: 'La asignatura no fue encontrada'})
        // Responder
        return res.send({message: `La Asignatura ${deletedAsignatura.name} fue borrada exitosamente`})
    } else {
        return res.status(400).send({ message: 'No se pudo borrar ya que no es tu asignatura.' })
    }
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al intentar borrar.'})
    }
}


    export const getMyAsignatures = async(req, res)=>{
        try{
            
         // Obtener los datos a actualizar
                 //Obtener la llave de acceso al token
         let secretKey = process.env.SECRET_KEY
         //obtener el token de los headers
         let { authorization } = req.headers
         //Obtener el uid del usuario que envió el token
         let { username } = jwt.verify(authorization, secretKey)
            //Buscar
            let asignatures = await Asignature.find(
                {username: username}
            )
            //Validar la respuesta
            if(!asignatures) return res.status(404).send({message: 'Asignatuea no encontrada'})
            //Responder si todo sale bien
            return res.send({message: 'Asignaturas encontradas', asignatures})
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'Error al buscar'})
        }
    }