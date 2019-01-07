

app.controller('BarcodeScannerController', function($scope, $location) {
	// Under construction
	$scope.barcode = "N/A"
	$scope.status = "Idle";
	$scope.capturedImage = null;
	
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
	
	$scope.onUpload = function() {
		var input = document.getElementById("barcodeCaptureUpload");
		var captureAttr = input.getAttribute("capture");
		input.removeAttribute("capture");
		input.click();
		input.setAttribute("capture", captureAttr);
	};
	
	// On capture: just pretending capturing live feed
	// while we are actually using input tag with capture attribute
	// capture="camera" tells mobile browsers to activate cameras to acquire
	// the image for upload
	// Since this website is dedicated for usage on mobile devices so 
	// It is safe to ignore desktop usages
	// (It does not make sense for a relatively stationary laptop/desktop to scan barcodes)
	$scope.onCapture = function() {};
	document.getElementById("barcodeCaptureUpload").onchange = function() {
		console.log("image uploaded");
		console.log(this);
		$scope.status = "Capture success";
		$scope.capturedImage = window.URL.createObjectURL(this.files[0]);
		$scope.$apply();
	};
	
	$scope.onAnalyze = function() {
		$scope.status = "Analyzing";
		// Call quagga lib to analyze the image
		quaggaConfig.src = $scope.capturedImage;
		Quagga.decodeSingle(quaggaConfig, function(result) {
			if(result && result.codeResult) {
				$scope.barcode = result.codeResult.code;
				$scope.$parent.$broadcast("BarcodeAnalyzed", result.codeResult.code);
				// Since event is fired outside the digiest cycle
			} else {
				$scope.barcode = "Unable to distinguish barcode";
			}
			$scope.status = "Idle";
			$scope.$apply();
		});
	};
	
	$scope.onClear = function() {
		$scope.capturedImage = null;
		document.getElementById("barcodeCaptureUpload").value = null;
	};
	
	var rotateCanvasCtx = function(direction) {
		var canvas = document.createElement("canvas");

		var image = new Image();
		image.src = $scope.capturedImage;
		canvas.width = image.height;
		canvas.height = image.width;
		
		image.onload = function() {
			var ctx = canvas.getContext("2d");
			// Since origin is at top left
			// If rotate CW
			// 		Translate X to right by original image height
			// If rotate CCW
			//		Translate Y to bottom by original image width
			ctx.translate(direction  * canvas.width/2  + canvas.width/2,
									(-direction) * canvas.height/2 + canvas.height/2);
			ctx.rotate(direction * 1/2 * Math.PI);
			ctx.drawImage(image, 0, 0);
			// DEBUG: Draw origin
			//ctx.arc(0, 0, 50, 0, 2 * Math.PI, false);
      //ctx.fillStyle = 'green';
      //ctx.fill();
			
			// This one feels a bit slower
			//$scope.capturedImage = canvas.toDataURL("image/jpeg");
			//$scope.$apply();
			// toBlob() feels a bit faster than toDataURL()..
			canvas.toBlob(function(blob) {
				console.log(blob);
				$scope.capturedImage = window.URL.createObjectURL(blob);
				$scope.$apply();
			}, "image/jpeg");
		};
	};
	$scope.onRotateLeft = function() {
		rotateCanvasCtx(-1);
	};
	$scope.onRotateRight = function() {
		rotateCanvasCtx(1);
	};
});