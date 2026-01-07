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
        burstConfetti();
        popupWindow.classList.add("show");
        startTyping();
        burstConfetti(); // confetti on cake click
    });

    function startTyping() {
        const letter =
            "I really hoped you'd see this the moment I sent it over, but now is also fine.\n" +
            "Even with the longggggg distance between us,\n" +
            "I'll always haunt you.\n" +
            "But lowkey, Ran...I’m proud of how far we've come and ngl I like it-being ur best dawg.";

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
        playButton.textContent = "Play Voice💖";

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
        "assets/images/photo4.png",
        "assets/images/photo5.png",
        "assets/images/photo6.png"
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
        { q: "Who always rage-bait the other?", correct: 1, response: "And I hate you for that.(not)" },
        { q: "Who carries the games?", correct: 0, response: "Obviously me. No debate." },
        { q: "Who makes all the funny jokes??", correct: 0, response: "I've got golden humour fr" },
        { q: "Who is more likely to be arrested?", correct: 1, response: "What a rebellious kid. Tsk tsk.." },
        { q: "Who is a good boy?", correct: 1, response: "Yes, you are...........NOT." },
        { q: "Who will always reply like an AI?", correct: 1, response: "Do better, Ranch" },
        { q: "Who will leave first?", correct: 0, response: ". . ." }
    ];

    let memoryIndex = 0;
    let memoryScore = 0;

    function answerMemory(choice) {
    const current = memoryQuestions[memoryIndex];

    if (choice === current.correct) {
        memoryFeedbackEl.textContent = "✔ " + current.response;
        memoryScore++;               
        burstConfetti();
    } else {
        memoryFeedbackEl.textContent = "✖ Nah. Capper. 😒";
    }

    memoryIndex++;
    setTimeout(loadMemoryQuestion, 1500);
}
function loadMemoryQuestion() {
    const total = memoryQuestions.length;

    if (memoryIndex >= total) {
        const ratio = memoryScore / total;
        if (ratio >= 0.75) {
            memoryQuestionEl.textContent =
                "No way, You actually know the truthhhhh! Ig you deserved this present after all.";
            memoryFeedbackEl.innerHTML =
                `Score: ${memoryScore} / ${total}<br>
                 I'm surprisedd.`;
            burstConfetti();
            burstConfetti();
            burstConfetti();
        } else if (ratio >= 0.5) {
            memoryQuestionEl.textContent =
                "Bitchy Rannn.";

            memoryFeedbackEl.innerHTML =
                `Score: ${memoryScore} / ${total}<br>
                 Well, if only you had followed the truths`;

            burstConfetti();
            burstConfetti();
        } else {
            memoryQuestionEl.textContent =
                "Bitchhh, you obviously rage-baiting me atp. Tsk, this is why I HATE YOUUU >:< ";

            memoryFeedbackEl.innerHTML =
                `Score: ${memoryScore} / ${total}<br>
                 Broski's an opp.`;
        }
        return;
    }
    memoryQuestionEl.textContent = memoryQuestions[memoryIndex].q;
    memoryFeedbackEl.textContent = "";
}

    window.answerMemory = answerMemory;
    loadMemoryQuestion();

    // --- Story Game ---
    function storyChoice(choice) {
        const storyText = document.getElementById("storyText");
        const choices = document.querySelector("#storyGame .choices");

        if (choice === "yeah") {
            storyText.textContent =
                "You like it!!!!! ( ` ω ´ ) I'm so gladddd." 
                "Honestly it's because a part of me want you to feel special too (cuz u a special-needs kid)." 
                "Okay, kiddin. But, you do mean the world to me...or that's what I think lmao.";
            burstConfetti();
            burstConfetti();
        } else {
            storyText.textContent =
                "You don't like it? You must be lying through your teeth right now, dumbass. You should be ashamed!!!!!";
        }

        choices.innerHTML = "<p>💭 I wonder how long we can stay as best vros.</p>";
    }

    window.storyChoice = storyChoice; // expose for HTML onclick

    // --- Surprise Button & Hidden Gift ---
    surpriseBtn.addEventListener("click", () => {
    if (surpriseBtn.disabled) return;
         burstConfetti();
        burstConfetti();
        alert("I'm gonna block you now. ╰(*´︶`*)╯");
    });
});
