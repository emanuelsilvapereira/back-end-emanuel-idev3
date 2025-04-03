class User{
    constructor(id, nome, email, senha, endereco, telefone, cpf){
        this.id = id; //id do usuario
        this.nome = nome; //nome do usuario
        this.email = email; // email do usuario
        this.senha = senha; // senha do usuario
        this.endereco = endereco; // endereco do usuario
        this.telefone = telefone; // telefone do usuario
        this.cpf = cpf; // cpf do usuario
    }
}

module.exports = User; // exportar o modulo