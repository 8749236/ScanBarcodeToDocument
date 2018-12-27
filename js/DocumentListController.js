

app.controller('DocumentListController', function($scope, $location, DocumentStoreService, ModalDataService) {
	// Under construction
	$scope.documents = [
		{ id: "test", type: "table", description: "This is a test document"},
		{ id: "eastWing", type: "table", description: "storing equipment serial # at east wing"},
		{ id: "westWing", type: "table", description: "storing equipment serial # at east wing"},
	];
	
	$scope.onView = function(doc) {
		console.log(doc);
		ModalDataService.setData("modalDocumentDisplay", {document: DocumentStoreService.getDocument(doc.id)});
	};
	
	//$scope.documents = 
});