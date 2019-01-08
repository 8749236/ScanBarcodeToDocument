

app.controller('DecodedListController', function($scope, $location) {
	// Under construction
	
	$scope.decodedList = [];
	$scope.colors = ["blue", "red", "orange"];
	
	$scope.onBarcodeAnalyzed = function(e, data) {
		//$scope.decodedList = data;
		$scope.onInsert(data);
	};
	
	$scope.onSelect = function(item) {
		$scope.$parent.$broadcast("BarcodeSelected", item.code);
	};
	
	$scope.onInsert = function(item) {
		//$scope.decodedList.push(item);
		$scope.decodedList.unshift(item);
	};
	
	$scope.onRemove = function(idx) {
		$scope.decodedList.splice(idx, 1);
	};
	
	$scope.$on("BarcodeAnalyzed", $scope.onBarcodeAnalyzed);
	
	
	var testData = ["227E3LPHSU/27", "PB238Q", "220B4LPCB/27"];
	$scope.$parent.$broadcast("BarcodeAnalyzed", testData[0]);
	$scope.$parent.$broadcast("BarcodeAnalyzed", testData[1]);
	$scope.$parent.$broadcast("BarcodeAnalyzed", testData[2]);
});