const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noMessage = document.getElementById("noMessage");
const pageTitle = document.getElementById("pageTitle");
const container = document.querySelector(".container");
const results = document.getElementById("results");
const scanText = document.getElementById("scanText");
const scanProgress = document.getElementById("scanProgress");
const verdict = document.getElementById("verdict");
const stampOverlay = document.getElementById("stampOverlay");
const certifiedStamp = document.getElementById("certifiedStamp");
const retirementCarousel = document.getElementById("retirementCarousel");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let attempts = 0;
let investigationStarted = false;
let wheelTarget = null;
let wheelIdle;
const noMessages = [
    "Nice try 💀", "Why are you defending him?", "Lee isn't paying you to do this.",
    "Bro remembers the invention of Wi-Fi.", "JUST ACCEPT THAT HE'S OLD 😭",
    "Denial is the first stage of grief.", "... Just click yes.", "He isn't getting any younger.."
];

function keepNoButtonInViewport() {
    if (investigationStarted || noBtn.style.position !== "fixed") return;
    const margin = 8;
    const maxX = Math.max(margin, document.documentElement.clientWidth - noBtn.offsetWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - noBtn.offsetHeight - margin);
    noBtn.style.left = Math.min(maxX, Math.max(margin, parseFloat(noBtn.style.left))) + "px";
    noBtn.style.top = Math.min(maxY, Math.max(margin, parseFloat(noBtn.style.top))) + "px";
}
function moveNoButton() {
    if (investigationStarted) return;
    const margin = 8;
    const availableX = Math.max(0, document.documentElement.clientWidth - noBtn.offsetWidth - margin * 2);
    const availableY = Math.max(0, window.innerHeight - noBtn.offsetHeight - margin * 2);
    noBtn.style.position = "fixed";
    noBtn.style.left = margin + Math.random() * availableX + "px";
    noBtn.style.top = margin + Math.random() * availableY + "px";
    noMessage.textContent = noMessages[attempts % noMessages.length];
    attempts++;
}
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
window.addEventListener("resize", keepNoButtonInViewport);

const stampReady = certifiedStamp.decode().then(() => true).catch(() => false);
async function playStamp() {
    const loaded = await stampReady;
    if (!loaded) {
        console.warn("Stamp PNG could not load:", certifiedStamp.src);
        return;
    }
    stampOverlay.hidden = false;
    stampOverlay.classList.add("is-stamping");
    container.classList.add("stamp-impact");
    try {
        // Wait for browser to register active animations before inspecting them.
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const animations = stampOverlay.getAnimations({ subtree: true });
        await Promise.allSettled(animations.map(animation => animation.finished));
    } finally {
        stampOverlay.hidden = true;
        stampOverlay.classList.remove("is-stamping");
        container.classList.remove("stamp-impact");
    }
}
function showVerdict() {
    results.hidden = true;
    verdict.hidden = false;
    pageTitle.textContent = "AGE INVESTIGATION RESULTS";
    document.getElementById("verdictTitle").focus({ preventScroll: true });
    playStamp().catch(console.error);
}
yesBtn.addEventListener("click", function () {
    if (investigationStarted) return;
    investigationStarted = true;
    yesBtn.disabled = true;
    noBtn.disabled = true;
    noBtn.removeEventListener("mouseenter", moveNoButton);
    noBtn.removeEventListener("click", moveNoButton);
    document.querySelector(".lee-image").hidden = true;
    document.querySelector(".buttons").hidden = true;
    document.getElementById("introDisclaimer").hidden = true;
    noMessage.hidden = true;
    pageTitle.textContent = "ANALYZING LEE...";
    results.hidden = false;
    const messages = [
        "Scanning birth certificate...", "Analyzing joint deterioration...",
        "Checking bingo attendance records...", "Calculating remaining youth...",
        "Locating retirement homes in St. Louis...", "Confirming ancient status..."
    ];
    let progress = 0;
    scanText.textContent = messages[0];
    const scan = setInterval(function () {
        progress += 5;
        scanProgress.value = progress;
        const messageIndex = Math.min(Math.floor(progress / 20), messages.length - 1);
        scanText.textContent = messages[messageIndex];
        if (progress >= 100) {
            clearInterval(scan);
            setTimeout(showVerdict, 180);
        }
    }, 150);
});
function scrollHomes(direction) {
    wheelTarget = null;
    const card = retirementCarousel.querySelector(".home-card");
    const gap = parseFloat(getComputedStyle(retirementCarousel).columnGap) || 0;
    retirementCarousel.scrollBy({
        left: direction * (card.getBoundingClientRect().width + gap),
        behavior: reducedMotion.matches ? "instant" : "smooth"
    });
}
document.getElementById("prevHome").addEventListener("click", () => scrollHomes(-1));
document.getElementById("nextHome").addEventListener("click", () => scrollHomes(1));
retirementCarousel.addEventListener("wheel", function (event) {
    if (event.ctrlKey) return;
    const maxScroll = retirementCarousel.scrollWidth - retirementCarousel.clientWidth;
    let movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (event.deltaMode === 1) movement *= 16;
    if (event.deltaMode === 2) movement *= retirementCarousel.clientWidth;
    if (maxScroll <= 0 || movement === 0) return;
    const position = wheelTarget === null ? retirementCarousel.scrollLeft : wheelTarget;
    const atStart = position <= 1;
    const atEnd = position >= maxScroll - 1;
    if ((movement < 0 && atStart) || (movement > 0 && atEnd)) return;
    event.preventDefault();
    wheelTarget = Math.max(0, Math.min(maxScroll, position + movement));
    retirementCarousel.scrollTo({ left: wheelTarget, behavior: reducedMotion.matches ? "instant" : "smooth" });
    clearTimeout(wheelIdle);
    wheelIdle = setTimeout(() => { wheelTarget = null; }, 200);
}, { passive: false });
retirementCarousel.addEventListener("pointerdown", () => { wheelTarget = null; });


// Download a shareable PNG generated in-browser using the Canvas API.
const certificateButton = document.getElementById("downloadCertificate");
const certificateMessage = document.getElementById("certificateMessage");

certificateButton.addEventListener("click", async function () {
    certificateButton.disabled = true;
    certificateMessage.textContent = "Preparing Lee's official paperwork...";

    try {
        // Wait for the decorative stamp to load; fall back gracefully if it fails.
        let hasStamp = false;
        try {
            if (!certifiedStamp.complete) await certifiedStamp.decode();
            hasStamp = certifiedStamp.naturalWidth > 0;
        } catch (error) {
            console.warn("Stamp not available for certificate:", error);
        }

        const canvas = document.createElement("canvas");
        canvas.width = 1600;
        canvas.height = 1120;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas is unavailable.");

        // Paper, borders and corner flourishes.
        ctx.fillStyle = "#f7f0df";
        ctx.fillRect(0, 0, 1600, 1120);
        ctx.strokeStyle = "#8e2633";
        ctx.lineWidth = 16;
        ctx.strokeRect(42, 42, 1516, 1036);
        ctx.lineWidth = 3;
        ctx.strokeRect(67, 67, 1466, 986);

        ctx.textAlign = "center";
        ctx.fillStyle = "#252323";
        ctx.font = "bold 51px Georgia, serif";
        ctx.fillText("CERTIFICATE OF ADVANCED ELDERLINESS", 800, 198);

        ctx.font = "italic 32px Georgia, serif";
        ctx.fillText("This highly unofficial document hereby certifies that", 800, 272);

        ctx.fillStyle = "#8e2633";
        ctx.font = "bold 132px Georgia, serif";
        ctx.fillText("LEE", 800, 424);

        ctx.fillStyle = "#252323";
        ctx.font = "31px Georgia, serif";
        ctx.fillText("has been declared OLD beyond reasonable doubt.", 800, 486);

        ctx.font = "bold 30px Georgia, serif";
        ctx.fillText("Biological Age: 87", 800, 565);
        ctx.fillText("Youth Remaining: 0%", 800, 619);
        ctx.fillText("Fossil Probability: 100%", 800, 673);
        ctx.fillText("Retirement Status: IMMEDIATE", 800, 727);

        // Decorative stamp is deliberately small so it never obscures the text.
        if (hasStamp) {
            ctx.save();
            ctx.translate(1302, 811);
            ctx.rotate(-0.17);
            const maxWidth = 305;
            const maxHeight = 215;
            const scale = Math.min(maxWidth / certifiedStamp.naturalWidth, maxHeight / certifiedStamp.naturalHeight);
            const stampWidth = certifiedStamp.naturalWidth * scale;
            const stampHeight = certifiedStamp.naturalHeight * scale;
            ctx.globalAlpha = 0.88;
            ctx.drawImage(certifiedStamp, -stampWidth / 2, -stampHeight / 2, stampWidth, stampHeight);
            ctx.restore();
        }

        ctx.strokeStyle = "#252323";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(480, 885);
        ctx.lineTo(1120, 885);
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.fillStyle = "#252323";
        ctx.font = "italic 27px Georgia, serif";
        ctx.fillText("The Completely Unofficial Department of Elderly Affairs", 800, 925);
        ctx.font = "22px Georgia, serif";
        ctx.fillText("Approved by Lee's friends. No medical or scientific validity whatsoever.", 800, 1010);

        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
        if (!blob) throw new Error("PNG export failed.");
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Lees-Official-Retirement-Certificate.png";
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        certificateMessage.textContent = "Certificate generated! Check your downloads. 👴";
    } catch (error) {
        console.error("Certificate download failed:", error);
        certificateMessage.textContent = "Couldn't make the PNG. Check the browser console.";
    } finally {
        certificateButton.disabled = false;
    }
});
