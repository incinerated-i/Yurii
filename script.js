document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Elements ---
    const cakeGif = document.getElementById("cakeGif");
    const popupWindow = document.getElementById("popupWindow");
    const popupContent = document.getElementById("popupContent");

    const voiceNote = document.getElementById("voiceNote");
    const playButton = document.getElementById("playButton");
    const closeBtn = document.getElementById("closeBtn");
    const surpriseBtn = document.getElementById("surpriseBtn");
    const lockedMessage = document.getElementById("lockedMessage");

    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    const countdownEl = document.getElementById("countdown");
    const typewriterEl = document.getElementById("typewriter");

    const slide = document.getElementById("slide");

    const memoryQuestionEl = document.getElementById("memoryQuestion");
    const memoryFeedbackEl = document.getElementById("memoryFeedback");

    // --- Confetti Function ---
    function burstConfetti() {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffffff','#ff9ecb','#ff4d4d']
        });
    }

    // --- Countdown Timer ---
    const birthday = new Date("January 8, 2026 06:01:00").getTime();
    const countdownTimer = setInterval(() => {
        const diff = birthday - Date.now();

        if (diff <= 0) {
            countdownEl.textContent = "🎉 IT’S YOUR BDAYYYYYYYY 🎉";
            burstConfetti();
            clearInterval(countdownTimer);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownEl.textContent = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);

    // --- Background Music ---
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

    // --- Popup + Typewriter ---
    cakeGif.addEventListener("click", () => {
        popupWindow.classList.add("show");
        startTyping();
        burstConfetti(); // confetti on cake click
    });

    function startTyping() {
        const letter =
            "I really hoped you'd see this the moment I sent, but now is also fine.\n" +
            "Even with the distance between us,\n" +
            "I'll always haunt you.\n" +
            "I’m so proud of how far we've come.";

        typewriterEl.textContent = "";
        let charIndex = 0;

        const typing = setInterval(() => {
            typewriterEl.textContent += letter[charIndex];
            charIndex++;

            if (charIndex >= letter.length) {
                clearInterval(typing);
            }
        }, 45);
    }

    closeBtn.addEventListener("click", () => {
        popupWindow.classList.remove("show");
        setTimeout(() => {
            popupWindow.style.display = "none";
        }, 300);

        voiceNote.pause();
        voiceNote.currentTime = 0;
        playButton.textContent = "Play 💖";

        // Lock surprise again
        surpriseBtn.disabled = true;
    });

    // --- Voice Note ---
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

        surpriseBtn.disabled = false;
        surpriseBtn.textContent = "Surprise 💌";
        surpriseBtn.classList.add("highlight");

        bgMusic.play().catch(() => {});
        musicBtn.textContent = "⏸ Pause Music";
    });

    // --- Slideshow ---
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

    // --- Memory Game ---
    const memoryQuestions = [
        { q: "Who is the smarter one?", correct: 0, response: "Duh obviously its me 🙄" },
        { q: "Who carries the games?", correct: 0, response: "Obviously me. No debate." },
        { q: "Who will leave first?", correct: 0, response: ". . ." }
    ];

    let memoryIndex = 0;

    function loadMemoryQuestion() {
        if (memoryIndex >= memoryQuestions.length) {
            memoryQuestionEl.textContent = "You passed!!! I guess you do know your stuffs welll!";
            memoryFeedbackEl.textContent = "";
            return;
        }
        memoryQuestionEl.textContent = memoryQuestions[memoryIndex].q;
        memoryFeedbackEl.textContent = "";
    }

    function answerMemory(choice) {
        const current = memoryQuestions[memoryIndex];

        if (choice === current.correct) {
            memoryFeedbackEl.textContent = "✔ " + current.response;
            burstConfetti();
        } else {
            memoryFeedbackEl.textContent = "✖ Nah. 😒";
        }

        memoryIndex++;
        setTimeout(loadMemoryQuestion, 1500);
    }

    window.answerMemory = answerMemory; // expose for HTML onclick
    loadMemoryQuestion();

    // --- Story Game ---
    function storyChoice(choice) {
        const storyText = document.getElementById("storyText");
        const choices = document.querySelector("#storyGame .choices");

        if (choice === "stay") {
            storyText.textContent =
                "You stay. The conversation drifts from jokes to silence — the comfortable kind. She smiles, even from far away.";
        } else {
            storyText.textContent =
                "You go to sleep. But somehow, you still think about her. Distance doesn’t make feelings disappear.";
        }

        choices.innerHTML = "<p>💭 Some choices stay with you.</p>";
    }

    window.storyChoice = storyChoice; // expose for HTML onclick

    // --- Surprise Button & Hidden Gift ---
    surpriseBtn.addEventListener("click", () => {
    if (surpriseBtn.disabled) return;

    alert("I'm gonna block you now. ╰(*´︶`*)╯");
        burstConfetti();
        burstConfetti(); // double effect
    });
});
