const { request, response } = require('express');
var User = require('../models/User');
var PasswordToken = require('../models/PasswordToken');

class UserController {

    async index(request, respose){}

    findAll = async (request, response) => {

        let user = await User.findAll();

        response.status(200);
        response.json(user);
    }

    findById = async (request, response) => {

        let id = request.params.id;

        if (isNaN(id)) {
            response.status(400);
            response.json({err: 'Id inválido!'});
            return;
        }

        let user = await User.findById(id);

        if (user == null) {
            response.status(404);
            response.json('Usuário não encontrado.');
            return;
        }

        response.status(200);
        response.json(user);
    }

    create = async (request, response) => {
        let {name, email, password} = request.body;

        if (password == undefined) {
            response.status(400);
            response.json({err: 'todos os dados são obrigatórios'});
            return;
        }

        let emailExists = await User.findEmail(email);

        if (emailExists) {
            response.status(400);
            response.json({err: 'Email já cadastrado!'});
            return;
        }

        await User.createUser(name, email, password);

        response.status(200);
        response.json('Usuario criado com sucesso!')

    }

    update = async (request, response) => {
        const { id, name, email } = request.body;
        const idUser = request.params.id;

        if (isNaN(id)) {
            response.status(400);
            response.json({err: 'Id inválido!'});
            return;
        }

        if (id != idUser) {
            response.status(400);
            response.json({err: 'Id inválido!'});
            return;
        }

        if (name == undefined || name == "") {
            response.status(400);
            response.json({err: 'Nome é requerido!'});
            return;
        }

        if (email == undefined || email == "") {
            response.status(400);
            response.json({err: 'Email é requerido!'});
            return;
        }

        let result = await User.update(id, name, email);

        if (result.status == false) {
            response.status(400);
            response.json({err: result.err});
            return;
        } else {
            response.status(200);
            response.json(result.mensagem);
            return;
        }

    }

    delete = async (request, response) => {
        let id = request.params.id;

        if (isNaN(id)) {
            return response.status(400).json({
                err: 'Id Invalido.'
            })
        } else {
            let result = await User.delete(id);

            if (result.status == false) {
                return response.status(400).json({
                    err: result.err
                })
            } else {
                return response.status(200).json({
                    mensagem: 'Usuário deletado com sucesso'
                })
            }
        }
    }

    recoverPassword = async (request, response) => {
        let email = request.body.email;

        let result = await PasswordToken.create(email);

        if (result.status == false) {
            return response.status(400).json({
                err: result.err
            })
        } else {
            return response.status(200).json({
                mensagem: 'Email de recuperação enviado com sucesso.',
                token: result.token
            })
        }
    }

    changePassword = async (request, response) => {
        let token = request.body.token;
        let password_new = request.body.password;

        let is_token_valid = await PasswordToken.validate(token);
        console.log('is_token_valid: ', is_token_valid.status)
        if (is_token_valid.status) {
            await User.changePassword(password_new, is_token_valid.token.user_id, is_token_valid.token.token);

            return response.status(200).json({
                mensagem: 'Senha alterada com sucesso.'
            })

        } else {
            return response.status(400).json({
                err: 'Token inválido!'
            })
        }
    }
}

module.exports = new UserController();