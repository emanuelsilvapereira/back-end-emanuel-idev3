//classe base Usuário
class Usuario {
    constructor(nome, email, senha){
        this.nome = nome;
        this.email = email;
        this._senha = senha;//atributo aprovado
    }
    autenticar(senha) {
        return senha == this._senha
    }
    alterarsenha(NovaSenha){
        this._senha == NovaSenha;
        console.log('Senha alterada com sucesso');
    }
}
//classe admin que herda de Usuario
class Admin extends Usuario {
    constructor(nome,email,senha, nivelAcesso){
        super(nome, email, senha);//chama o contructor da classe pai
        this.nivelAcesso = nivelAcesso;
    }
    banirusuario(usuario){
        console.log(`${usuario.nome} foi banido pelo admin ${this.nome}`)
    }

    //polimorfismo sobrepondo o método autenticas
    autenticar(senha){
        return senha === this._senha && this.nivelAcesso === 'alto';
    }
}

//Exemplo de uso

const usuario1 = new Usuario('Luiz','luiz@gmail.com','12345')
const usuario2 = new Admin('Maria','maria@gmail.com','6789', 'alto')
console.log(usuario1.autenticar('12345'))
console.log(usuario2.autenticar('6789'))
usuario2.banirusuario(usuario1);
