/* ---------------- BASIC ELEMENTS ---------------- */

const cakeGif = document.getElementById("cakeGif");
const popupWindow = document.getElementById("popupWindow");

const voiceNote = document.getElementById("voiceNote");
const playButton = document.getElementById("playButton");
const closeBtn = document.getElementById("closeBtn");
const surpriseBtn = document.getElementById("surpriseBtn");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const countdownEl = document.getElementById("countdown");
const typewriterEl = document.getElementById("typewriter");
const lockedMessage = document.getElementById("lockedMessage");

/* ---------------- COUNTDOWN + CONFETTI ---------------- */

const birthday = new Date("January 8, 2026 00:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = birthday - now;

    if (diff <= 0) {
        countdownEl.textContent = "🎉 IT’S YOUR DAY 🎉";
        launchConfetti();
        clearInterval(timer);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdownEl.textContent = `⏳ ${days} days left`;
}, 1000);

/* ---------------- BACKGROUND MUSIC ---------------- */

musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = "⏸ Pause Music";
    } else {
        bgMusic.pause();
        musicBtn.textContent = "🎵 Play Music";
    }
});

/* ---------------- CAKE POPUP ---------------- */

cakeGif.addEventListener("click", () => {
    popupWindow.style.display = "flex";
    startTyping();
});

/* ---------------- VOICE NOTE ---------------- */

playButton.addEventListener("click", () => {
    if (voiceNote.paused) {
        voiceNote.play();
        playButton.textContent = "Pause 💖";
    } else {
        voiceNote.pause();
        playButton.textContent = "Play 💖";
    }
});

voiceNote.addEventListener("ended", () => {
    lockedMessage.style.display = "block";
});

/* ---------------- TYPEWRITER ---------------- */

const letter =
"Do remember to record yourself crying.\n" +
"Even with the distance between us,\n" +
"I'll always haunt you.\n" +
"I’m so proud of how far we've come.";

let i = 0;

function startTyping() {
    typewriterEl.textContent = "";
    i = 0;

    const typing = setInterval(() => {
        typewriterEl.textContent += letter[i];
        i++;
        if (i >= letter.length) clearInterval(typing);
    }, 45);
}

/* ---------------- SURPRISE BUTTON ---------------- */

surpriseBtn.addEventListener("click", () => {
    alert("I'm gonna block you now.╰(*´︶`*)╯");
});

/* ---------------- CLOSE ---------------- */

closeBtn.addEventListener("click", () => {
    popupWindow.style.display = "none";
    voiceNote.pause();
});
