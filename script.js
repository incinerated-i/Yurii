// Get elements by ID
const cakeGif = document.getElementById("cakeGif");
const popupWindow = document.getElementById("popupWindow");
const voiceNote = document.getElementById("voiceNote");
const playButton = document.getElementById("playButton");

// Show popup when cake GIF is clicked
cakeGif.addEventListener("click", function() {
    popupWindow.style.display = "flex";
    voiceNote.pause();
    voiceNote.currentTime = 0;
    playButton.textContent = "Play Audio";
});

// Play/pause the audio when play button is clicked
function playAudio() {
    if (voiceNote.paused) {
        voiceNote.play();
        playButton.textContent = "Pause Audio";
    } else {
        voiceNote.pause();
        playButton.textContent = "Play Audio";
    }
}

// Close popup window
function closePopup() {
    popupWindow.style.display = "none";
    voiceNote.pause();
    playButton.textContent = "Play Audio";
}
