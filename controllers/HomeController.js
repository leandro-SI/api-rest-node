class HomeController{

    async index(req, res){
        res.send("APP EXPRESS! - Digital Binary");
    }

}

module.exports = new HomeController();