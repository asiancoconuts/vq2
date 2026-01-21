// STATE VARIABLES
let noClicks = 1;
let yesClicks = -1; // IMPORTANT: start at -1 so first NO click shows index 0

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
];
const buttonMessages = [
  "???Are you sure??",
  "Ji-won please PLEASE",
  "My heart can't take it",
  "You can't do this to me!",
  "Please reconsider!!（>﹏<）",
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
];

// NO BUTTON CLICK LOGIC
noButton.addEventListener("click", () => {
  // Change GIF
  gifElement.src = gifs[noClicks % gifs.length];
  // Update NO button text
  noButton.textContent = buttonMessages[noClicks % maxNoClicks];

  // Update YES button text (driven by NO clicks)
  yesClicks = (yesClicks + 1) % buttonMessages2.length;
  yesButton.textContent = buttonMessages2[yesClicks];

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
