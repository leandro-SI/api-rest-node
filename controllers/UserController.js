const { request, response } = require('express');
var User = require('../models/User')

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
            respose.status(400);
            respose.json({err: 'Id inválido!'});
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

    create = async (request, respose) => {
        let {name, email, password} = request.body;

        if (password == undefined) {
            respose.status(400);
            respose.json({err: 'todos os dados são obrigatórios'});
            return;
        }

        let emailExists = await User.findEmail(email);

        if (emailExists) {
            respose.status(400);
            respose.json({err: 'Email já cadastrado!'});
            return;
        }

        await User.createUser(name, email, password);

        respose.status(200);
        respose.json('Usuario criado com sucesso!')

    }
}

module.exports = new UserController();