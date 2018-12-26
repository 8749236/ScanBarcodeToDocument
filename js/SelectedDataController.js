

app.controller('SelectedDataController', function($scope, $location) {
	$scope.selectedData = [];
	
	// Under construction
	$scope.onBarcodeSelected = function(e, data) {
		$scope.selectedData.push(data);
	};
	
	$scope.onRemove = function(idx) {
		$scope.selectedData.splice(idx, 1);
	};
	
	$scope.onInsert = function() {
		$scope.$parent.$broadcast("DocumentInsertRow", $scope.selectedData.map(v => v.data));
	}
	
	$scope.$on("BarcodeSelected", $scope.onBarcodeSelected);
});