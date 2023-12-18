const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const simbolos = [
    'A-libras',
    'B-libras',
    'C-libras',
    'D-libras',
    'E-libras',
    'F-libras',
    'G-libras',
    'H-libras',
    'I-libras',
    'J-libras',
    'k-libras',
    'L-libras',
    'M-libras',
    'N-libras',
    'O-libras',
    /*'P-libras',
    'Q-libras',
    'R-libras',
    'S-libras',
    'T-libras',
    'U-libras',
    'V-libras',
    'W-libras',
    'X-libras',
    'Y-libras',
    'Z-libras'*/
    
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 30) { // Número de cartas do jogo
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}!!! \n Seu tempo foi de: ${timer.innerHTML} segundos`);
    }
}

const checkCards = () => {
    const firstSimbolo = firstCard.getAttribute('data-simbolo');
    const secondSimbolo = secondCard.getAttribute('data-simbolo');

    if (firstSimbolo == secondSimbolo) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 600)
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const creatCard = (simbolo) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${simbolo}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-simbolo', simbolo);

    return card;
}

const loadGame = () => {
    const duplicateSimbolos = [ ...simbolos, ... simbolos ];

    const shuffledArray = duplicateSimbolos.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((simbolo) => {
        const card = creatCard(simbolo);
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
