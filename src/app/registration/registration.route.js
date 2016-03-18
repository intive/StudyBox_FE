	(function() {
	'use strict';

	angular
	.module('registrationMod')
	.config(routerConfig);

	/** @ngInject */
	function routerConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('registration', {
			url: '/registration',
			templateUrl: 'app/registration/registration.html',
			controller: 'RegistrationController',
			controllerAs: 'registration'
		});

		$urlRouterProvider
		.otherwise('/');
		
	}


	})();
