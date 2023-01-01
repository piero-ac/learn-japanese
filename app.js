const gameTitle = document.querySelector("#game-main h1");
const imgElement = document.querySelector("#char-img");
const guessForm = document.querySelector("#guessForm");
const results = document.querySelector("#results h2");

let gameURL = window.location.search;
let gameType = gameURL.substring(gameURL.indexOf("=") + 1);

gameTitle.innerText = `Name the ${gameType} character`;
