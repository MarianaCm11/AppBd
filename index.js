const express = require("express");
const usuariosRutas= require("./routes/rutasUsuario");

const app= express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/", usuariosRutas);// el  json va antes de las rutas 

const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});