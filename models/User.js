var knex = require('../database/connection');
var bcrypt = require('bcrypt');
const PasswordToken = require('./PasswordToken');

class User {

    findAll = async () => {
        try {
            return await knex.select(['id', 'name', 'email', 'role_id']).table('users');
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    findById = async (id) => {
        try {
            return await knex.select(['id', 'name', 'email', 'role_id']).table('users').where({id: id}).first();
        } catch (error) {
            console.log(error);
        }
    }

    createUser = async (name, email, password, role_id) => {
        
        try {

            var hash = await bcrypt.hash(password, 10);

            await knex.insert({name, email, password: hash, role_id: 1}).table('users');
        } catch (error) {
            console.log(error)
        }
    }

    findEmail = async (email) => {
        try {
            let result = await knex.select("*").from('users').where({ email: email});
            if (result.length > 0)
                return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    update = async (id, name, email) => {
        try {
            let user = await this.findById(id);

            if (user != undefined) {

                let editUser = {};
                editUser.name = name;

                if (email != user.email) {
                    var result = await this.findEmail(email);
                    if (result == false) {
                        editUser.email = email;
                    } else {
                        return {status: false, err: "Email já cadastrado!"}

                    }
                }

                await knex.update(editUser).table('users').where({id: id});
                return {status: true, mensagem: "Usuário atualizado com sucesso."}
            } else {
                return {status: false, err: "Usuário não encontrado!"}
            }
        } catch (error) {
            console.log(error)
        }
    }

    delete = async (id) => {
        let user = await this.findById(id);

        if (user != undefined) {
            await knex.delete().table('users').where({id: id});
            return {status: true}
        } else {
            return {status: false, err: "Usuário não encontrado!"}
        }
    }

    findByEmail = async (email) => {
        try {
            return await knex.select(['id', 'name', 'email', 'role_id']).table('users').where({email: email}).first();
        } catch (error) {
            console.log(error);
        }
    }

    changePassword = async (new_password, user_id, token) => {
        try {
            
            var hash = await bcrypt.hash(new_password, 10);

            await knex.update({password: hash}).table('users').where({id: user_id});

            await PasswordToken.setUsed(token);

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new User();