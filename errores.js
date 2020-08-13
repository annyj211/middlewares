// primer ejercicio clase del 8 de Agosto del 2020
const express = require("express"); //importar express
const bodyparser = require("body-parser"); //importar bodyparser
const app = express(); //inicializar express a una constante

//contactos
let listaContactos =[];

app.use(bodyparser.json()); //usar el body parser desde el json, decirle a server que use el middleware
//aqui creamos el middleware 
function agregarLog(req, res, next){
    const {method,path,query,body} =req; // creo el objeto para extraer las propiedades
    console.log(`Ruta: ${req.method} - ${req.path} -${JSON.stringify(req.query)} -${JSON.stringify(req.body)}`); // envio los datos a la consola
    next(); // para que continue el proceso
}
function validarContactoReq(req,res,next){
    //Extraer los datos del body
    let {nombre,apellido,email} = req.body;
    // Validar los datos extraidos &&
    if (nombre && apellido &&email){
        next();
    }
    res.status(400).json('Alguno de los datos no es valido') //Enviar un error y mensaje si no son validos
}

function validarContactoExistente(req,res,next){
    //Extraer los datos del body
    let {nombre,apellido,email} = req.body;
    // Validar los datos extraidos &&
    if (listaContactos.find(x=>x.nombre==nombre && x.apellido==apellido && x.email==email)){
        res.status(400).json('Ya existe este contando') //Enviar un error y mensaje si no son validos
    }else{
        listaContactos.push(req.body);
        console.log(listaContactos);
        next();
    }
}
app.use(agregarLog);//usar el middleware para todos los metodos

app.get("/demo",(req, res) => { // si se quiere usar para solo un metodo, se llama despues de la ruta
    res.json("Hola Mundo");
});
app.post("/contact",validarContactoReq,validarContactoExistente, (req, res) => {
    res.json("Hola Contacto");
});

app.listen(3000, () => {
    console.log("Escuchando en http://localhost:3000/");
});