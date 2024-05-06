const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const gallery = document.getElementById("gallery");
let mediaRecorder;
let recordedChunks = [];
let recording = false;

async function openCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
            recordedChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/mp4' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = 'recorded_video.mp4';
            link.click();
            recordedChunks = []; // Reset
        };

    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Could not access the camera. Please ensure you have permission.');
    }
}

function closeCamera() {
    const { srcObject } = video;
    if (srcObject) {
        srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
}

function captureImage() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    const img = document.createElement("img");
    img.src = dataUrl;
    gallery.appendChild(img);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = 'captured_image.png';
    link.click(); /* Trigger download */
}

function toggleRecording() {
    if (recording) {
        mediaRecorder.stop();
        recording = false;
        document.getElementById("recordButton").textContent = "Start Recording";
    } else {
        mediaRecorder.start();
        recording = true;
        document.getElementById("recordButton").textContent = "Stop Recording";
    }
}

async function togglePiP() {
    try {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else {
            await video.requestPictureInPicture();
        }
    } catch (error) {
        console.error('Error with Picture-in-Picture:', error);
        alert('Picture-in-Picture might not be supported in your browser or has been denied.');
    }
}

function adjustBrightness() {
    const brightness = document.getElementById("brightness").value;
    video.style.filter = `brightness(${brightness})`;
}

function adjustContrast() {
    const contrast = document.getElementById("contrast").value;
    video.style.filter = `contrast(${contrast})`;
}

function adjustVolume() {
    const volume = document.getElementById("volume").value;
    video.volume = volume;
}

function toggleMute() {
    video.muted = !video.muted;
    const muteButton = document.getElementById("muteButton");
    muteButton.textContent = video.muted ? "Unmute" : "Mute";
}

function toggleDarkMode() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    body.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
}