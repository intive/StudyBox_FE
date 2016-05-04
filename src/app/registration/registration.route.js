	(function() {
	'use strict';

	angular
	.module('registration')
	.config(routerConfig);

	/** @ngInject */
	function routerConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('registration', {
			url: '/registration',
			templateUrl: 'app/registration/registration.html',
			controller: 'RegistrationController',
			controllerAs: 'registration',
			params: {
				loginRequired: false
			}
		});

		$urlRouterProvider
		.otherwise('/');
		
	}


	})();
