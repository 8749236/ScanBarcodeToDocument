

app.controller('DocumentController', function($scope, $routeParams, $location, DocumentStoreService) {
	// Under construction
	$scope.documentId = $routeParams.document_id;
	$scope.document = null;
	
	// onSave
	$scope.onSave = function() {
		DocumentStoreService.setDocument($scope.documentId, $scope.document);
	};
	
	// onDelete
	$scope.onDelete = function() {
		DocumentStoreService.deleteDocument($scope.documentId);
		$location.path("/documents");
	};
	
	// remove one row by index
	$scope.onRemoveRow = function(idx) {
		$scope.document.data.splice(idx, 1);
	};
	
	// Push new row of data
	$scope.onAddRow = function(e, data) {
		$scope.document.data.push(data);
	};
	
	// Initialization
	// Grab document or create one if does not exists
	var emptyDocument = {
		id: null,
		type: "table",
		description: "",
		data: null
	};
	var testData = {
		id: "test",
		type: "table",
		description: "This is a test document",
		data: [
			["IMTS1042", "PB238Q", "H5LMTF102409", "Alice"],
			["IMTS2046", "227ELPSH/27", "AU5A1201009208", "Bob"]
		]
	};
	$scope.document = DocumentStoreService.getDocument($scope.documentId);
	// $scope.document = Object.assign(emptyDocument, {id: $scope.documentId});
	$scope.document = $scope.document ? $scope.document : testData;
	
	$scope.$on("DocumentInsertRow", $scope.onAddRow);
});