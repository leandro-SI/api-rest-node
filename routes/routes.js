var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController');

router.get('/', HomeController.index);

router.post('/user/new', UserController.create);
router.get('/user/find-all', UserController.findAll);
router.get('/user/find-by-id/:id', UserController.findById);

module.exports = router;