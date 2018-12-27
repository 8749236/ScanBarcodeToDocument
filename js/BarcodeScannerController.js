

app.controller('BarcodeScannerController', function($scope, $location) {
	// Under construction
	
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
	
	Quagga.init(config, function() {
			console.log("Test");
	});
});