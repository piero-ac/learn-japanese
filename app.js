const gameHTML = document.querySelector(".game-type");
let gameURL = window.location.search;

gameURL = gameURL.substring(gameURL.indexOf("=") + 1);
gameHTML.innerHTML = gameURL;
