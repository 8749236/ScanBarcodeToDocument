

app.controller('DocumentController', function($scope, $routeParams, $location, DocumentStoreService) {
	// Under construction
	$scope.documentId = $routeParams.document_id;
	$scope.document = [
		["IMTS1042", "PB238Q", "H5LMTF102409", "Alice"],
		["IMTS2046", "227ELPSH/27", "AU5A1201009208", "Bob"],
	];
	
	// onSave
	$scope.onSave = function() {
		DocumentStoreService.setDocument($scope.documentId, $scope.document);
	};
	
	// onDelete
	$scope.onDelete = function() {
		DocumentStoreService.deleteDocument($scope.documentId);
		$scope.document = [];
	};
	
	// remove one row by index
	$scope.onRemoveRow = function(idx) {
		$scope.document.splice(idx, 1);
	};
	
	// Push new row of data
	$scope.onAddRow = function(e, data) {
		$scope.document.push(data);
	};
	
	// Initialization
	// Grab document or create one if does not exists
	var testData = [
		["IMTS1042", "PB238Q", "H5LMTF102409", "Alice"],
		["IMTS2046", "227ELPSH/27", "AU5A1201009208", "Bob"]
	];
	$scope.document = DocumentStoreService.getDocument($scope.documentId);
	$scope.document = $scope.document ? $scope.document : testData;
	$scope.$on("DocumentInsertRow", $scope.onAddRow);
	
	var config = {
		"default": {
			inputStream: { name: "Test",
				type: "ImageStream",
				length: 10,
				size: 800
			},
			locator: {
				patchSize: "medium",
				halfSample: true
			}
		}
	};
	/*
	Quagga.init(config, function() {
			console.log("Test");
	});*/
});