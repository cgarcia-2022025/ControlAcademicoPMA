'use strict'

import jwt from 'jsonwebtoken'
import Asignation from './asignation.model.js'



export const newAsignation = async(req, res)=>{
    try{

     //Obtener la llave de acceso al token
     let secretKey = process.env.SECRET_KEY
     //obtener el token de los headers
     let { authorization } = req.headers

     let { username } = jwt.verify(authorization, secretKey)

    //Capturar el formulario (body)
    let data = req.body
    data.username = username

            // Verifica que el usuario ya este asignado a la clase
            let yaAsignado = await Asignation.findOne({
                asignature: data.asignature,
                username: data.username,
            });
    
            if (yaAsignado) {
                return res.status(400).send({ message: 'Usuario ya asignado a esta clase' });
            }


                    // Revisa el numero de cursos a los que esta asignado el alumno
        let assignedCoursesCount = await Asignation.countDocuments({
            username: data.username,
        });

        if (assignedCoursesCount >= 3) {
            return res.status(400).send({ message: 'Usuario ya asignado a tres cursos' });
        }

    //Guardar la informacion de la BD
    let asignation = new Asignation(data)
    await asignation.save()
    //Responder al usuario
    return res.send({message: `Asignado con éxito`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error, no se pudo Asignar', err: err.errors})
    }
}

export const getMyCourses = async(req, res)=>{
    try{
        
     // Obtener los datos a actualizar
             //Obtener la llave de acceso al token
     let secretKey = process.env.SECRET_KEY
     //obtener el token de los headers
     let { authorization } = req.headers
     //Obtener el uid del usuario que envió el token
     let { username } = jwt.verify(authorization, secretKey)
        //Buscar
        let asignation = await Asignation.find(
            {username: username}
        ).populate({path: 'asignature',select: 'name', });
        //Validar la respuesta
        if(!asignation) return res.status(404).send({message: 'Asignaturas no encontrada'})
        //Responder si todo sale bien
        return res.send({message: 'Asignaturas encontradas', asignation})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al buscar'})
    }
}