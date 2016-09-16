/*global require, module*/
var express = require('express'),
	homeController = require('../controllers/home');

var router = express.Router();

router.get('/', homeController.index);

module.exports = router;