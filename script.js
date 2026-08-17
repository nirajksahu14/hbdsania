const PASSWORD = "1310";

const mediaAssets = [
  "https://res.cloudinary.com/vfzaqt3c/image/upload/v1786998048/WhatsApp_Image_2026-08-18_at_01.49.07_1.jpg",
  "https://res.cloudinary.com/vfzaqt3c/image/upload/v1786998048/WhatsApp_Image_2026-08-18_at_01.49.07_2.jpg",
  "https://res.cloudinary.com/vfzaqt3c/image/upload/v1786998048/WhatsApp_Image_2026-08-18_at_01.49.09_1.jpg",
  "https://res.cloudinary.com/vfzaqt3c/image/upload/v1786998048/WhatsApp_Image_2026-08-18_at_01.49.07.jpg",
  "https://res.cloudinary.com/vfzaqt3c/image/upload/v1786998048/WhatsApp_Image_2026-08-18_at_01.49.08.jpg",
  "https://res.cloudinary.com/vfzaqt3c/image/upload/v1786998048/WhatsApp_Image_2026-08-18_at_01.49.09.jpg"
];

const videoAssets = [
  "https://res.cloudinary.com/vfzaqt3c/video/upload/v1786998049/WhatsApp_Video_2026-08-18_at_01.49.08_1.mp4",
  "https://res.cloudinary.com/vfzaqt3c/video/upload/v1786998049/WhatsApp_Video_2026-08-18_at_01.49.08.mp4",
  "https://res.cloudinary.com/vfzaqt3c/video/upload/v1786998049/WhatsApp_Video_2026-08-18_at_01.49.09.mp4"
];

const letterText = `🎀🤍 Happy 15th Birthday, My Cutie 🤍🎀\n\nMy Dearest Cutie, 💖\n\nHappy 15th Birthday! 🥳🎂 I hope your day is filled with happiness, laughter, and beautiful memories. 🌸✨\n\nBirthdays aren't just about getting older—they're a reminder of how precious you truly are. Today is all about celebrating the amazing person you are. 🤍💖\n\nI hope this new year brings you happiness, good health, success, and the courage to follow your dreams. 🌈🌟\n\nIf I could make one wish for you today, I would remove every tear from your heart and fill it with endless happiness, hope, peace, love, and countless reasons to smile. 🌷✨ I hope every dream you hold close comes true, because you deserve a life filled with beautiful moments and all the joy in the world. 💖\n\nNever forget how special you are.\nHappy 15th Birthday❣️`;

const scenes = {
  lock: document.getElementById("lockScene"),
  lights: document.getElementById("lightsScene"),
  cake: document.getElementById("cakeScene"),
  loader: document.getElementById("loaderScene"),
  memory: document.getElementById("memoryScene"),
  final: document.getElementById("finalScene")
};

const birthdaySong = document.getElementById("birthdaySong");
const transitionVeil = document.getElementById("transitionVeil");
let candlesLit = false;
let candlesBlown = false;
let envelopeOpened = false;
let typewriterStarted = false;
let typewriterComplete = false;
let typewriterTimer = null;
let letterRevealTimer = null;
let songStarted = false;

function showScene(name) {
  Object.values(scenes).forEach(scene => scene.classList.remove("active"));
  scenes[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function cinematicTransition(next) {
  transitionVeil.classList.add("show");
  setTimeout(() => {
    next();
    setTimeout(() => transitionVeil.classList.remove("show"), 160);
  }, 480);
}

/* ---------------- PASSWORD ---------------- */
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const peekPassword = document.getElementById("peekPassword");

peekPassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  peekPassword.textContent = showing ? "♡" : "◉";
  peekPassword.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  passwordInput.focus();
});

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (passwordInput.value.trim() === PASSWORD) {
    passwordError.textContent = "";
    burstAt(window.innerWidth / 2, window.innerHeight / 2, 32, true);
    cinematicTransition(() => showScene("lights"));
  } else {
    passwordError.textContent = "Not quite, cutie. Try the birthday code again ♡";
    passwordForm.classList.remove("shake");
    void passwordForm.offsetWidth;
    passwordForm.classList.add("shake");
    burstAt(window.innerWidth / 2, window.innerHeight * .64, 8, false);
  }
});

/* ---------------- LIGHTS ON ---------------- */
const lightsWorld = document.getElementById("lightsWorld");
const lightSwitch = document.getElementById("lightSwitch");
const lightsNextBtn = document.getElementById("lightsNextBtn");
const lightsCopy = document.getElementById("lightsCopy");
let lightsOn = false;

lightSwitch.addEventListener("click", () => {
  if (lightsOn) return;
  lightsOn = true;
  lightsWorld.classList.add("lit");
  lightSwitch.setAttribute("aria-pressed", "true");
  lightSwitch.querySelector(".switch-knob").textContent = "☀";
  lightSwitch.querySelector(".switch-label").textContent = "lights on";
  lightsCopy.textContent = "Much better. Now there is one tiny birthday wish waiting for you. 🤍";
  burstAt(window.innerWidth / 2, Math.min(window.innerHeight * .48, 360), 34, true);
});

lightsNextBtn.addEventListener("click", () => {
  if (!lightsOn) return;
  cinematicTransition(() => {
    showScene("cake");
    prepareCakeScene();
  });
});

/* ---------------- CANDLES + MUSIC ---------------- */
const cakeStage = document.getElementById("cakeStage");
const blowCandlesBtn = document.getElementById("blowCandlesBtn");
const cakeNote = document.getElementById("cakeNote");
const smokeLayer = document.getElementById("smokeLayer");

function prepareCakeScene() {
  if (!candlesBlown) {
    candlesLit = true;
    cakeStage.classList.add("candles-lit");
    blowCandlesBtn.disabled = false;
    cakeNote.textContent = "Close your eyes. Make it a good wish. I’ll keep it secret. 🤍";
    setTimeout(() => {
      const rect = cakeStage.getBoundingClientRect();
      burstAt(rect.left + rect.width / 2, rect.top + rect.height * .34, 20, true);
    }, 420);
  }
}

blowCandlesBtn.addEventListener("click", async () => {
  if (!candlesLit || candlesBlown) return;
  candlesBlown = true;
  candlesLit = false;
  cakeStage.classList.remove("candles-lit");
  blowCandlesBtn.disabled = true;
  createSmoke();
  cakeNote.textContent = "Wish sent. The universe has officially been notified. 🤍";
  await startBirthdaySong();

  const rect = cakeStage.getBoundingClientRect();
  burstAt(rect.left + rect.width/2, rect.top + rect.height*.45, 48, true);
  setTimeout(() => cinematicTransition(() => {
    showScene("loader");
    beginLoader();
  }), 1250);
});

function createSmoke() {
  const candlePositions = [42, 46, 50, 54, 58];
  candlePositions.forEach((left, i) => {
    for (let j=0; j<3; j++) {
      const smoke = document.createElement("span");
      smoke.className = "smoke";
      smoke.style.left = `${left}%`;
      smoke.style.top = `${22 + i%2}%`;
      smoke.style.setProperty("--x", `${-22 + Math.random()*44}px`);
      smoke.style.animationDelay = `${j*.12 + i*.04}s`;
      smokeLayer.appendChild(smoke);
      setTimeout(() => smoke.remove(), 2400);
    }
  });
}

async function startBirthdaySong() {
  if (songStarted) return;
  songStarted = true;
  birthdaySong.volume = 0;
  birthdaySong.playbackRate = 0.92;
  try {
    await birthdaySong.play();
    fadeAudioTo(0.075, 2200);
  } catch (error) {
    songStarted = false;
    console.warn("Audio playback needs another user gesture.", error);
  }
}

function fadeAudioTo(targetVolume, duration = 900) {
  const startVolume = birthdaySong.volume;
  const startTime = performance.now();
  const step = now => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    birthdaySong.volume = startVolume + (targetVolume - startVolume) * eased;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------------- LOADER ---------------- */
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const progressStatus = document.getElementById("progressStatus");
const loaderText = document.getElementById("loaderText");
let loaderStarted = false;

const statusSteps = [
  [8, "warming up the stars"],
  [24, "polishing the pink sparkles"],
  [43, "collecting the prettiest moments"],
  [61, "threading the video memories"],
  [79, "sprinkling a suspicious amount of stardust"],
  [94, "sealing one very important letter"],
  [100, "ready for Sania ♡"]
];

async function beginLoader() {
  if (loaderStarted) return;
  loaderStarted = true;
  let artificial = 0;
  let assetsDone = 0;
  const totalAssets = mediaAssets.length + videoAssets.length;
  const minStart = performance.now();

  const tasks = [
    ...mediaAssets.map(src => preloadImage(src)),
    ...videoAssets.map(src => preloadVideoMetadata(src))
  ];

  tasks.forEach(task => task.finally(() => {
    assetsDone += 1;
  }));

  const tick = () => {
    const assetPercent = totalAssets ? (assetsDone / totalAssets) * 100 : 100;
    artificial = Math.min(96, artificial + (artificial < 65 ? 1.45 : .6));
    const elapsed = performance.now() - minStart;
    const timePercent = Math.min(100, (elapsed / 3600) * 100);
    let value = Math.min(99, Math.max(artificial, Math.min(assetPercent, 94), timePercent*.78));

    if (assetsDone === totalAssets && elapsed > 2800) value = 100;
    updateProgress(Math.round(value));

    if (value >= 100) {
      setTimeout(() => cinematicTransition(() => {
        showScene("memory");
        initMemoryExperience();
      }), 650);
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  setTimeout(() => {
    if (assetsDone < totalAssets) {
      assetsDone = totalAssets;
      loaderText.textContent = "Everything important is here. The rest can keep loading quietly in the background ♡";
    }
  }, 7600);
}

function updateProgress(value) {
  progressFill.style.width = `${value}%`;
  progressLabel.textContent = `${value}%`;
  const current = [...statusSteps].reverse().find(step => value >= step[0]);
  if (current) progressStatus.textContent = current[1];
}

function preloadImage(src) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}
function preloadVideoMetadata(src) {
  return new Promise(resolve => {
    const video = document.createElement("video");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      video.src = "";
      resolve();
    };
    video.preload = "metadata";
    video.muted = true;
    video.addEventListener("loadedmetadata", finish, { once:true });
    video.addEventListener("error", finish, { once:true });
    video.src = src;
    setTimeout(finish, 6000);
  });
}

/* ---------------- MEMORY EXPERIENCE ---------------- */
let memoryInitialized = false;
function initMemoryExperience() {
  if (memoryInitialized) return;
  memoryInitialized = true;
  initScrollReveal();
  initVideoCards();
  updateStoryProgress();
  window.addEventListener("scroll", updateStoryProgress, { passive:true });
}

function initScrollReveal() {
  // Ordinary text blocks reveal as they enter. Media groups are handled separately
  // so photos/videos arrive one-by-one instead of all at once.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .14, rootMargin: "0px 0px -7% 0px" });
  document.querySelectorAll(".reveal-scroll:not(.sequence-reveal)").forEach(el => observer.observe(el));

  const groups = [
    document.querySelector(".collage-grid"),
    document.querySelector(".film-grid"),
    document.querySelector(".postcard-grid")
  ].filter(Boolean);

  const groupObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const items = [...entry.target.querySelectorAll(".sequence-reveal")];
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("in-view");
          const rect = item.getBoundingClientRect();
          burstAt(rect.left + rect.width * .5, Math.min(window.innerHeight - 40, rect.top + rect.height * .35), 5, false);
        }, index * 430);
      });
      groupObserver.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -5% 0px" });

  groups.forEach(group => groupObserver.observe(group));
}

function initVideoCards() {
  document.querySelectorAll(".video-shell").forEach(shell => {
    const video = shell.querySelector("video");
    const button = shell.querySelector(".video-play");
    button.addEventListener("click", async () => {
      if (video.paused) {
        document.querySelectorAll(".video-shell video").forEach(v => { if (v !== video) v.pause(); });
        document.querySelectorAll(".video-shell").forEach(s => s.classList.remove("playing"));
        try {
          await video.play();
          shell.classList.add("playing");
          button.textContent = "❚❚";
        } catch (e) { console.warn(e); }
      } else {
        video.pause();
        shell.classList.remove("playing");
        button.textContent = "▶";
      }
    });
    video.addEventListener("pause", () => {
      shell.classList.remove("playing");
      button.textContent = "▶";
    });
  });

  const autoPause = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target.querySelector("video");
      if (!entry.isIntersecting && !video.paused) video.pause();
    });
  }, { threshold:.25 });
  document.querySelectorAll(".video-shell").forEach(shell => autoPause.observe(shell));
}

function updateStoryProgress() {
  if (!scenes.memory.classList.contains("active")) return;
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  const value = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
  document.getElementById("storyProgress").style.width = `${value}%`;
}

document.getElementById("storyHomeBtn").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("musicToggle").addEventListener("click", async event => {
  const button = event.currentTarget;
  if (birthdaySong.paused) {
    try {
      await birthdaySong.play();
      fadeAudioTo(.075, 700);
      button.classList.remove("paused");
      button.textContent = "♫";
    } catch (e) { console.warn(e); }
  } else {
    fadeAudioTo(0, 500);
    setTimeout(() => birthdaySong.pause(), 520);
    button.classList.add("paused");
    button.textContent = "♩";
  }
});

/* ---------------- ENVELOPE + HANDWRITTEN TYPEWRITER ---------------- */
const envelope = document.getElementById("envelope");
const envelopeStage = document.getElementById("envelopeStage");
const letterTakeover = document.getElementById("letterTakeover");
const letterPaper = document.getElementById("letterPaper");
const letterTypedTitle = document.getElementById("letterTypedTitle");
const letterTypedBody = document.getElementById("letterTypedBody");
const typeCaret = document.getElementById("typeCaret");
const tapNote = document.getElementById("tapNote");
const skipLetterBtn = document.getElementById("skipLetterBtn");
const endMark = document.getElementById("endMark");
const finalRevealBtn = document.getElementById("finalRevealBtn");

const letterParts = letterText.split("\n\n");
const letterHeadingText = letterParts.shift() || "Happy 15th Birthday ♡";
const letterBodyText = letterParts.join("\n\n");

envelope.addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;
  document.body.classList.add("letter-mode");
  envelope.classList.add("launching");
  envelope.setAttribute("aria-expanded", "true");
  tapNote.classList.add("fading");
  burstAt(window.innerWidth/2, window.innerHeight*.54, 34, true);

  // The envelope stays where it is and simply dissolves. No upward travel on mobile.
  setTimeout(() => envelope.classList.add("fading"), 170);
  setTimeout(() => {
    letterTakeover.classList.add("active");
    letterTakeover.setAttribute("aria-hidden", "false");
  }, 230);
  setTimeout(() => {
    letterTakeover.classList.add("paper-visible");
    letterPaper.focus({ preventScroll:true });
  }, 560);

  letterRevealTimer = setTimeout(startTypewriter, 980);
});

function startTypewriter() {
  if (typewriterStarted || typewriterComplete) return;
  typewriterStarted = true;
  letterTypedTitle.textContent = "";
  letterTypedBody.textContent = "";
  typeCaret.style.display = "inline-block";

  const titleChars = Array.from(letterHeadingText);
  const bodyChars = Array.from(letterBodyText);
  let phase = "title";
  let index = 0;

  const typeNext = () => {
    if (typewriterComplete) return;

    const chars = phase === "title" ? titleChars : bodyChars;
    const target = phase === "title" ? letterTypedTitle : letterTypedBody;

    if (index >= chars.length) {
      if (phase === "title") {
        phase = "body";
        index = 0;
        typewriterTimer = setTimeout(typeNext, 260);
        return;
      }
      finishLetterTyping();
      return;
    }

    const char = chars[index++];
    target.textContent += char;

    // Follow the ink as it reaches the bottom, without moving the paper itself.
    const nearBottom = letterPaper.scrollHeight - letterPaper.clientHeight - letterPaper.scrollTop < 160;
    if (nearBottom) letterPaper.scrollTop = letterPaper.scrollHeight;

    let delay = phase === "title" ? 28 : 17;
    if (char === "\n") delay = 105;
    else if (/[.!?]/.test(char)) delay = 78;
    else if (/[,—]/.test(char)) delay = 43;
    else delay += Math.random() * 14;
    typewriterTimer = setTimeout(typeNext, delay);
  };

  typeNext();
}

function finishLetterTyping() {
  if (typewriterComplete) return;
  typewriterComplete = true;
  if (typewriterTimer) clearTimeout(typewriterTimer);
  typeCaret.style.display = "none";
  skipLetterBtn.classList.add("done");

  // The typewriter follows the newest line while writing. Once finished,
  // gently return to the top so the complete letter begins where it should.
  window.setTimeout(() => {
    letterPaper.classList.add("is-returning");
    letterPaper.scrollTo({ top: 0, behavior: "smooth" });
  }, 260);

  window.setTimeout(() => {
    finalRevealBtn.classList.add("show");
    finalRevealBtn.focus({ preventScroll: true });
    const rect = finalRevealBtn.getBoundingClientRect();
    burstAt(rect.left + rect.width/2, Math.max(70, rect.top), 15, false);
  }, 820);
}

function skipLetterAnimation() {
  if (!envelopeOpened || typewriterComplete) return;
  if (letterRevealTimer) clearTimeout(letterRevealTimer);
  if (typewriterTimer) clearTimeout(typewriterTimer);

  envelope.classList.add("fading");
  letterTakeover.classList.add("active", "paper-visible");
  letterTakeover.setAttribute("aria-hidden", "false");
  typewriterStarted = true;
  letterTypedTitle.textContent = letterHeadingText;
  letterTypedBody.textContent = letterBodyText;
  letterPaper.scrollTop = 0;
  finishLetterTyping();
  requestAnimationFrame(() => { letterPaper.scrollTop = 0; });
}

skipLetterBtn.addEventListener("click", skipLetterAnimation);

finalRevealBtn.addEventListener("click", () => {
  finalRevealBtn.disabled = true;
  burstAt(window.innerWidth/2, window.innerHeight*.72, 44, true);
  cinematicTransition(() => {
    document.body.classList.remove("letter-mode");
    letterTakeover.classList.remove("active", "paper-visible");
    letterTakeover.setAttribute("aria-hidden", "true");
    showScene("final");
    launchFinalConfetti();
  });
});

function launchFinalConfetti() {
  const layer = document.getElementById("confettiRain");
  if (!layer) return;
  const colors = ["#ef6f9a", "#cf4f7d", "#d8c5f3", "#f4c56f", "#ffffff", "#ffb8cf"];

  const dropRound = (amount = 70) => {
    for (let i = 0; i < amount; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = `${6 + Math.random() * 7}px`;
      piece.style.height = `${9 + Math.random() * 14}px`;
      piece.style.borderRadius = Math.random() > .55 ? "50%" : "3px";
      piece.style.setProperty("--fall", `${3.2 + Math.random() * 2.4}s`);
      piece.style.setProperty("--delay", `${Math.random() * .8}s`);
      piece.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
      piece.style.setProperty("--spin", `${540 + Math.random() * 1080}deg`);
      layer.appendChild(piece);
      setTimeout(() => piece.remove(), 7200);
    }
  };

  dropRound(95);
  setTimeout(() => dropRound(70), 900);
  setTimeout(() => dropRound(55), 1900);
  burstAt(window.innerWidth / 2, window.innerHeight * .45, 70, true);
}

/* ---------------- STARDUST ON TOUCH / CLICK ---------------- */
const canvas = document.getElementById("sparkCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let dpr = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const symbols = ["✦","✧","♡","⋆","·"];
function burstAt(x, y, count = 12, strong = false) {
  const palette = ["#ef6f9a", "#cf4f7d", "#b99ada", "#e0b36c", "#f7abc4", "#ffffff"];
  for (let i=0; i<count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (strong ? 1.8 : .8) + Math.random() * (strong ? 4.2 : 2.2);
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (strong ? 1.5 : .4),
      life: 1,
      decay: .016 + Math.random() * .022,
      size: 9 + Math.random() * (strong ? 14 : 9),
      color: palette[Math.floor(Math.random()*palette.length)],
      symbol: symbols[Math.floor(Math.random()*symbols.length)],
      rotation: Math.random() * Math.PI,
      vr: (-.07 + Math.random()*.14)
    });
  }
}

function animateParticles() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += .025;
    p.vx *= .992;
    p.life -= p.decay;
    p.rotation += p.vr;
    ctx.save();
    ctx.globalAlpha = Math.max(0,p.life);
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.font = `${p.size}px Georgia, serif`;
    ctx.fillText(p.symbol,0,0);
    ctx.restore();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

let lastPointerBurst = 0;
window.addEventListener("pointerdown", event => {
  if (event.pointerType === "mouse" || event.pointerType === "touch" || event.pointerType === "pen") {
    burstAt(event.clientX,event.clientY,10,false);
  }
});
window.addEventListener("pointermove", event => {
  const now = performance.now();
  if (event.pointerType === "touch" && now - lastPointerBurst > 90) {
    burstAt(event.clientX,event.clientY,3,false);
    lastPointerBurst = now;
  }
}, { passive:true });

/* ---------------- AMBIENT FLOATERS ---------------- */
(function initFloaties(){
  const container = document.getElementById("floaties");
  const chars = ["♡","✦","✧","⋆","♡","·"];
  for(let i=0;i<26;i++){
    const el = document.createElement("span");
    el.className = "floating-symbol";
    el.textContent = chars[i % chars.length];
    el.style.left = `${Math.random()*100}%`;
    el.style.fontSize = `${9 + Math.random()*15}px`;
    el.style.setProperty("--dur", `${12 + Math.random()*18}s`);
    el.style.setProperty("--delay", `${-Math.random()*18}s`);
    el.style.setProperty("--drift", `${-55 + Math.random()*110}px`);
    el.style.setProperty("--blur", `${Math.random() > .8 ? 1 : 0}px`);
    container.appendChild(el);
  }
})();

/* Small keyboard nicety */
passwordInput.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    passwordInput.value = "";
    passwordError.textContent = "";
  }
});
