'use strict';

// Selecionando os elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Declaração das variáveis
let scores;
let currentScore;
let activePlayer;
let playing;

// Iniciando o jogo
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Resetamos os current values, o score e removemos o player que venceu
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  // Adiciona a classe hidden para esconder o dado.
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // Adicionamos o player active no primeiro jogador, para resetar a ordem.
  player0El.classList.add('player--active');
  // Removemos o player active do segundo jogador, caso resetemos quando ele estiver jogando.
  player1El.classList.remove('player--active');
};

init();

// Muda para o outro jogador.
const switchPlayer = () => {
  // Altera o score atual antes de mudar o para o próximo player
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // Reseta o score atual
  currentScore = 0;
  // Caso o dado sorteado seja 1, o score atual é zerado e o player ativo é alterado
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Alterando o background do player ativo
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  // Caso o jogo não haja vencedor, temos que o jogo continuará
  if (playing) {
    // Gerando um número aleatório
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Removendo a classe hidden
    diceEl.classList.remove('hidden');
    // Exibindo a imagem do dado sorteado usando a propriedade src
    diceEl.src = `dice-${dice}.png`;

    // Verificando se o dado sorteado é 1
    if (dice !== 1) {
      // Adicionando o valor sorteado ao score atual
      currentScore += dice;
      // Seleciona o player ativo e armazena o valor do score atual
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // Adiciona o score atual no player ativo.
    scores[activePlayer] += currentScore;

    // Alteramos o score do player ativo
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // Setamos o estado do jogo como false caso haja um vencedor
      playing = false;
      // Finaliza o jogo
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Remove a classe active
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Muda para o próximo player
      switchPlayer();
    }
  }
});

// Resetando o jogo chamando a função init
btnNew.addEventListener('click', init);
