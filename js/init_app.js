var app = angular.module('appBarcodeToDocument', ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when("/", {
				templateUrl : "views/home.html",
				controller : "HomePageController",
		})
		.when("/documents", {
				templateUrl : "views/documents.html",
				controller : "DocumentListController",
		})
		.when("/scan/:document_id", {
				templateUrl : "views/scanner.html",
				controller : "DocumentListController",
		})
		.when("/about", {
				templateUrl : "views/about.html"
		});
		
		// Remove "#" from url
		// Need base tag within head tag to work
		$locationProvider.html5Mode(true);
});

app.run(function($rootScope, DocumentStoreService) {
	//DocumentStoreService
});