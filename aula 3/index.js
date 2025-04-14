const express = require('express');
const userService = require('./userService');

const app = express(); //nome qualquer para express
app.use(express.json()); // vou habilitar json no express

// userService.loadUsers();
// userService.getNextId();

app.post("/users", async (req, res) => {
    try {
        const { nome, email, endereco, senha, telefone, cpf } = req.body;
        if (!nome || !email || !endereco || !senha || !telefone || !cpf) {
            return res.status(400).json
                ({ error: "Nome, email, endereço, senha, telefone e CPF são obrigatorios" })
        }
        const user = await userService.addUser(nome, email, endereco, senha, telefone, cpf);
        res.status(201).json({ mensagem: "Usuário Cadastrado com Sucesso!" });
    } catch (erro) {
        console.log(erro);
        res.status(400).json({ error: erro.message });
    }
});

//rota para listar todos os usuarios
app.get("/users", (req, res) => {
    res.json(userService.getUsers());
});

// Rota para excluir um usuário pelo ID
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // Converte o ID para número
    try {
        const resultado = userService.deleteUser(id);
        // Tenta excluir o usuário
        res.status(200).json(resultado);
        // Retorna a mensagem de sucesso
    } catch (erro) {
        res.status(404).json({ error: erro.message });
        // Retorna a mensagem de erro
    }
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, endereco, senha, telefone, cpf } = req.body;

    try {
        const user = userService.updateUser(id, nome, email, endereco, senha, telefone, cpf);
        res.status(200).json({"Usuario atualizado com sucesso": user});
    } catch (erro) {
        res.status(404).json({ error: erro.message });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("Servidor rodando na porta: ", port);
})