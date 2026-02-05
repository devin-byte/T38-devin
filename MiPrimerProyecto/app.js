const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const users = [{usuario:'Jonie Miralda', edad:'33'},{usuario:'Hugo Duron', edad:'35'},{usuario:'Oscar Ucles', edad:'40'}];

app.get('/usuarios',(req, res)=>{
    
    res.json({status:200,message:'Success', data: users});
});

app.post('/usuarios',(req, res)=>{

    const usuario = req.body;
    users.push(usuario);
    res.status(201).json({status:201,message:'Usuario se registro exitosamente.', data: usuario});

});

app.put('/usuarios/:nombre',(req, res)=>{
    const usuario = req.body;
    const nombre = req.params.nombre;

    let isExists = false;
    users.forEach(user => {
        if(user.usuario === nombre){
            isExists = true;
            user.edad = usuario.edad;
            user.nombre = usuario.nombre;
        }
    });

    if(isExists){
        res.status(200).json({status:200,message:'Usuario se actualizo exitosamente.', data: usuario});
    }
    else{
        res.status(404).json({status:404,message:'Usuario no encontrado...'});
    }
    
});

app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});
