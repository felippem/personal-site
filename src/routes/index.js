/*global require, module*/
var express = require('express'),
	homeController = require('../controllers/home'),
	contactController = require('../controllers/contact');

var router = express.Router();

router.get('/', homeController.index);
router.put('/api/contact', contactController.create);

module.exports = router;