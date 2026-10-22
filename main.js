
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
    "Denial is the first stage of grief.",
    "... Just click yes.",
    "He isn't getting any younger.."
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
    document.querySelector(".lee-image").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.getElementById("noMessage").style.display = "none";
    document.querySelector(".disclaimer").style.display = "none";

    document.querySelector("h1").textContent = "ANALYZING LEE...";
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


    const retirementCarousel = document.getElementById("retirementCarousel");
    const prevHome = document.getElementById("prevHome");
    const nextHome = document.getElementById("nextHome");

    function scrollHomes(direction) {
        const card = retirementCarousel.querySelector(".home-card");
        const gap = 20;

        retirementCarousel.scrollBy({
            left: direction * (card.offsetWidth + gap),
            behavior: "smooth"
        });
    }

    prevHome.addEventListener("click", function () {
        scrollHomes(-1);
    });

    nextHome.addEventListener("click", function () {
        scrollHomes(1);
    });

    // Convert vertical mouse-wheel movement to horizontal scrolling


    retirementCarousel.addEventListener("wheel", function (event) {
        const maxScroll =
            retirementCarousel.scrollWidth - retirementCarousel.clientWidth;

        if (maxScroll <= 0) {
            return;
        }

        const movement = event.deltaY !== 0
            ? event.deltaY
            : event.deltaX;

        const atStart = retirementCarousel.scrollLeft <= 1;
        const atEnd = retirementCarousel.scrollLeft >= maxScroll - 1;

        // Allow normal page scrolling when there's nowhere to go
        if ((movement < 0 && atStart) || (movement > 0 && atEnd)) {
            return;
        }

        event.preventDefault();

        retirementCarousel.scrollBy({
            left: movement,
            behavior: "instant"
        });
    }, { passive: false });



});
