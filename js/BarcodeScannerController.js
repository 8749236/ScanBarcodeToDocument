

app.controller('BarcodeScannerController', function($scope, $location) {
	// Under construction
	$scope.capturedImage = null;
	$scope.cameraStatus = "initializing camera";
	$scope.cameraDisabled = false;
	$scope.cameras = [];
	$scope.camera = null; // Current active camera
	var video = document.getElementById("barcodeCaptureVideo");
	
	var quaggaConfig = {
		locate: true,
		locator: {
				patchSize: "medium",
				halfSample: false
		},
    decoder : {
      readers : ["code_39_reader", "code_128_reader"],
    }
  };
	
	// On capture: just pretending capturing live feed
	// while we are actually using input tag with capture attribute
	// capture="camera" tells mobile browsers to activate cameras to acquire
	// the image for upload
	// Since this website is dedicated for usage on mobile devices so 
	// It is safe to ignore desktop usages
	// (It does not make sense for a relatively stationary laptop/desktop to scan barcodes)
	$scope.onCapture = function() {$("#detectedBarcode").html("Processing");};
	document.getElementById("barcodeCaptureUpload").onchange = function() {
		console.log("image uploaded");
		console.log(this);
		$scope.capturedImage = window.URL.createObjectURL(this.files[0]);
		$scope.$apply();
	};
	
	$scope.onAnalyze = function() {
		$("#detectedBarcode").html("Processing");
		// Call quagga lib to analyze the image
		quaggaConfig.src = $scope.capturedImage;
		Quagga.decodeSingle(quaggaConfig, function(result) {
			if(result && result.codeResult) {
				$("#detectedBarcode").html(result.codeResult.code);
				$scope.$parent.$broadcast("BarcodeAnalyzed", result.codeResult.code);
			} else {
				$("#detectedBarcode").html("Unable to distinguish barcode");
			}
		});
		$scope.onClear();
	};
	
	$scope.onClear = function() {
		$scope.cameraStatus = "active";
		$scope.capturedImage = null;
	};
	// Whenever user taps video tag, cycles the camera feed
	$scope.onCycleCamera = function() {
		$scope.cameraStatus = "initializing camera";
		var idx = $scope.cameras.indexOf($scope.camera);
		if(idx < 0) {/*No camera is found*/}
		idx = (idx + 1) % $scope.cameras.length;
		$scope.camera = $scope.cameras[idx];
		
		navigator.mediaDevices.getUserMedia({ video: {deviceId: {exact: $scope.camera.deviceId}}, audio: false}).
			then(function(stream) {
				video.srcObject = stream;
				$scope.cameraStatus = "loading";
				$scope.$apply();
			}).catch(function(err) {
				console.log("An error has occured: ", err)
				$scope.cameraStatus = "failed to initialize camera: " + err;
				$scope.cameraDisabled = true;
				$scope.$apply();
			});
	};
	
	navigator.mediaDevices.enumerateDevices().then(function(devices) {
		$scope.cameras = devices.filter(v => v.kind == "videoinput");
		$scope.camera = devices[0];
		// Cycle the camera
		// Since mobile devices might get front camera first
		// Cycling once will switch to rear camera
		// This can also help setup the stream to the video tag
		$scope.onCycleCamera();
	});
});