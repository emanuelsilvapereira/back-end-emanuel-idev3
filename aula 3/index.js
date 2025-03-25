const express = require("express");
const userService = require ("./userService");

const app = express();
app.use(express.json());

//rota para criar usuario

app.post("/users", async(req, res)=>{
    const {nome, email, senha, endereco, telefone, cpf} = req.body;
    if(!nome || !email || !senha || !endereco || !telefone || !cpf){
        return res.status(400).json
        ({error: "nome, email, senha, endereco, telefone e cpf são obrigatórios"})
    }
    

    const user = await userService.addUser(nome, email, senha, endereco, telefone, cpf);
    res.status(200).json({user});
})
//rota para excluir usuários
app.delete("/users/:id", (req, res,) => {
    const id = parseInt(req.params.id);
//converte o id para numero
try {
    const resultado = userService.deleteUser(id);
    //tenta excluir o usuaeio
    res.status(200).json(resultado);
    //retorna a mensagem de sucesso
}catch (erro) {
    res.status(404).json({error: erro.message});
    //retorna a mensagem de erro
}
})

//rota para listar todos os arquivos
app.get("/users", (req, res)=>{
    res.json(userService.getUsers());
});

const port = 3000;
app.listen(port,() =>{
    console.log("Servidor rodando na porta:", port);
})