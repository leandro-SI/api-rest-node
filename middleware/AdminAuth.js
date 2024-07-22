var jwt = require('jsonwebtoken');
var secret_key = 'm0ok89uj908j0fidnoici83hj08nfi0nmiiw'; // somente para teste

module.exports = (request, response, next) => {

    const auth_token = request.headers['authorization'];

    if (auth_token != undefined) {
        
        try {
            const bearer = auth_token.split(' ');
            var token = bearer[1];
    
            var decoded = jwt.verify(token, secret_key);

            if (decoded.role == "Administrador") {
                next();
            } else {
                response.status(403).json("Você não tem permissão!")
            }

            
        } catch (error) {
            console.log(error)
            response.status(403).json("Você não está autenticado!")
        }

    } else {
        response.status(403).json("Você não está autenticado!")
    }

}