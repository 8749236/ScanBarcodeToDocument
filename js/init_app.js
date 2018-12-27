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
		.when("/documents/:document_id", {
				templateUrl : "views/document.html",
				controller : "DocumentController",
		})
		.when("/about", {
				templateUrl : "views/about.html"
		});
		
		// Remove "#" from url
		// Need base tag within head tag to work
		$locationProvider.html5Mode(false);
});

app.run(function($rootScope, DocumentStoreService) {
	// Setup navbar for auto close when a link clicked
	$(".collapse.navbar-collapse a").click(function() {
		$(".collapse.navbar-collapse").collapse("hide");
	});
});