const gameTitle = document.querySelector("#game-main h1");
const imgElement = document.querySelector("#char-img");
const guessForm = document.querySelector("#guessForm");
const guessInput = document.querySelector("#guessInput");
const resultsContainer = document.querySelector("#results");
const results = document.querySelector("#results h2");
const charParagraph = document.querySelector(".img-box p");

const hiraganaChars = {
    'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
    'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
    'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
    'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
    'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
    'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
    'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
    'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
    'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
    'wa': 'わ', 'wo': 'を',
    'n': 'ん'
}

const katakanaChars = {
    'a': 'ア', 'i': 'イ', 'u': 'ウ', 'e': 'エ', 'o': 'オ',
    'ka': 'カ', 'ki': 'キ', 'ku': 'ク', 'ke': 'ケ', 'ko': 'コ',
    'sa': 'サ', 'shi': 'シ', 'su': 'ス', 'se': 'セ', 'so': 'ソ',
    'ta': 'タ', 'chi': 'チ', 'tsu': 'ツ', 'te': 'テ', 'to': 'ト',
    'na': 'ナ', 'ni': 'ニ', 'nu': 'ヌ', 'ne': 'ネ', 'no': 'ノ',
    'ha': 'ハ', 'hi': 'ヒ', 'fu': 'フ', 'he': 'ヘ', 'ho': 'ホ',
    'ma': 'マ', 'mi': 'ミ', 'mu': 'ム', 'me': 'メ', 'mo': 'モ',
    'ya': 'ヤ', 'yu': 'ユ', 'yo': 'ヨ',
    'ra': 'ラ', 'ri': 'リ', 'ru': 'ル', 're': 'レ', 'ro': 'ロ',
    'wa': 'ワ', 'wo': 'ヲ',
    'n': 'ン'
}

// Dynamically Change the Title of the Game Page
let gameURL = window.location.search;
let gameType = gameURL.substring(gameURL.indexOf("=") + 1);
gameTitle.innerText = `Name the ${gameType} character`;


// Get a Shuffle Charset for the Game
const shuffledCharset = (gameType === 'Hiragana') ? shuffleCharset(hiraganaChars) : shuffleCharset(katakanaChars);

// Initial values
let currentIndex = 0;
let keys = Object.keys(shuffledCharset);
let currentChar = keys[currentIndex];
let numCorrect = 0;
charParagraph.innerText = shuffledCharset[currentChar];

resultsContainer.style.visibility = 'hidden';

// Event Listener to Submit Guess
guessForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Compare guess with currentChar
    const guess = guessInput.value.toLowerCase();

    if (guess === currentChar) {
        numCorrect++;
        displayMessage('correct');
    } else {
        displayMessage('incorrect');
    }
    // Clear the input
    guessInput.value = '';

    // Check if all characters have been displayed
    if (currentIndex === keys.length - 1) {
        displayFinalResult();
        // Disable the form inputs
        Array.from(guessForm.elements).forEach(formElement => formElement.disabled = true);

    } else {
        // Display the next character
        updateCharacterDisplayed();
    }
})

// Update character that appears
function updateCharacterDisplayed() {
    currentIndex++;
    currentChar = keys[currentIndex];
    charParagraph.innerText = shuffledCharset[currentChar];
}

// Display Guess Result
function displayMessage(result) {
    results.innerText = (result === 'correct') ? 'Correct!' : 'Incorrect!';
    resultsContainer.classList.add(result);
    resultsContainer.style.visibility = 'visible';

    setTimeout(() => {
        resultsContainer.classList.remove(result);
        resultsContainer.style.visibility = 'hidden';
        results.innerText = '';
    }, 800)
}

// Display Final Results Message
function displayFinalResult() {
    charParagraph.innerText = 'X';
    resultsContainer.classList.add('results');
    resultsContainer.style.visibility = 'visible';
    results.innerText = `You got ${numCorrect}/46!`;
}

// Shuffle the Charset
function shuffleCharset(charset) {
    const indexes = [];
    for (let i = 0; i < 46; i++) {
        indexes.push(i);
    }
    const keys = Object.keys(charset);
    const shuffledCharset = {};
    const shuffledIndexes = shuffleArray(indexes);
    let randomKey = '';

    for (let i = 0; i < shuffledIndexes.length; i++) {
        randomKey = keys[shuffledIndexes[i]];
        shuffledCharset[randomKey] = charset[randomKey];
    }

    return shuffledCharset;
}

// Shuffle Algorithm - Fisher-Yates (aka Knuth) Shuffle
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}





