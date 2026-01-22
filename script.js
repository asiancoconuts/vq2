// STATE VARIABLES
let noClicks = 1;
let yesClicks = -1; // IMPORTANT: start at -1 so first NO click shows index 0
let lastGifIndex = -1;

let lastNoTextIndex = -1;
let secondLastNoTextIndex = -1;

let lastYesTextIndex = -1;
let secondLastYesTextIndex = -1;

const maxNoClicks = 5;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1;

// DOM ELEMENTS
const gifElement = document.getElementById("togepi-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// ASSETS
const gifs = [
  //  "assets/images/togepi-happy.gif", //edited out to separate happy gif
  "assets/images/togepi-sad-1.gif",
  "assets/images/togepi-sad-2.gif",
  "assets/images/togepi-crying.gif",
  "assets/images/togepi-crying-2.gif",
  "assets/images/squirtle-crying.gif",
  "assets/images/squirtle-crying-2.gif",
  "assets/images/squirtle-crying-3.gif",
  "assets/images/pikachu-crying.gif",
  "assets/images/jigglypuff-crying.gif",
];
const buttonMessages = [
  "???Are you sure??",
  "Ji-won please PLEASE",
  "My heart can't take it",
  "You can't do this to me!",
  "Please reconsider!（>﹏<）",
  "Valentines alone...",
  "I'll pretend I'm not hurt",
  "You're like ..super sure?",
  "I respect your decision :(",
  "Noted and journaled💔💔",
];
const buttonMessages2 = [
  "You want to click here!",
  "I think you misclicked",
  "Ok... please click here",
  "Click HERE for Levi",
  "...Yes... please...(´•︵•`)",
  "PLZPLZZPLZPZLZPLZ",
  "Click for SKZ VIP TIX",
  "haha... click here...",
  "Click me for good luck",
  "This is the correct one",
  "Free Levi Plushie",
  "(つ╥﹏╥)つ🙏🙏🙏"
];

// NO BUTTON CLICK LOGIC
noButton.addEventListener("click", () => {
  // Change GIF
// RANDOM GIF WITH NO REPEATS
let randomIndex;
do {
  randomIndex = Math.floor(Math.random() * gifs.length);
} while (randomIndex === lastGifIndex);

lastGifIndex = randomIndex;
gifElement.src = gifs[randomIndex];  // Update NO button text

// RANDOM NO TEXT WITH NO DOUBLE REPEATS
let randomNoIndex;

do {
  randomNoIndex = Math.floor(Math.random() * buttonMessages.length);
} while (
  randomNoIndex === lastNoTextIndex || 
  randomNoIndex === secondLastNoTextIndex
);

// shift history
secondLastNoTextIndex = lastNoTextIndex;
lastNoTextIndex = randomNoIndex;

noButton.textContent = buttonMessages[randomNoIndex];

// RANDOM YES TEXT WITH NO DOUBLE REPEATS
let randomYesIndex;

do {
  randomYesIndex = Math.floor(Math.random() * buttonMessages2.length);
} while (
  randomYesIndex === lastYesTextIndex ||
  randomYesIndex === secondLastYesTextIndex
);

// shift history
secondLastYesTextIndex = lastYesTextIndex;
lastYesTextIndex = randomYesIndex;

yesButton.textContent = buttonMessages2[randomYesIndex];

  // Resize NO button to fit text
  noButton.style.width = "auto";
  noButton.style.width = `${noButton.scrollWidth}px`;

  // Shrink NO button
  if (noScale > minNoScale) {
    noScale -= 0.1;
    noButton.style.transform = `scale(${noScale})`;
    yesButton.addEventListener("click", () => {
      gifElement.src = "assets/images/togepi-happy.gif";
    });
  }

  // Grow YES button (using actual rendered width)
  const scaledWidth = yesButton.getBoundingClientRect().width;

  if (scaledWidth < maxYesWidth) {
    yesScale += 0.5;
    yesButton.style.transform = `scale(${yesScale})`;

    // Adjust gap
    const rootStyles = getComputedStyle(document.documentElement);
    const gapScaleFactor =
      parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

    const currentGap = parseFloat(buttonContainer.style.gap) || 20;
    const newGap = Math.sqrt(currentGap * gapScaleFactor);
    buttonContainer.style.gap = `${newGap}px`;
  }
  // Increment NO click count
  noClicks++;
});
