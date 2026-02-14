const express = require('express');
const { write } = require('fs');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

async function redJson(ruta){
    const rutaCompleta = path.join(__dirname, ruta);
    console.log("Ingreso a la lectura");
    const texto = await fs.readFile(rutaCompleta, 'utf8');
    console.log("Logro hacer la lectura");
    return JSON.parse(texto);
}

async function writeJson(ruta, datos){
    const rutaCompleta = path.join(__dirname, ruta);
    await fs.writeFile(rutaCompleta, JSON.stringify(datos,null,2), 'utf8');
}

app.get('/productos', async (req, res)=>{
    console.log('hello');
    const productos = await redJson('data/productos.json');

    console.log('adios');
    res.status(200).json({status:200,message:'Success',data:productos});
});

app.post('/productos',async (req, res)=>{
    const producto = req.body;
    const ruta = 'data/productos.json';
    const productos = await redJson(ruta);
    productos.push(producto);
    await writeJson(ruta, productos);

    res.status(201).json({status:201,message:'Registro exitoso...'});
});

//PUT: /productos

//DELETE: /productos

app.get('/fabricantes', async (req, res)=>{
    const fabricantes = await redJson('data/fabricantes.json');
    res.status(200).json({status:200,message:'Success',data:fabricantes});
});

//POST: /fabricantes

//PUT: /fabricantes

//DELETE: /fabricantes

app.listen(PORT, ()=>{
    console.log(`Escuchando en el http://localhost:${PORT}/`);
});
