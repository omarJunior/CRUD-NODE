const { response } = require("express");
const dbConnect = require("../bd/config");

const getRegistro = (req, res = response)=>{
    res.json({
        msg : "Get registros"
    })
}

const insertarRegistros = async(req, res = response)=>{
    try{
        let insertar = await dbConnect.query("INSERT INTO employees set ?", [req.body]);
        const data = insertar.values[0];
        res.status(200).json({
            msg : "Datos creados",
            data
        })
    
    }catch(e){
        console.log(e);
        res.status(400).json({
            msg : "Ha ocurrido un error"
        })
    }
    
}   

module.exports = {
    getRegistro,
    insertarRegistros
}