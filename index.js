const express = require('express'); //Buscando tudo que o expresss tem e que ele exporta

const server = express(); //criando uma 


server.use(express.json());


// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs' , tipo: 'Backend' }

//localhost:300/curso

//crud > create , read , update / delete

const cursos = ['node JS', 'JavaScript', 'React Native'];

// Middleware Global
server.use((req,res, next)=>{
    console.log(`URL CHAMADA: ${req.url}`);

    return next();
});

function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: "NOME OBRIGATORIO"});
    }

    return next();


}

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index]; //senão existe curso nesse index (id)
    if(!curso){
        return res.status(400).json({ error: "O curso não existe"});
    }
    req.curso = curso ;

    return next();
}



server.get('/cursos', (req, res)=> {
return res.json(cursos);
});


server.get('/cursos/:index',checkIndexCurso, (req, res) => { //dizendo para ele acessa a rota /curso
    
    //const { index } = req.params; //Route params 
    
    return res.json(req.curso);

    // nome = req.query.nome; // Trabalhando com query  params
    //return res.json({ curso: `Apredendo ${nome}`}); 


});

server.post('/cursos', checkCurso, (req, res)=> {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
})

//ATUALIZANDO UM CURSO
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req,res)=> {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);

});


//EXCLUINDO CURSO

server.delete('/cursos/:index', checkIndexCurso, (req,res)=>{
    const { index } = req.params;
    

cursos.splice(index, 1);

return res.json (cursos);

});
server.listen(3000); //falando para ele ouvir a porta 3000

