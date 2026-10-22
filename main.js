
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const results = document.getElementById("results");
const scanText = document.getElementById("scanText");
const scanProgress = document.getElementById("scanProgress");
const verdict = document.getElementById("verdict");

// NO BUTTON - RUN AWAY FROM THE CURSOR

const noMessage = document.getElementById("noMessage");

let attempts = 0;

const noMessages = [
    "Nice try 💀",
    "Why are you defending him?",
    "Lee isn't paying you to do this.",
    "Bro remembers the invention of Wi-Fi.",
    "JUST ACCEPT THAT HE'S OLD 😭",
    "Denial is the first stage of grief."
];

function moveNoButton() {
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    const messageIndex = attempts % noMessages.length;

    noMessage.textContent = noMessages[messageIndex];

    attempts++;
}

noBtn.addEventListener("mouseenter", moveNoButton);


// YES BUTTON - START AGE INVESTIGATION
yesBtn.addEventListener("click", function () {
    results.style.display = "block";
    yesBtn.disabled = true;

    const messages = [
        "Scanning birth certificate...",
        "Analyzing joint deterioration...",
        "Checking bingo attendance records...",
        "Calculating remaining youth...",
        "Locating retirement homes in St. Louis...",
        "Confirming ancient status..."
    ];

    let progress = 0;

    const scan = setInterval(function () {
        progress += 5;
        scanProgress.value = progress;

        const index = Math.min(
            Math.floor(progress / 20),
            messages.length - 1
        );

        scanText.textContent = messages[index];

        if (progress >= 100) {
            clearInterval(scan);

            results.style.display = "none";
            verdict.style.display = "block";

            document.querySelector("h1").textContent =
                "AGE INVESTIGATION RESULTS";
        }

    }, 150);
});
