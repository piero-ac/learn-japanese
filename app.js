const gameHTML = document.querySelector(".game-type");
const gameTitle = document.querySelector("#game-main h1");

let gameURL = window.location.search;
let gameType = gameURL.substring(gameURL.indexOf("=") + 1);

gameTitle.innerText = `Name the ${gameType} character`;
