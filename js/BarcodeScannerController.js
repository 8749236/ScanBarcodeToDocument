

app.controller('BarcodeScannerController', function($scope, $location) {
	// Under construction
	$scope.capturedImage = null;
	$scope.cameraStatus = "initializing camera";
	$scope.cameraDisabled = false;
	var video = document.getElementById("barcodeCaptureVideo");
	var canvas = document.createElement("canvas");
	var photo = document.getElementById("barcodeCapturedImage");
	var streaming = false;
	var width = 320;
	var height = 0;
	
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
	
	document.getElementById("barcodeCaptureUpload").onchange = function() {
		console.log("image uploaded");
		console.log(this);
		$scope.capturedImage = window.URL.createObjectURL(this.files[0]);
		$scope.$apply();
		$scope.onAnalyze();
	};
	
	$scope.onCapture = function() {
		var context = canvas.getContext('2d');
		if (width && height) {
			$scope.cameraStatus = "captured";
			canvas.width = width;
			canvas.height = height;
			context.drawImage(video, 0, 0, width, height);

			var data = canvas.toDataURL('image/jpeg');
			$scope.capturedImage = data;
		}
	};
	
	$scope.onAnalyze = function() {
		console.log("Analyze!");
		
		$("#detectedBarcode").html("Processing");
		// Call quagga lib to analyze the image
		quaggaConfig.src = $scope.capturedImage;
		Quagga.decodeSingle(quaggaConfig, function(result) {
			if(result.codeResult) {
				console.log("result", result.codeResult.code);
			} else {
				console.log("not detected");
			}
		});
		$scope.onClear();
	};
	
	$scope.onClear = function() {
		$scope.cameraStatus = "active";
		$scope.capturedImage = null;
	};
	
	$scope.cameras = [];
	$scope.camera = null; // Current active camera
	$scope.onCycleCamera = function() {
		$scope.cameraStatus = "initializing camera";
		var idx = $scope.cameras.indexOf($scope.camera);
		if(idx < 0) {/*No camera is found*/}
		idx = (idx + 1) % $scope.cameras.length;
		var deviceId = $scope.cameras[idx].deviceId;
		
		navigator.mediaDevices.getUserMedia({ video: {deviceId: {exact: deviceId}}, audio: false}).
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
		$scope.onCycleCamera();
	});
	video.addEventListener('canplay', function(ev){
		if (!streaming) {
			height = video.videoHeight / (video.videoWidth/width);
		
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			streaming = true;
		}
	}, false);

	Quagga.onProcessed(function(result) {
		if(result && result.codeResult) {
			$("#detectedBarcode").html(result.codeResult.code);
			$scope.$parent.$broadcast("BarcodeAnalyzed", result.codeResult.code);
		} else {
			$("#detectedBarcode").html("Unable to distinguish barcode");
		}
		/*
		var drawingCtx = Quagga.canvas.ctx.overlay,
				drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
				if (result.boxes) {
						drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
						result.boxes.filter(function (box) {
								return box !== result.box;
						}).forEach(function (box) {
								Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
						});
				}

				if (result.box) {
						Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
				}

				if (result.codeResult && result.codeResult.code) {
						Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
				}
		}*/
	});
});