// ---- DATA ----
const profesionales = require("./profesionales");
let profesional0 = new profesionales("Penélope Cruz", 47, "Femenino", 80, 1.70, "Negro", "Marrón", "Hispana", false, "Española", 3, "Actriz");
let profesional1 = new profesionales("Edgar Ramirez", 38, "Masculino", 92, 1.84, "Marrón", "Verdes", "Hispana", false, "Venezolano", 0, "Actor");
let profesional2 = new profesionales("Pedro Perez", 35, "Masculino", 85, 1.58, "Castaño", "Negros", "Hispano", false, "Español", 5, "Director");
let profesional3 = new profesionales("Carmen Victoria", 40, "Femenino", 85, 1.78, "Marrón", "Negros", "Afroamericana", false, "Portuguesa", 3, "Guionista");
let profesional4 = new profesionales("Leopoldo Jimenez", 12, "Masculino", 70, 1.71, "Castaño", "Negros", "Asiático", false, "Japonés", 5, "Director");
let profesional5 = new profesionales("Viola Davis", 45, "Femenino", 82, 1.68, "Negro", "Negros", "Afroamericana", false, "Estadounidense", 1, "Actriz");

let arrayprofesionales = [];
arrayprofesionales.push(profesional0);
arrayprofesionales.push(profesional1);
arrayprofesionales.push(profesional2);
arrayprofesionales.push(profesional3);
arrayprofesionales.push(profesional4);
arrayprofesionales.push(profesional5);

// ---- API REST ----

const express = require("express");

const app = express();

app.use(express.json());

// let profesional = null;

// -------- METODOS GET -------

app.get("/", function(request, response){
    let respuesta = {error: true, codigo: 200, mensaje: "Punto de inicio"};
    response.send(respuesta);
})

app.get("/profesionales", function(request, response){
    
    let id = request.query.id;
    let respuesta;

    if (arrayprofesionales != null && !id) {
        respuesta = arrayprofesionales;
    } else if (arrayprofesionales != null && id <= arrayprofesionales.length) {
        respuesta = arrayprofesionales[id];
    } else {
        respuesta = {error: true, codigo: 200, mensaje: "El profesional no existe"}
    }
    response.send(respuesta)
})

// -------- METODO POST ---------

app.post("/profesionales", function(request, response){
    let respuesta;
    let profesional;
    if (arrayprofesionales != null) {
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

        arrayprofesionales.push(profesional);
    
        respuesta = {error: false, codigo: 200, mensaje: "Profesional agregado:", resultado: profesional}
    } else {
        respuesta = {error: true, codigo: 200, mensaje: "Ha surgido un problema", resultado: null}
    }
    response.send(respuesta);
})

// ----- METODO PUT ------

app.put("/profesionales", function(request, response){

    let ideditor = request.body.ideditor;
    let respuesta;
    if (arrayprofesionales != null) {

        arrayprofesionales[ideditor].name = request.body.nombre;
        arrayprofesionales[ideditor].age = request.body.edad;
        arrayprofesionales[ideditor].genre = request.body.genero;
        arrayprofesionales[ideditor].weight = request.body.peso;
        arrayprofesionales[ideditor].height = request.body.altura;
        arrayprofesionales[ideditor].hairColor = request.body.colorcabello;
        arrayprofesionales[ideditor].eyeColor = request.body.colorojos;
        arrayprofesionales[ideditor].race = request.body.raza;
        arrayprofesionales[ideditor].isRetired = request.body.retirado;
        arrayprofesionales[ideditor].nationality = request.body.nacionalidad;
        arrayprofesionales[ideditor].oscarsNumber = request.body.numerooscars;
        arrayprofesionales[ideditor].profession = request.body.profesion;

        respuesta = {error: false, codigo: 200, mensaje: "Profesional Actualizado", resultado: arrayprofesionales[ideditor]};
    } else {
        respuesta = {error: true, codigo: 200, mensaje: "No existe el profesional", resultado: null}
    }
    response.send(respuesta);
})

// ------- METODO DELETE ----

app.delete("/profesionales", function(request, response){
    let respuesta;
    let ideditor = request.body.ideditor;

    if (arrayprofesionales != null && arrayprofesionales[ideditor]) {
        arrayprofesionales.splice([ideditor], 1);
        respuesta = {error: false, codigo: 200, mensaje: "Profesional Eliminado", resultado: arrayprofesionales}

    } else {
        respuesta = {error: true, codigo: 200, mensaje: "No existe ningún profesional", resultado: null}
    }
    response.send(respuesta);
})


// ----- MIDDLEWARE-----

app.use(function(request, response, next){
    respuesta = {error: true, codigo: 404, mensaje: "URL no encontrada"};
    response.status(404).send(respuesta);
})

// ----- PUERTO ------

app.listen(3000)


// --- PARA EL BODY --
// {"nombre": "Brad Pitt",
// "edad": 52,
// "genero": "Masculino",
// "peso": 84,
// "altura": 1.80,
// "colorcabello": "negro",
// "colorojos": "Verdes",
// "raza": "Caucásico",
// "retirado": false,
// "nacionalidad": "Estadounidense",
// "numerooscars": 3,
// "profesion": "actor",
// "ideditor": 6
// }