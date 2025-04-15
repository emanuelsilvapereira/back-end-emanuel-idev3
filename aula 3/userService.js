const User = require("./user");
const path = require('path'); //modulo para manipular caminhos
const fs = require('fs'); //modulo para manipular arquivos file system
const bcrypt = require('bcryptjs'); //modulo para criptografar senha
const mysql = require("./mysql")//Importando funções de conexão com o MySQL

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json'); //caminho do arquivo
        this.users = this.loadUsers(); //Array para armazenar user
        this.nextId = this.getNextId(); //contador para gerar id
    }

    loadUsers() { //carregar os usuarios do JSON (Banco)
        try { //tenta executar o bloco de codigo
            if (fs.existsSync(this.filePath)) { //verifica se o arquivo existe
                const data = fs.readFileSync(this.filePath); //le o arquivo
                return JSON.parse(data); //transforma o json em objeto
            }
        } catch (erro) { //caso ocorra um erro
            console.log('Erro ao carregar arquivo', erro);
        }
        return []; //retorna um array vazio
    }

    //difinir o proximo id a ser utilizado
    getNextId() {//função para buscar o proximo id
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;//retorna o maior id +1
        } catch (erro) {
            console.log('Erro ao buscar proximo id', erro);
        }
    }

    saveUsers() { //função para salvar os usuarios
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users)); //salva o arquivo
        } catch (erro) {
            console.log('Erro ao salvar arquivo', erro);
        }
    }

    async addUser(nome, email, senha, endereco, telefone, cpf) { //função para adicionar usuario
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);

            const resultados = await mysql.execute(
                `INSERT INTO usuário (nome, email, senha, endereço, telefone, cpf)
	                    VALUES ( ?, ?, ?, ?, ?, ?);`,
                        [nome, email, senhaCripto, endereco, telefone, cpf]
            );
            return resultados


        } catch (erro) {
            console.log('Erro ao adicionar usuario', erro);
            throw erro;
        }
    }

    getUsers() { //função para buscar usuarios
        try {
            return this.users
        } catch (erro) {
            console.log('Erro ao buscar usuarios', erro);
        }
    }

    deleteUser(id) {
        try {
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();

        } catch {
            console.log('Erro ao deletar usuario', erro);
        }
    }

    async updateUser(id, nome, email, endereco, senha, telefone, cpf) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);

            const resultados = await mysql.execute(
                `UPDATE usuário 
                 SET nome = ?, email = ?, senha = ?, endereço = ?, telefone = ?, cpf = ?
                 WHERE idusuário = ?`,
                [nome, email, senhaCripto, endereco, telefone, cpf, id]
            );
            return resultados;

        } catch (erro) {
            console.log('Erro ao atualizar usuario', erro);
            throw erro;
        }
    }

}

module.exports = new userService;