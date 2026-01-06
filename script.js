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
        countdownEl.textContent = "🎉 IT’S YOUR BDAYYYYYYYY 🎉";
        launchConfetti();
        clearInterval(countdownTimer);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s left`;
}, 1000);

/* =====================================================
   BACKGROUND MUSIC
===================================================== */
musicBtn.addEventListener("click", () => {
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
   POPUP + TYPEWRITER
===================================================== */
cakeGif.addEventListener("click", () => {
    popupWindow.style.display = "flex";
    popupWindow.classList.add("show");
    startTyping();
});

function startTyping() {
    const letter = "Do remember to record yourself crying.\nEven with the distance between us,\nI'll always haunt you.\nI’m so proud of how far we've come.";
    typewriterEl.textContent = "";
    let charIndex = 0;
    const typing = setInterval(() => {
        typewriterEl.textContent += letter[charIndex];
        charIndex++;
        if (charIndex >= letter.length) clearInterval(typing);
    }, 45);
}

/* =====================================================
   VOICE NOTE
===================================================== */
playButton.addEventListener("click", () => {
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

voiceNote.addEventListener("ended", () => {
    lockedMessage.style.display = "block";
    bgMusic.play().catch(() => {});
    musicBtn.textContent = "⏸ Pause Music";
});

/* =====================================================
   SLIDESHOW
===================================================== */
const photos = [
    "assets/images/photo1.png",
    "assets/images/photo2.png",
    "assets/images/photo3.png",
    "assets/images/photo4.png"
];

let slideIndex = 0;
setInterval(() => {
    slide.style.opacity = 0;
    setTimeout(() => {
        slideIndex = (slideIndex + 1) % photos.length;
        slide.src = photos[slideIndex];
        slide.style.opacity = 1;
    }, 500);
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
    popupWindow.classList.remove("show");
    setTimeout(() => {
        popupWindow.style.display = "none";
    }, 300);
   
