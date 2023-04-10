const card = document.querySelectorAll('.cell');
const front = document.querySelectorAll('.front');
let time = document.getElementById('time');
let result = document.getElementById('result');
let playagain = document.getElementById('playagain');

playagain.style.display = 'none';
let count = 30;
let timeoutID;
let clickingTimeoutIDs = []; // an array to hold all timeout IDs used in the clicking function

function countdown() {
  time.textContent = count;
  count--;

  if (count < 0) {
    result.textContent = "You Lose";
    return;
  }

  timeoutID = setTimeout(countdown, 1000);
}

countdown();

suffleImage();
clicking();

function suffleImage() {
  card.forEach(c => {
    const num = [...Array(card.length).keys()];
    const random = Math.floor(Math.random() * card.length);

    c.style.order = num[random];
  })
}

function clicking() {
  for (let i = 0; i < card.length; i++) {

    front[i].classList.add('show')

    let timeoutId = setTimeout(function () {
      front[i].classList.remove('show')
      timeoutId = null;
    }, 2000)

    clickingTimeoutIDs.push(timeoutId); // add the timeout ID to the array

    card[i].addEventListener("click", () => {
      front[i].classList.add("flip");

      const flippcard = document.querySelectorAll('.flip')

      if (flippcard.length == 2) {
        match(flippcard[0], flippcard[1]);
      }
    })

    card[i].addEventListener("click", () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    })
  }
}

function checkWin() {
  let allMatch = true;
  card.forEach(c => {
    if (!c.classList.contains('match')) {
      allMatch = false;
    }
  });

  if (allMatch) {
    console.log("You Win"); // log to console for debugging purposes
    result.innerHTML = "You Win";
    clearTimeout(timeoutID);

  }
}



function match(cardone, cardtwo) {
  if (cardone.dataset.index == cardtwo.dataset.index) {
    cardone.classList.remove("flip");
    cardtwo.classList.remove("flip");
    cardone.classList.add("match");
    cardtwo.classList.add("match");

    // Check for a win after the last match
    setTimeout(() => {
      const allMatch = document.querySelectorAll('.match');
      if (allMatch.length == card.length) {
        console.log("You Win"); // log to console for debugging purposes
        result.innerHTML = "You Win";
        playagain.style.display = "inline";
        clearTimeout(timeoutID);
        clickingTimeoutIDs.forEach(id => clearTimeout(id)); // clear all the timeouts used in clicking function
      }
    }, 1000);
  } else {
    setTimeout(() => {
      cardone.classList.remove("flip");
      cardtwo.classList.remove("flip");
    }, 1000)
  }
}
