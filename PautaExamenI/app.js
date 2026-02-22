const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

const libros = [{"id":1,"titulo":"La comunidad del anillo","autor":"Jrr tolkien","anioPublicacion":1955,"estado":"Disponible"}]

app.get("/libros",(req,res)=>{
    res.json({status:200,message:'Success',data:libros});

});

app.post("/libros",(req,res)=>{
const{titulo,autor,anioPublicacion,estado} = req.body;

if( !titulo || !autor || !anioPublicacion || !estado){
    return res.status(400).json({
        status:400,
        message:"todos los campos son obligatorios"
    });
}
const nuevolibro={
    id: libros.length + 1,
    titulo,
    autor,
    anioPublicacion: parseInt(anioPublicacion),
    estado
};
libros.push(nuevolibro);
res.status(201).json({
    status:201,
    message:"libro creado",
    data:nuevolibro
})
});

app.put("/libros/:id",(req,res)=>{
    const id=parseInt(req.params.id);
   const libro = libros.find(l => l.id === id);

   if (!libro) {
        return res.status(404).json({
            status: 404,
            message: "Libro no encontrado"
        });
    }
})

app.listen(PORT, ()=>{
    console.log(`Escuchando en http://localhost:${PORT}/`);
});