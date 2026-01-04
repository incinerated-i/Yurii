// Get the elements
const cakeGif = document.getElementById("cakeGif");
const popupWindow = document.getElementById("popupWindow");
const voiceNote = document.getElementById("voiceNote");
const playButton = document.querySelector("button");

// Function to show the popup
cakeGif.addEventListener("click", function() {
    popupWindow.style.display = "flex"; // Show the popup
    voiceNote.pause(); // Make sure audio is paused when popup opens
    voiceNote.currentTime = 0; // Reset to the beginning
    playButton.textContent = "Play Audio"; // Reset button text
});

// Function to play the audio
function playAudio() {
    if (voiceNote.paused) {
        voiceNote.play();
        playButton.textContent = "Pause Audio"; // Change button text to Pause
    } else {
        voiceNote.pause();
        playButton.textContent = "Play Audio"; // Change button text back to Play
    }
}

// Function to close the popup
function closePopup() {
    popupWindow.style.display = "none"; // Hide the popup
}
