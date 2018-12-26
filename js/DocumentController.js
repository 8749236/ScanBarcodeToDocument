

app.controller('DocumentController', function($scope, $location) {
	// Under construction
	$scope.document = [
		["IMTS1042", "PB238Q", "H5LMTF102409", "Alice"],
		["IMTS2046", "227ELPSH/27", "AU5A1201009208", "Bob"],
	];
	
	// Initialization
	// Grab document or create one if does not exists
	$scope.init = function() {
		
	};
	
	// onSave
	$scope.onSave = function() {
		
	};
	
	// onDelete
	$scope.onDelete = function() {
		
	};
	
	
	$scope.onRemoveRow = function(idx) {
		$scope.document.splice(idx, 1);
	};
	
	$scope.onDocumentInsert = function(e, data) {
		$scope.document.push(data);
	};
	$scope.$on("DocumentInsert", $scope.onDocumentInsert);
	
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