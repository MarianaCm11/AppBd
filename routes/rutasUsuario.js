var rutas = require("express").Router();
var {mostrarUsuarios,nuevoUsu,borrarUsuario,buscarPorId}= require("../bd/usuariosBD");

//USUARIOS
rutas.get("/usuarios",async(req, res)=>{
   // res.send("Hola estas en raíz");
   var usuariosValidos=await mostrarUsuarios();
   //console.log(usuariosVal);
   res.json(usuariosValidos); // json es un formato de comunicacion entre programas
});

rutas.get("/usuarios/buscarPorId/:id", async(req,res)=>{
   var usuariosValido =await buscarPorId(req.params.id);
   res.json(usuariosValido);
});

rutas.delete("/usuarios/borrarUsuario/:id", async(req,res)=>{
   var usuarioBorrado=await borrarUsuario (req.params.id);
   res.json(usuarioBorrado);
});

rutas.post("/usuarios/nuevoUsuario",async (req, res)=>{
   var usuarioValido=await nuevoUsu(req.body);
   res.json(usuarioValido);
});

module.exports=rutas;