

app.controller('BarcodeScannerController', function($scope, $location) {
	// Under construction
	$scope.capturedImage = null;
	$scope.cameraStatus = "active";
	var video = document.getElementById("barcodeCaptureVideo");
	var canvas = document.createElement("canvas");
	var photo = document.getElementById("barcodeCapturedImage");
	var streaming = false;
	var width = 320;
	var height = 0;
	
	$scope.onCapture = function() {
		var context = canvas.getContext('2d');
    if (width && height) {
			$scope.cameraStatus = "captured";
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
			$scope.capturedImage = data;
    }
	};
	
	$scope.onAnalyze = function() {
		console.log("Analyze!");
		$scope.onClear();
	};
	
	$scope.onClear = function() {
		$scope.cameraStatus = "active";
		$scope.capturedImage = null;
	};
	
	navigator.mediaDevices.getUserMedia({ video: true, audio: false}).
		then(function(stream) {
			video.srcObject = stream;
			video.play();
			
		}).catch(function(err) {
			console.log("An error has occured: ", err)
			$scope.cameraStatus = "failed to initialize";
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
	
	Quagga.init({
		numOfWorkers: navigator.hardwareConcurrency,
    inputStream : {
      name : "Live",
      type : "ImageStream",
      target: "#barcodeCaptureDisplay"    // Or '#yourElement' (optional)
    },
    decoder : {
      readers : ["code_128_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });
});