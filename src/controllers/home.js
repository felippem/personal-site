/*global module*/
(function () {
	'use strict';
	
	var homeController = {
		index: function (req, res, next) {
			res.render('home/index', { 
				title: 'Felippe Medeiros'
			});
		}
	};
	
	module.exports = homeController;
})();