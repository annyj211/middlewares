// primer ejercicio clase del 8 de Agosto del 2020
const express = require("express"); //importar express
const bodyparser = require("body-parser"); //importar bodyparser
const app = express(); //inicializar express a una constante

app.use(bodyparser.json()); //usar el body parser desde el json, decirle a server que use el middleware
//aqui creamos el middleware 
function agregarLog(req, res, next){
    const {method,path,query,body} =req; // creo el objeto para extraer las propiedades
    console.log(`Ruta: ${req.method} - ${req.path} -${JSON.stringify(req.query)} -${JSON.stringify(req.body)}`); // envio los datos a la consola
    next(); // para que continue el proceso
}
app.use(agregarLog);//usar el middleware para todos los metodos

app.get("/demo",(req, res) => { // si se quiere usar para solo un metodo, se llama despues de la ruta
    res.json("Hola Mundo");
});
app.post("/contact", (req, res) => {
    res.json("Hola Contacto");
});

app.listen(3000, () => {
    console.log("Escuchando en http://localhost:3000/");
});