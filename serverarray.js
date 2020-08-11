const express = require("express"); //importar express
const bodyparser = require("body-parser"); //importar bodyparser
const app = express(); //inicializar express a una constante
const contactos= [{}];

app.use(bodyparser.json()); //usar el body parser desde el json, decirle a server que use el middleware
//aqui creamos el middleware 
function validarUsuario(req,res,next){
    const{nombre,apellido,email}= req.body;
    if(!nombre|| !apellido|| !email) {
        res.status(400)
        .json("Falta informacion!!!");
    }else {
        contactos.push(req.body);
        console.log(contactos);
        next();
    }
}
// function existeUsuario(req,res,next){
//     const{nombre,apellido,email}= req.body;
//     if(nombre||apellido||email ===contactos) {
//         res.status(400)
//         .json("Usuario ya existe!!!");
//     }else {
//         next();
//     }
// }
//Aqui creamos el metodo 
app.post("/contact",validarUsuario, (req, res) => {
    res.json("Contacto agregado");
});
// app.get("/demo",(req, res) => { // si se quiere usar para solo un metodo, se llama despues de la ruta
//     res.json("Hola Mundo");
// });

app.listen(3000, () => {
    console.log("Escuchando en http://localhost:3000/");
});