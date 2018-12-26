

app.controller('DecodedListController', function($scope, $location) {
	// Under construction
	
	$scope.decodedList = [];
	
	$scope.onBarcodeAnalyzed = function(e, data) {
		$scope.decodedList = data;
	};
	
	$scope.onSelect = function(item) {
		$scope.$parent.$broadcast("BarcodeSelected", item.code);
	};
	
	$scope.$on("BarcodeAnalyzed", $scope.onBarcodeAnalyzed);
	
	
	var testData = [
		{ color: "blue", data: "IMTS1042"},
		{ color: "red", data: "PB238Q"},
		{ color: "orange", data: "H5LMTF102409"}
	];
	$scope.$parent.$broadcast("BarcodeAnalyzed", testData);
});