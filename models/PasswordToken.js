var bcrypt = require('bcrypt');
var User = require('./User');
var knex = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

class PasswordToken {

    create = async (email) => {

        try {
            let user = await User.findByEmail(email);

            if (user != undefined) {
    
                const token_recorevy = uuidv4();
    
                await knex.insert({
                    token: token_recorevy,
                    user_id: user.id,
                    used: 0
                }).table('password_tokens')
    
                return {status: true, token: token_recorevy}
    
            } else {
                return {status: false, err: 'O email não existe no banco de dados!'}
            }
        } catch (error) {
            console.log(error);
            return {status: false, err: error}
        }
    }
}

module.exports = new PasswordToken();