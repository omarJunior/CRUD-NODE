const { response } = require("express");
const dbConnect = require("../bd/config");
const { generarJWT } = require("../helpers/generar-jwt");
const bcryptjs = require("bcryptjs");

const login = async(req, res = response)=>{

    const { correo, password } = req.body;

    try {
        //Verificar si existe el correo en la base de datos
        dbConnect.query("SELECT * FROM employees WHERE email=?", correo, async function(error, data){
            if(error){
                throw new Error(error);
            }else{
                if(data.length > 0){
                     // Verificar la contraseña
                    const datoEmpleado = data[0];
                     // Verificar la contraseña
                    const validPassword = bcryptjs.compareSync( password, datoEmpleado.password );
                    if ( !validPassword ) {
                        return res.status(400).json({
                            msg: 'Usuario / Password no son correctos - password'
                        });
                    }

                    const token = await generarJWT( datoEmpleado.id );
                    res.status(200).json({
                        msg: 'Login Hecho',
                        dato: datoEmpleado,
                        token
                    })
                }else{
                    return res.status(400).json({
                        msg: 'Usuario / Password no son correctos - correo'
                    });
                }
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}

module.exports = {
    login
};