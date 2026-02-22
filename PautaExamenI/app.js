const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

const libros = [{"id":1,"titulo":"La comunidad del anillo","autor":"Jrr tolkien","anioPublicacion":1955,"estado":"Disponible"}]

app.get("/libros",(req,res)=>{
    res.json({status:200,message:'Success',data:libros});

});

app.post("/libros", (req, res) => {

    const { titulo, autor, anioPublicacion, estado } = req.body;

    if (!titulo || !autor || !anioPublicacion || !estado) {
        return res.status(400).json({
            status: 400,
            message: "Todos los campos son obligatorios"
        });
    }

    const nuevoLibro = {
        id: libros.length + 1,
        titulo,
        autor,
        anioPublicacion,
        estado
    };

    libros.push(nuevoLibro);

    res.status(201).json({
        status: 201,
        message: "Libro agregado",
        data: nuevoLibro
    });
});


app.put("/libros/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const libro = libros.find(l => l.id === id);

    if (!libro) {
        return res.status(404).json({
            status: 404,
            message: "Libro no encontrado"
        });
    }

    const { titulo, autor, anioPublicacion, estado } = req.body;

    if (titulo !== undefined) libro.titulo = titulo;
    if (autor !== undefined) libro.autor = autor;
    if (anioPublicacion !== undefined) libro.anioPublicacion = anioPublicacion;
    if (estado !== undefined) libro.estado = estado;

    res.status(200).json({
        status: 200,
        message: "Libro actualizado",
        data: libro
    });
});


app.listen(PORT, ()=>{
    console.log(`Escuchando en http://localhost:${PORT}/`);
});