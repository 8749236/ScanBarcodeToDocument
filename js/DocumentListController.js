

app.controller('DocumentListController', function($scope, $location, DocumentStoreService, ModalDataService) {
	// Under construction
	$scope.documents = [];
	
	$scope.onView = function(doc) {
		console.log(doc);
		ModalDataService.setData("modalDocumentDisplay", {document: DocumentStoreService.getDocument(doc.id)});
	};
	
	$scope.onDelete = function(idx) {
		console.log(idx);
		//DocumentStoreService.deleteDocument(id);
	};
	// Initialization
	// Get a list of available documents
	$scope.documents = DocumentStoreService.getDocumentList();
	
	var testData = [
		{ id: "test", type: "table", description: "This is a test document"},
		{ id: "eastWing", type: "table", description: "storing equipment serial # at east wing"},
		{ id: "westWing", type: "table", description: "storing equipment serial # at west wing"},
	];
	console.log($scope.documents);
	$scope.documents = testData;
});