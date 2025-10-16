// Initialize variables
const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'red', 'blue', 'green', 'purple', 'orange', 'pink'];
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;
let checkingCards = [];

// Initialize DOM elements
const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// Function to add cards to play area
function generateCards() {
    for (const color of cards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = '?';
        gameContainer.appendChild(card);
    }
}

// Function to shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to handle card clicks (with slight modification)
function handleCardClick(event) {
    const card = event.target;
    if (!card.classList.contains('card') || card.classList.contains('matched') || selectedCards.length >= 2 || checkingCards.includes(card)
         || selectedCards.includes(card) || timeLeft <= 0 || card.classList.contains('locked')) {
        return;
    }
    card.classList.add('locked');
    selectedCards.push(card);
    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;
    if (selectedCards.length === 2) {
        const currSelected = selectedCards.splice(0,2);
        console.log(selectedCards);
        checkingCards.push(currSelected);
        setTimeout(() => checkMatch(currSelected),500);
    }
}

// Function to check if selected cards are matching
function checkMatch(currSelected) {
    const [card1, card2] = currSelected;
    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }
    card1.classList.remove('locked');
    card2.classList.remove('locked');
}

// Function to initialize game
function startGame() {
    clearInterval(gameInterval);
    let timeLeft = 30;
    score = 0; // Reset score to zero
    scoreElement.textContent = `Score: ${score}`;
    startGameTimer(timeLeft);
    cards = shuffle(colors.concat(colors));
    selectedCards = [];
    gameContainer.innerHTML = '';
    generateCards();
    gameContainer.addEventListener('click', handleCardClick);
}

// Function to handle timer
function startGameTimer(timeLeft) {
    timerElement.textContent = `Time Left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            alert('Game Over!');
        }
    }, 1000);
}

// Add event listener to start button
startbtn.addEventListener('click', startGame);