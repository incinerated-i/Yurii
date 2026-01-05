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

const slide = document.getElementById("slide");

/* =====================================================
   COUNTDOWN + CONFETTI
===================================================== */

const birthday = new Date("January 8, 2026 00:00:00").getTime();

const countdownTimer = setInterval(() => {
    const now = Date.now();
    const diff = birthday - now;

    if (diff <= 0) {
        countdownEl.textContent = "🎉 IT’S YOUR DAY 🎉";
        launchConfetti();
        clearInterval(countdownTimer);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdownEl.textContent = `⏳ ${days} days left`;
}, 1000);

/* =====================================================
   BACKGROUND MUSIC (SAFE TOGGLE)
===================================================== */

musicBtn.addEventListener("click", () => {
    // Pause voice note if playing
    if (!voiceNote.paused) {
        voiceNote.pause();
        playButton.textContent = "Play 💖";
    }

    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
        musicBtn.textContent = "⏸ Pause Music";
    } else {
        bgMusic.pause();
        musicBtn.textContent = "🎵 Play Music";
    }
});

/* =====================================================
   CAKE POPUP
===================================================== */

cakeGif.addEventListener("click", () => {
    popupWindow.style.display = "flex";
    startTyping();
});

/* =====================================================
   VOICE NOTE (NO OVERLAP GUARANTEED)
===================================================== */

playButton.addEventListener("click", () => {
    // Pause background music first
    if (!bgMusic.paused) {
        bgMusic.pause();
        musicBtn.textContent = "🎵 Play Music";
    }

    if (voiceNote.paused) {
        voiceNote.play().catch(() => {});
        playButton.textContent = "Pause 💖";
    } else {
        voiceNote.pause();
        playButton.textContent = "Play 💖";
    }
});

// When voice note ends
voiceNote.addEventListener("ended", () => {
    lockedMessage.style.display = "block";

    // Resume background music gently
    bgMusic.play().catch(() => {});
    musicBtn.textContent = "⏸ Pause Music";
});

/* =====================================================
   TYPEWRITER LOVE LETTER
===================================================== */

const letter =
"Do remember to record yourself crying.\n" +
"Even with the distance between us,\n" +
"I'll always haunt you.\n" +
"I’m so proud of how far we've come.";

let charIndex = 0;

function startTyping() {
    typewriterEl.textContent = "";
    charIndex = 0;

    const typing = setInterval(() => {
        typewriterEl.textContent += letter[charIndex];
        charIndex++;

        if (charIndex >= letter.length) {
            clearInterval(typing);
        }
    }, 45);
}

/* =====================================================
   SLIDESHOW (PNG IMAGES)
===================================================== */

const photos = [
    "assets/images/photo1.png",
    "assets/images/photo2.png",
    "assets/images/photo3.png",
    "assets/images/photo4.png"
];

let slideIndex = 0;

setInterval(() => {
    slideIndex = (slideIndex + 1) % photos.length;
    slide.src = photos[slideIndex];
}, 3000);

/* =====================================================
   SURPRISE BUTTON
===================================================== */

surpriseBtn.addEventListener("click", () => {
    alert("I'm gonna block you now.╰(*´︶`*)╯");
});

/* =====================================================
   CLOSE POPUP
===================================================== */

closeBtn.addEventListener("click", () => {
    popupWindow.style.display = "none";
    voiceNote.pause();
    playButton.textContent = "Play 💖";
});
