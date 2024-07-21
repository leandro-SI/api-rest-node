var User = require('../models/User')

class UserController {

    async index(request, respose){}

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
        respose.json({err: 'Usuario criado com sucesso!'})

    }
}

module.exports = new UserController();