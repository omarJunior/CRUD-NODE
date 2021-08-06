const { response } = require("express");

const login = (req, res = response)=>{
    res.json({
        msg : "Hola login XDD"
    })
}

module.exports = {
    login
};