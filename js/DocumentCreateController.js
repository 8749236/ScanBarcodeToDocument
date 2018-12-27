

app.controller('DocumentCreateController', function($scope, $rootScope, $location, DocumentStoreService) {
	// Under construction
	$scope.document = {
		id: "",
		type: "table",
		description: "",
		data: []
	};
	
	$scope.onCreate = function() {
		console.log($scope.document);
		if(DocumentStoreService.setDocument($scope.document.id, $scope.document)) {
			$("#modalDocumentCreate").modal("hide");
			$("#modalDocumentCreate form").trigger("reset");
			$rootScope.$broadcast("DocumentCreated", $scope.document)
		} else {
			alert("Failed to create document: invalid ID or ID already in use");
		}
	};
});