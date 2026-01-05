const cakeGif = document.getElementById("cakeGif");
const popupWindow = document.getElementById("popupWindow");
const voiceNote = document.getElementById("voiceNote");
const playButton = document.getElementById("playButton");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const countdownEl = document.getElementById("countdown");
const secretMessage = document.getElementById("secretMessage");

// 🎂 Cake popup
cakeGif.addEventListener("click", () => {
    popupWindow.style.display = "flex";
});

// 🎧 Voice note
function playAudio() {
    if (voiceNote.paused) {
        voiceNote.play();
        playButton.textContent = "Pause 💖";
    } else {
        voiceNote.pause();
        playButton.textContent = "Play 💖";
    }
}

// ❌ Close popup
function closePopup() {
    popupWindow.style.display = "none";
    voiceNote.pause();
}

// 💬 Interactive surprise
function showMessage() {
    secretMessage.textContent =
        "No matter the distance, you’re always with me. I’m so proud of you 💙";
}

// 🎵 Background music toggle
musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = "⏸ Pause Music";
    } else {
        bgMusic.pause();
        musicBtn.textContent = "🎵 Play Music";
    }
});

// ⏳ Countdown Timer
const birthday = new Date("January 8, 2026 00:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = birthday - now;

    if (diff <= 0) {
        countdownEl.innerHTML = "🎉 IT’S YOUR DAY 🎉";
        cakeGif.style.display = "block";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdownEl.innerHTML = `⏳ ${days} days left until your birthday`;
}, 1000);
