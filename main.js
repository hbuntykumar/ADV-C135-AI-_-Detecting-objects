model_status = "";
object_tobe_detected = "";
objects = [];

function setup() {
    canvas = createCanvas(430, 330);
    canvas.position(450, 120);

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 430, 330);

    if (model_status != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {

            if (objects[i].label == object_tobe_detected) {
                percent = floor(objects[i].confidence * 100);
                document.getElementById("status").innerHTML = "Status: Object Detected";

                fill("#FF0000");
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);

                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                var synth = window.speechSynthesis;
                speak_data = objects[i].label;
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
        }
    } else {
        document.getElementById("status").innerHTML = "Status: Object Not Detected";
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocssd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects...";
    object_tobe_detected = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("cocossd model is Initiated!");
    model_status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}