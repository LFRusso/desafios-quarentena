const playerHpElement = document.getElementById('player-health');
const playerTotalHp = 274;
let playerHp = 274;

const opponentHpElement = document.getElementById('opponent-health');
const opponentTotalHp = 292;
let opponentHp = 292;

const turnText = document.getElementById('text');
let isTurnHappening = false;

const playerAttacks = {
  theWorld: {
    power: 40,
    accuracy: 100,
    name: 'The World',
    type: 'electric',
  },
  quickAttack: {
    power: 40,
    accuracy: 100,
    name: 'Quick Attack',
    type: 'normal',
  },
  starFinger: {
    power: 110,
    accuracy: 70,
    name: 'Star Finger',
    type: 'electric',
  },
  oraOra: {
    power: 80,
    accuracy: 80,
    name: 'Ora Ora!',
    type: 'fighting',
  }
}

const opponentAttacks = {
  theWorld: {
    power: 40,
    accuracy: 100,
    name: 'The World',
    type: 'normal',
    cooldown: 0,
  },
  mudaMuda: {
    power: 40,
    accuracy: 100,
    name: 'Muda Muda!',
    type: 'water',
  },
  knifeThrow: {
    power: 40,
    accuracy: 100,
    name: 'Knife Throw',
    type: 'water',
  },
  roadRoller: {
    power: 110,
    accuracy: 80,
    name: 'Road Roller',
    type: 'water',
  }
}


function chooseOpponentAttack () {
  // Put all opponents attacks in a array
  const possibleAttacks = Object.values(opponentAttacks);

  // Randomly chooses one attack from the array
  return possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)];
}

function turn(playerChosenAttack) {
  // Don't start another turn till the current one is not finished
  if (isTurnHappening) {
    return;
  }
  isTurnHappening = true;

  const didPlayerHit = playerAttack(playerChosenAttack);

  // Update HTML text with the used attack
  turnText.innerText = 'Jotaro Kujo used ' + playerChosenAttack.name;

  // Update HTML text in case the attack misses
  if (!didPlayerHit) {
    turnText.innerText += ', but missed';
  }
  turnText.innerText += "!";

  // Wait 2000ms to execute opponent attack (Player attack animation time)
  setTimeout(() => {
    // Randomly chooses opponents attack
    const opponentChosenAttack = chooseOpponentAttack();

    const didOpponentHit = opponentAttack(opponentChosenAttack);

    // Update HTML text with the used attack
    turnText.innerText = 'DIO used ' + opponentChosenAttack.name;

    // Update HTML text in case the attack misses
    if (!didOpponentHit) {
      turnText.innerText += ', but missed!';
    }
    turnText.innterText += "!";


    // Wait 2000ms to end the turn (Opponent attack animation time)
    setTimeout(() => {
      // Update HTML text for the next turn
      turnText.innerText = 'Please choose one attack';
      isTurnHappening = false;
    }, 2000);
  }, 2000);
}

// Set buttons click interaction
document.getElementById('the-world-button').addEventListener('click', function() {
  turn(playerAttacks.theWorld);
});
document.getElementById('quick-attack-button').addEventListener('click', function() {
  turn(playerAttacks.quickAttack);
});
document.getElementById('starfinger-button').addEventListener('click', function() {
  turn(playerAttacks.starFinger);
});
document.getElementById('oraora-button').addEventListener('click', function() {
  turn(playerAttacks.oraOra);
});
