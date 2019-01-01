

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
	
	$scope.onDocumentExport = function(e, data) {
		// Reduce each element via join(',')
		// Then join joined element via join ('\r\n')
		// join-ception!
		var csv = data.data.reduce((acc, v) => (acc.push(v.join(",")), acc), []).join("\r\n");
		var csvEncoded = "data:text/csv;charset=utf-8," + encodeURI(csv);
		// Create fake anchor element
		var a = document.createElement("a");
		// Set download file name
		a.setAttribute("download", "barcorder_doc_" + data.id + ".csv");
		// Set download content
		a.setAttribute("href", csvEncoded);
		// Trigger click
		a.click();
		// ???
		// Profit
	};
	
	
	// Initialization
	// Get a list of available documents
	$scope.documents = DocumentStoreService.getDocumentList();
	// Get recently accessed document
	$scope.recentDocument = DocumentStoreService.getRecentDocument();

	// Listens for document created event
	$scope.$on("DocumentCreated", $scope.onDocumentCreated);
	// Listens for document export event
	$scope.$on("DocumentExport", $scope.onDocumentExport);
	
	var testData = [
		{ id: "test", type: "table", description: "This is a test document"},
		{ id: "eastWing", type: "table", description: "storing equipment serial # at east wing"},
		{ id: "westWing", type: "table", description: "storing equipment serial # at west wing"},
	];
	console.log($scope.documents);
	//$scope.documents = testData;
});