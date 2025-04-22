const User = require("./user");
const path = require('path'); //modulo para manipular caminhos
const fs = require('fs'); //modulo para manipular arquivos file system
const bcrypt = require('bcryptjs'); //modulo para criptografar senha
const mysql = require("./mysql")//Importando funções de conexão com o MySQL

class userService {
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

    async getUsers(idusuário) {
        try {
            const resultados = await mysql.execute(
                `SELECT idusuário FROM usuário WHERE idusuário = ?`,
                [idusuário]
            );
            console.log("resultado ", resultados);
            return resultados;
        } catch (erro) {
            console.log('Erro ao buscar usuários', erro);
            throw erro;
        }
    }

    async deleteUser(idusuário) {
        try {
            const user = await this.getUsers(idusuário);
            if (user.length == 0) {
                console.log('Usuário não existe!');
                return;
            }
            const resultados = await mysql.execute(
                `DELETE FROM usuário WHERE idusuário = ?`,
                [idusuário]
            );
            return resultados;
        } catch (erro) {
            console.log('Erro ao deletar usuário', erro);
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