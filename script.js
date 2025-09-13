const radio = document.getElementById("radio");
const nextButton = document.getElementById("nextButton");
const bgtext = document.getElementById("bgtext");
const parallaxBg = document.getElementById("parallax-bg");
const playlist = [
  "sound4c.wav",
  "sound6d_2.wav",
  "siro.wav",
  "ghostrifter-back-home.mp3",
  "extenz-life.mp3",
  "DDLCxDeltaruneOST--YULE-TOAD-2024-Day-6B-Messin-With-Ya.mp3",
];

const iridescent_bg_objects = document.getElementsByClassName("iridescent-bg");
const fastSongs = ["sound6d_2.wav", "siro.wav"];

let currentTrackIndex = 0;

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

shuffle(playlist);

function playNextSong() {
  currentTrackIndex++;
  if (currentTrackIndex >= playlist.length) {
    currentTrackIndex = 0;
  }
  radio.src = playlist[currentTrackIndex];
  radio.load();
  radio.play();

  if (fastSongs.includes(playlist[currentTrackIndex])) {
    Object.values(iridescent_bg_objects).forEach((obj) =>
      obj.classList.add("iridescent-bg-fast"),
    );
  } else {
    Object.values(iridescent_bg_objects).forEach((obj) =>
      obj.classList.remove("iridescent-bg-fast"),
    );
  }
}

radio.src = playlist[currentTrackIndex];
radio.load();

nextButton.addEventListener("click", playNextSong);
let num = 0;
function addNum() {
  num += 1;
  bgtext.textContent = num.toString();
}

setInterval(addNum, 1);

window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset;
  const speed = 0.95;
  parallaxBg.style.transform = `translateY(${scrollPosition * speed}px)`;
});

let rotationSpeed = 0;
let rotationInterval = null;
let currentRotation = 0;

function resetSlider() {
  const slider = document.getElementById("brbrs");
  slider.value = 0;
  document.getElementById("speed-value").textContent = "0%";
  rotationSpeed = 0;
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
}

function updateRotation() {
  currentRotation += rotationSpeed;
  document.getElementById("b").style.transform =
    `rotate(${currentRotation}deg)`;
}

function toggleRotation() {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
  if (rotationSpeed !== 0) {
    rotationInterval = setInterval(updateRotation, 20);
  }
}

document.getElementById("brbrs").addEventListener("input", function () {
  rotationSpeed = (this.value * this.value * this.value) / 10000;
  document.getElementById("speed-value").textContent =
    (this.value * this.value * this.value * this.value) / 100 + "%🔥🤩";

  if (!rotationInterval && rotationSpeed !== 0) {
    toggleRotation();
  }

  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = setInterval(updateRotation, 20);
  }
});

document.getElementById("brbrs").addEventListener("change", function () {
  if (this.value == 0 && rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
});
var isGvisible = false;
document.getElementById("toggleButton").addEventListener("click", function () {
  if (!isGvisible) {
    var audio = new Audio("slot-machine.mp3");
    audio.play();

    isGvisible = true;
    window.scrollTo(0, 16000);
  }
});
