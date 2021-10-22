noseX = 0;
noseY = 0;
filter_value = "";

function preload() {
   nose = loadImage("https://i.postimg.cc/k4vHCvQk/5315041-red-nose-day-2016-by-jmk-prime-on-deviantart-red-nose-png-894-894-preview-removebg-preview.png")
}

function setup() {
    Canvas = createCanvas(300, 300)
    Canvas.center()
    video = createCapture(VIDEO)
    video.size(300, 300)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)

}

function modelLoaded() {
    console.log("Model initialized")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        noseX = results[0].pose.nose.x-15
        noseY = results[0].pose.nose.y-15
        console.log(noseX, noseY)
    }
}

function draw() {
    image(video, 0, 0, 300, 300)
    filter_value = document.getElementById("filters").value
    filter_value = eval(filter_value)
    if (filter_value == POSTERIZE || filter_value == BLUR) {
        filter(filter_value, 5)
    } else {
        filter(filter_value)
    }
    image(nose, noseX, noseY, 30, 30)
}

function take_snapshot() {
    save('my_filter.jpg')
}