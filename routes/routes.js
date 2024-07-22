var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController');
var AdminAuth = require('../middleware/AdminAuth');

router.get('/', HomeController.index);

router.post('/user/new', UserController.create);
router.get('/user/find-all', AdminAuth, UserController.findAll);
router.get('/user/find-by-id/:id', UserController.findById);
router.put('/user/update/:id', UserController.update);
router.delete('/user/delete/:id', UserController.delete);
router.post('/user/recover', UserController.recoverPassword);
router.post('/user/change-password', UserController.changePassword);
router.post('/user/login', UserController.login);

module.exports = router;