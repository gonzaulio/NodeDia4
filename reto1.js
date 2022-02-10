// ---- DATA ----
const profesionales = require("./profesionales");

// ---- API REST -----

const express = require("express");

const app = express();

app.use(express.json());

let profesional = null;

// -------- METODOS GET -------

app.get("/", function(request, response){
    let respuesta = {error: true, codigo: 200, mensaje: "Punto de inicio"};
    response.send(respuesta);
})

app.get("/profesional", function(request, response){
    let respuesta;
    if (profesional != null){
        respuesta = profesional;
    } else {
        respuesta = {error: true, codigo: 200, mensaje: "El profesional no existe"}
    }
    response.send(respuesta)
})

// -------- METODO POST ---------

app.post("/profesional", function(request, response){
    let respuesta;
    if (profesional == null) {
        profesional = new profesionales(
            request.body.nombre,
            request.body.edad,
            request.body.genero,
            request.body.peso,
            request.body.altura,
            request.body.colorcabello,
            request.body.colorojos,
            request.body.raza,
            request.body.retirado,
            request.body.nacionalidad,
            request.body.numerooscars,
            request.body.profesion)
    
        respuesta = {error: false, codigo: 200, mensaje: "Profesional creado", resultado: profesional}
    } else {
        respuesta = {error: true, codigo: 200, mensaje: "Profesional ya existe", resultado: profesional}
    }
    response.send(respuesta);
})

// ----- METODO PUT ------

app.put("/profesional", function(request, response){
    let respuesta;
    if (profesional != null) {

        profesional.name = request.body.nombre;
        profesional.age = request.body.edad;
        profesional.genre = request.body.genero;
        profesional.weight = request.body.peso;
        profesional.height = request.body.altura;
        profesional.hairColor = request.body.colorcabello;
        profesional.eyeColor = request.body.colorojos;
        profesional.race = request.body.raza;
        profesional.isRetired = request.body.retirado;
        profesional.nationality = request.body.nacionalidad;
        profesional.oscarsNumber = request.body.numerooscars;
        profesional.profession = request.body.profesion;

        respuesta = {error: false, codigo: 200, mensaje: "Profesional Actualizado", resultado: profesional}
    } else {
        respuesta = {error: true, codigo: 200, mensaje: "No existe el profesional", resultado: profesional}
    }
    response.send(respuesta);
})

// ------- METODO DELETE ----

app.delete("/profesional", function(request, response){
    let respuesta;
    if (profesional != null) {
        profesional = null;
        respuesta = {error: false, codigo: 200, mensaje: "Profesional Eliminado", resultado: profesional}
    } else {
        respuesta = {error: true, codigo: 200, mensaje: "No existe ningún profesional", resultado: profesional}
    }
    response.send(respuesta);
})

// ----- MIDDLEWARE-----

app.use(function(request, response, next){
    respuesta = {error: true, codigo: 404, mensaje: "URL no encontrada"};
    response.status(404).send(respuesta);
})

// ----- PUERTO ------

app.listen(2000)


// ------PARA EL BODY------

// {"nombre": "Brad Pitterson",
// "edad": 54,
// "genero": "Masculino",
// "peso": 84,
// "altura": 1.80,
// "colorcabello": "negro",
// "colorojos": "Verdes",
// "raza": "Caucásico",
// "retirado": false,
// "nacionalidad": "Estadounidense",
// "numerooscars": 3,
// "profesion": "actor"
// }