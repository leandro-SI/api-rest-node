var knex = require('../database/connection');
var bcrypt = require('bcrypt');

class User {

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
}

module.exports = new User();