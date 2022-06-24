import jsQR from "jsqr";

let video;
let intv;

export let stop_scan = function (callback) {
  document.getElementById("qr-screen").style.display = "none";
  callback();
};

export let start_scan = function (callback) {
  document.getElementById("qr-screen").style.display = "block";
  console.log("start");

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      {
        audio: false,
        video: {
          width: 200,
          height: 200,
        },
      },
      function (stream) {
        video = document.querySelector("video");
        video.srcObject = stream;

        video.onloadedmetadata = function (e) {
          video.play();

          var barcodeCanvas = document.createElement("canvas");
          intv = setInterval(() => {
            barcodeCanvas.width = video.videoWidth;
            barcodeCanvas.height = video.videoHeight;
            var barcodeContext = barcodeCanvas.getContext("2d");
            var imageWidth = Math.max(1, Math.floor(video.videoWidth)),
              imageHeight = Math.max(1, Math.floor(video.videoHeight));

            barcodeContext.drawImage(video, 0, 0, imageWidth, imageHeight);

            var imageData = barcodeContext.getImageData(
              0,
              0,
              imageWidth,
              imageHeight
            );
            var idd = imageData.data;

            let code = jsQR(idd, imageWidth, imageHeight);

            if (code) {
              callback(code.data);
              stop_scan();
              clearInterval(intv);
            }
          }, 1000);
        };
      },
      function (err) {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
};
