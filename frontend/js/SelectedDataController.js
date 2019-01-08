

app.controller('SelectedDataController', function($scope, $location) {
	$scope.selectedData = [];
	$scope.dataReplacedByExtraction = [];
	
	// Under construction
	$scope.onBarcodeSelected = function(e, data) {
		$scope.onInsert(data);
	};
	
	$scope.onRemove = function(idx) {
		$scope.selectedData.splice(idx, 1);
	};
	
	$scope.onInsert = function(data) {
		$scope.selectedData.push(data);
	};
	
	$scope.onAddToDocument = function() {
		$scope.$parent.$broadcast("DocumentInsertRow", $scope.selectedData);
		$scope.onClear();
	};
	
	// Allow certain row to the extracted and edited
	// Then inserted again
	$scope.onRowExtracted = function(e, row) {
		// Sometimes user may accidentally over-write existing data
		// Which they do not want to lose
		$scope.dataReplacedByExtraction.push($scope.selectedData);
		$scope.selectedData = row;
	};
	
	$scope.onClear = function() {
		// Restore accidentally over-written data, if any
		$scope.selectedData = $scope.dataReplacedByExtraction.pop() || [];
	};
	
	$scope.$on("BarcodeSelected", $scope.onBarcodeSelected);
	$scope.$on("DocumentExtractRow", $scope.onRowExtracted);
});