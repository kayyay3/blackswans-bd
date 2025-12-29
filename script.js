const loginPage = document.getElementById("login-page");
const greetingPage = document.getElementById("greeting-page");

const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");
const loginErr = document.getElementById("login-error");

// logic
loginBtn.addEventListener("click", () => {
    const password = passwordInput.value.toLowerCase();

    if (password == "birthday") {
        // hide login
        loginPage.classList.add("hidden");

        // show greeting
        greetingPage.classList.remove("hidden");

        startConfetti(); 
        bgm.play().catch(() => {});

        const catSfx = document.getElementById("cat-sfx");
        catSfx.volume = 0.6;
        
        catSfx.currentTime = 0; 
        catSfx.play().catch(() => {});

        setTimeout(() => {
            document.getElementById("gift-page").classList.remove("hidden");
        }, 2000);
    } else {
        loginErr.textContent = "Uhm.. I don't think it's the right one.. :<";
    }
});

passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        loginBtn.click();
    }
});

// confetti
function startConfetti() {
    const left = document.querySelector(".confetti.left");
    const right = document.querySelector(".confetti.right");

    for (let i = 0; i < 70; i++) {
        createConfettiPiece(left);
        createConfettiPiece(right);
    }
}

function createConfettiPiece(container) {
    const piece = document.createElement("div");

    const size = Math.random() * 8 + 8;
    piece.style.width = size + "px";
    piece.style.height = size + "px";

    piece.style.background = getRandomColor();
    piece.style.position = "absolute";
    piece.style.top = "-20px";
    piece.style.left = Math.random() * 40 + "px";
    piece.style.opacity = Math.random();

    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    piece.style.animation = "fallspin 4s linear infinite";
    piece.style.animationDelay = Math.random() * 2 + "s";

    container.appendChild(piece);
}

function getRandomColor() {
    const colors = ["#ffb3c6", "#ffd6a5", "#cdb4db", "#bde0fe"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// gift
const giftBox = document.getElementById("giftBox");

let startY = 0;
let isDragging = false;
let giftOpened = false;

giftBox.addEventListener("mousedown", (e) => {
  isDragging = true;
  startY = e.clientY;
});

document.addEventListener("mouseup", (e) => {
  if (!isDragging || giftOpened) return;

  const endY = e.clientY;
  const distance = startY - endY;

  if (distance > 80) {
    openGift();
  }

  isDragging = false;
});

giftBox.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

giftBox.addEventListener("touchend", (e) => {
  if (giftOpened) return;

  const endY = e.changedTouches[0].clientY;
  const distance = startY - endY;

  if (distance > 80) {
    openGift();
  }
});

function openGift() {
  if (giftOpened) return;
  giftOpened = true;

  giftBox.classList.add("open");

  setTimeout(() => {
    giftBox.classList.add("show-cat");
        
    const meow = document.getElementById("meow");
    meow.volume = 1;
        
    meow.currentTime = 0; 
    meow.play().catch(() => {});

    document.getElementById("cake-page").classList.remove("hidden");

    setTimeout(() => {
      document.getElementById("cake-page").scrollIntoView({behavior: "smooth"});
      document.getElementById("hint").classList.add("hidden");
    }, 3000);

  }, 800);
}

// cake
const cakeArea = document.getElementById("cakeArea");

let cakeStartY = 0;
let isDraggingCake = false;
let cakeCut = false;

// ===== DESKTOP =====
cakeArea.addEventListener("mousedown", (e) => {
  if (cakeCut) return;
  isDraggingCake = true;
  cakeStartY = e.clientY;
});

document.addEventListener("mouseup", (e) => {
  if (!isDraggingCake || cakeCut) return;

  const distance = e.clientY - cakeStartY;

  if (distance > 80) {
    cutCake();
  }

  isDraggingCake = false;
});

// ===== MOBILE =====
cakeArea.addEventListener("touchstart", (e) => {
  if (cakeCut) return;
  isDraggingCake = true;
  cakeStartY = e.touches[0].clientY;
});

cakeArea.addEventListener("touchend", (e) => {
  if (!isDraggingCake || cakeCut) return;

  const distance = e.changedTouches[0].clientY - cakeStartY;

  if (distance > 80) {
    cutCake();
  }

  isDraggingCake = false;
});

function cutCake() {
  cakeCut = true;
  cakeArea.classList.add("cut");
}

const envelope = document.getElementById("envelope");

envelope.addEventListener("click", () => {
  envelope.src = "assets/envelope-open.png";

  setTimeout(() => {

    const crunch = document.getElementById("crunch");
    crunch.volume = 0.7;

    crunch.currentTime = 0;
    crunch.play().catch(() => {});

    document.getElementById("cake-page").classList.add("hidden");
    document.getElementById("greeting-page").classList.add("hidden");
    document.getElementById("gift-page").classList.add("hidden");
    document.getElementById("letter-page").classList.remove("hidden");

    window.scrollTo(0, 0); 
  }, 400);
});

const goBack = document.getElementById("back-btn");

goBack.addEventListener("click", () => {
    document.getElementById("cake-page").classList.remove("hidden");
    document.getElementById("greeting-page").classList.remove("hidden");
    document.getElementById("gift-page").classList.remove("hidden");
    document.getElementById("letter-page").classList.add("hidden");

    window.scrollTo(0, 3); 
});

const musicBtn = document.getElementById("music-toggle");
let musicOn = true;

musicBtn.addEventListener("click", () => {
    if (musicOn) {
        bgm.pause();
        musicBtn.textContent = "🔇";
    } else {
        bgm.play();
        musicBtn.textContent = "🔊";
    }
    musicOn = !musicOn;
});




