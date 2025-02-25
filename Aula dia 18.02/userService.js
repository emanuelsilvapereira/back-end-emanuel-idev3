const User = require("./user");
const path = require('path');
const fs = require('fs');

class userService  {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json');
        this.user = this.loadUsers();//Array para armazenar user
        this.nextId = this.getNextId();//contador para grrar id
    }


    loadUsers() {
        try { 
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath);
            return JSON.parse(data);
        }
    }catch(erro){
        console.log('Erro ao carregar arquivo', erro);
    } 
    return [];
    }

    getNextId(){
        try{
        if(this.user.length===0) return 1;
            return Math.max(...this.user.map(user => user.id))
         } catch (erro){
            console.log('Erro ao buscar o proximo id', erro)
         }
     
    } saveUsers(){
        try{
        fs.writeFileSync(this.filePath, JSON.stringfy(this.user));
    }catch(erro){
        console.log('Erro ao salvar o arquivo', erro);
    }
    }


    addUser(nome, email, senha, endereço, telefone, cpf) {
        try{
        const user = new User(this.nextId++, nome, email, senha, endereco, telefone, cpf)
        this.user.push(user)
        this.saveUsers();
        return user;
    } catch(erro){
        console.log('Erro ao buscar o proximo id', erro)
    }
    }
    getUsers() {
        try{
        return this.user
    } catch(erro){
        console.log('Erro ao buscar o proximo id', erro)
    }
    }
}

module.exports = new userService