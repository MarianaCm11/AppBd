const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../modelos/UsuarioModelo");
const { usuarios } = require("./conexion");
const{encriptarPass, validarPassword,usuarioAutorizado,adminAutorizado}=require("../middlewares/funcionesPassword")
function validarDatos(usuario) {
    var valido = false;
    if (usuario.nombre != undefined && usuario.usuario != undefined && usuario.password != undefined) {
        valido = true;
    }
    return valido;
}
//console.log(usuariosBD);

async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    //console.log(usuarios.id);
    usuariosValidos = [];
    usuarios.forEach(usuario => { //usuarios solo contiene un registro y el foreach me desglosa la informacion
        //console.log(usuario.data());
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        if (validarDatos(usuario1.getUsuario)) {
            usuariosValidos.push(usuario1.getUsuario);
        }
    });
    //console.log(usuariosValidos);
    return usuariosValidos;
}
mostrarUsuarios();

async function buscarPorId(id) {
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()});// aqui se ocupa el id 
    var usuarioValido;
    if (validarDatos(usuario1.getUsuario)) {
        usuarioValido=usuario1.getUsuario;
    }
    //console.log(usuarioValido);
    return usuarioValido;
};
//buscarPorId("120");
//buscarPorId("EImI8nwRLBCKTkRSCZit");

async function nuevoUsu(data) {
    const {salt, hash}= encriptarPass(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);// aqui no 
    //console.log(usuario1.getUsuario);
    var usuarioValido=false;
    if (validarDatos(usuario1.getUsuario)) {
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido=true;
    }
   return usuarioValido;
};
/*
data={
    nombre:"Juancho",
    usuario:"pancho",
    password:"lkj"
}
async function prueba() {
    console.log(await nuevoUsu(data));
}
prueba();*/
//Revisar cuando si existe el usuario, pero el usuario es incorrecto
async function borrarUsuario(id) {
    var usuarioValido=await buscarPorId(id);
    var usuarioBorrado=false;
    if (usuarioValido) {
        await usuariosBD.doc(id).delete();
        usuarioBorrado=true;
    }
    return usuarioBorrado;
}

module.exports={
    mostrarUsuarios,
    nuevoUsu,
    borrarUsuario,
    buscarPorId
}
borrarUsuario("120");