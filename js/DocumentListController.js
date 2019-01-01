

app.controller('DocumentListController', function($scope, $location, DocumentStoreService, ModalDataService) {
	// Under construction
	$scope.documents = [];
	$scope.recentDocument = null;
	
	$scope.onView = function(doc) {
		console.log(doc);
		ModalDataService.setData("modalDocumentDisplay", {document: DocumentStoreService.getDocument(doc.id)});
	};
	
	$scope.onDelete = function(idx) {
		DocumentStoreService.deleteDocument($scope.documents[idx].id);
		$scope.documents.splice(idx, 1);
	};
	
	$scope.onSearch = function() {
		
	};
	
	$scope.onDocumentCreated = function(e, data) {
		// If new document is created, add it to the list
		$scope.documents.push(data);
	};
	// Initialization
	// Get a list of available documents
	$scope.documents = DocumentStoreService.getDocumentList();
	// Get recently accessed document
	$scope.recentDocument = DocumentStoreService.getRecentDocument();
	console.log("Receng: ", $scope.recentDocument);
	// Listens for document created event
	$scope.$on("DocumentCreated", $scope.onDocumentCreated);
	
	var testData = [
		{ id: "test", type: "table", description: "This is a test document"},
		{ id: "eastWing", type: "table", description: "storing equipment serial # at east wing"},
		{ id: "westWing", type: "table", description: "storing equipment serial # at west wing"},
	];
	console.log($scope.documents);
	//$scope.documents = testData;
});