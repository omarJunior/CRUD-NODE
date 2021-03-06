const { response } = require("express");
const dbConnect = require("../bd/config");
const bcryptjs = require("bcryptjs");

const getRegistro = async(req, res = response)=>{
    await dbConnect.query("SELECT * FROM employees", function(err, data){
        if(err){
            throw new Error(err);
        }else{
            res.json({
                msg: "Get registros",
                data
            })
        }
    });
}

const insertarRegistros = async(req, res = response)=>{
    const { first_name, last_name, email, password, phone, organization, designation, salary, status, created_at } = req.body;
    try{
        await dbConnect.query("SELECT * FROM employees WHERE email=? ", email, async function(err, data){
            if(err){
                throw new Error(err);
            }else{
                if(data.length > 0){
                    return res.status(400).json({
                        msg: "No puede crear el usuario con un email que ya existe"
                    })
                }
                const salt = bcryptjs.genSaltSync();
                let passwordEncriptada = bcryptjs.hashSync(password, salt);
                const insertEmploye = {
                    first_name, 
                    last_name, 
                    email, 
                    password : passwordEncriptada, 
                    phone, 
                    organization, 
                    designation, 
                    salary, 
                    status, 
                    created_at
                }
                await dbConnect.query("INSERT INTO employees set ?", [insertEmploye], function(err, data){
                    if(err){
                        throw new Error(err);
                    }else{
                        if(data.affectedRows > 0){
                            res.status(200).json({
                                msg: "Datos creados",
                                insertEmploye
                            })
                        }
                    }
                });
    
    
                }   //end else
            })

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Habla con el administrador, ha ocurrido un error"
        })
    }
    
    
}   

const obtenerUsuariosById = async(req, res = response) =>{
    const id = req.params.id;
    try {
        await dbConnect.query("SELECT * FROM employees WHERE id=? ", id, function(err, data){
            if(err){
                throw new Error(err);
            }else{
                res.status(200).json({
                    data: data ? data : []
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const actualizarDatos = async(req, res = response)=>{
    const id = req.params.id;
    const { first_name, last_name, email, phone, organization, designation, salary, status, created_at } = req.body;
    const newUpdate = {
        first_name, 
        last_name, 
        email, 
        phone, 
        organization, 
        designation, 
        salary, 
        status, 
        created_at
    };
    try {
        await dbConnect.query("UPDATE employees SET ? WHERE id=? ", [newUpdate, id], function(err, data){
            if(err){
                throw new Error(err);
            }else{
                if(data.affectedRows > 0){
                    return res.status(200).json({
                        msg: "Datos actualizados correctamente",
                        newUpdate
                    })
                }
                res.status(400).json({
                    msg : "No hay datos con ese id: " + id
                })
                
            }
        });
    } catch (error) {
        console.log(error);
    }

}

const deleteUsuarios = async(req, res = response)=>{

    const id = req.params.id;
    try {
        await dbConnect.query("DELETE FROM employees WHERE id=?", id, function(err, data){
            if(err){
                throw new Error(err);
            }else{
                if(data.affectedRows === 0){
                    return res.json({
                        msg : `No hay datos con el Id ${id}`
                    });
                }else{
                    return res.status(200).json({
                        msg : "Registro borrado de la base de datos"
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getRegistro,
    insertarRegistros,
    obtenerUsuariosById,
    actualizarDatos,
    deleteUsuarios
}