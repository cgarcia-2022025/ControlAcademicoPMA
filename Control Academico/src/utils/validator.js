//Validar diferentes datos.
'use strict'

import { hash, compare } from 'bcrypt'

//Encriptar la contraseña
export const encrypt = (password)=>{
    try{
        return hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}

//Validar la contraseña
export const checkPassword = async(password, hash)=>{
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err);
        return err
    }
}


export const checkUpdateStudent = (data, userId)=>{
    if(userId){
        if(
            Object.entries(data).length === 0 ||
            data.role ||
            data.role == ''
        ) {
            return false
        }
        return true
    }
}

export const checkUpdate = (data, userId)=>{
    if(userId){
        if(
            Object.entries(data).length === 0 ||
            data.username ||
            data.username == '' 
            
        ){
            return false
        }
        return true
    }else{
        return false
    }
}




