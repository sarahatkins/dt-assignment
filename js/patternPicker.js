//item variables
var arrItems = ["circle", "square", "triangle"];
var arrItems2 = ["#circle", "#square", "#triangle"];
//for checking generated pattern
var arrCheck = [];
// for putting pattern on screen
var genPattern = [];
//the pattern the player inputs
var arrOnePatt = [];
var arrTwoPatt = [];
//used for checking how many clicks
var playerOneClick = 0;
var playerTwoClick = 0;
//add points
var oneScore = 0;
var twoScore = 0;
//player check
var arrplayer1 = ['87', '68', '65']; //w, d, a
var arrplayer2 = ['38', '39', '37'];
//settings to check if what way the images show up and are checked
var displaySet = localStorage.setItem('display', 'left');
//setting highscore
var highscore = localStorage.getItem('highScore'); //sets it to zero every time
//setting currentPage
var currentPage = "welcome";


function startGame() {
  document.querySelector(".pages").style.display = "none";
  document.querySelector(".startCount").style.display = "block";
  document.querySelector("#three").style.display = "block";
  document.getElementById("waitCount").play();
  document.getElementById("homeMusic").pause();
  setTimeout(function () {
    document.querySelector("#three").style.display = "none";
    document.querySelector("#two").style.display = "block";
    document.getElementById("waitCount").play();
    setTimeout(function () {
      document.querySelector("#two").style.display = "none";
      document.querySelector("#one").style.display = "block";
      document.getElementById("goCount").play();
      setTimeout(function () {
        document.querySelector(".startCount").style.display = "none";
        // document.querySelector("#one").style.display = "none";
        document.querySelector("#game").style.display = "block";
        document.getElementById("gameMusic").play();
      }, 1000);
    }, 1000);
  }, 1000);
  generatePattern(genPattern, arrCheck);
  reactPlayer();
}

function gameOver() {
  document.querySelector("#game").style.display = "none";
  document.querySelector("#gameOverPg").style.display = "flex";
  currentPage = "gameOver";
  document.getElementById("gameOver").play();
  findWinner();
  document.getElementById('oneScoreFin').innerHTML = "Player 1 : " + oneScore;
  document.getElementById('twoScoreFin').innerHTML = "Player 2 : " + twoScore;
  highScore();
  document.getElementById('highscore').innerHTML = "High Score : " + localStorage.getItem('highScore');
};

function highScore() {
  var numberTop = Number(localStorage.getItem('highScore'));
  if (highscore !== null) {
    if (oneScore > numberTop) {
      localStorage.setItem('highScore', oneScore.toString());
    } else if (twoScore > numberTop) {
      localStorage.setItem('highScore', twoScore.toString());
    }
  } else if (oneScore > twoScore) {
    localStorage.setItem('highScore', oneScore.toString());
  } else {
    localStorage.setItem('highScore', twoScore.toString());
  }
}

function createProgressbar(callback) {
  // We select the div that we want to turn into a progressbar
  var progressbar = document.getElementById("progressBarId");
  progressbar.className = 'progressbar';

  // We create the div that changes width to show progress
  var progressbarinner = document.createElement('div');
  progressbarinner.className = 'inner';

  // Eventually couple a callback
  if (typeof (callback) === 'function') {
    progressbarinner.addEventListener('animationend', callback);
  }

  // Append the progressbar to the main progressbardiv
  progressbar.appendChild(progressbarinner);

  // When everything is set up we start the animation
  progressbarinner.style.animationPlayState = 'running';
}

addEventListener('load', function () {
  createProgressbar(function () {
    gameOver();

    //reset variables
  });
});


function displayShapeGenerated(shape, generator) {//loop through and display
  let div = document.createElement('div');
  div.className = 'generatedPattern pattern ' + shape;
  //TO DO: add in a function that sifts through shapes and gives specific id
  if(shape == "circle"){
    div.id = 'genCircleId';
  } else if (shape == 'square'){
    div.id = 'genSquareId';
  } else {
    div.id = 'genTriId';
  }
  document.getElementById(generator).appendChild(div);
  console.log(div);
}

function displayShapePlayer(shape, input, playOne) { //displays player input
  var count = 0;
  if (count <= 3) {
    count++
    let div = document.createElement('div');
    div.className = 'generatedPattern pattern removable ' + shape; //TO DO: currently the shape is unidentified
    if (playOne === true) { //doesn't enter this one
      div.className += " oneShape";
      arrOnePatt.push('#' + shape);
      console.log(arrOnePatt);
    } else {
      div.className += " twoShape btmScrn";
      arrTwoPatt.push('#' + shape); //add it to array 
    }
    document.getElementById(input).appendChild(div);
    console.log(div);
  }
}

//make a function which responds to everything using the button down
function reactPlayer() {
  //needs to find the player
  //display player moves
  //keepscore
  document.addEventListener("keydown", (event) => {
    let key = event.which;
    let plyOneFd = false;
    var currentShape = "";
    currentShape = findShape(key); //we need an index
    plyOneFd = findPlayer(key);
    playerMoves(plyOneFd, currentShape, plyOneFd); //this loops but i doesn't exist
    //could put an if
    if (playerOneClick == 3 || playerTwoClick == 3) {
      let correctRep = checkArray(plyOneFd);
      keepScore(correctRep, plyOneFd);
    }
  });
}

function findWinner() {
  if (oneScore > twoScore) {
    document.getElementById('winner').innerHTML = "Player One Wins!";
    //replace text one won!
  } else if (oneScore < twoScore) {
    document.getElementById('winner').innerHTML = "Player Two Wins!";
    //replace two won
  } else {
    document.getElementById('winner').innerHTML = "It's a tie!";
    //it was a tie
  }
}

function findShape(keyInd) { //this works
  var ind = "";
  for (var i = 0; i <= 3; i++) {
    if (keyInd == arrplayer1[i]) {
      ind = arrItems[i];
      console.log(arrItems[i]);
      break;
    } else if (keyInd == arrplayer2[i]) {
      ind = arrItems[i];
      break;
    }
  }
  return ind;
}

function findPlayer(keyPress) { //maybe a function to find a key
  var player1 = false;
  for (var i = 0; i < 3; i++) {
    if (arrplayer1[i] == keyPress) { //goes into this one first
      console.log('player One');
      player1 = true;
      break;
    } else if (arrplayer2[i] == keyPress) { //this will become unneeded
      console.log('player Two');
      break;
    }
  }

  return player1;
}
function keepScore(correctArr, plyFd) { //TO DO: Is this needed?
  if (correctArr === true) {
    if (plyFd === true) {
      oneScore = winsPoint(oneScore, "oneScore");
      console.log(arrOnePatt);
      console.log(arrCheck);
      //TO DO: change the score on the screen
    } else {
      twoScore = winsPoint(twoScore, "twoScore");
    }
  } else {
    if (plyFd === true) {
      incorrect(plyFd);
      playerOneClick = 0;
      arrOnePatt = [];
      //TO DO: change the score on the screen
    } else {
      playerTwoClick = 0;
      arrTwoPatt = [];
      incorrect(plyFd);
    }
  }
}

function winsPoint(score, disp) {
  //this function will reset based on if a player has won a point
  numScore = score + 1; //will need to return score
  let txtScore = numScore.toString();
  console.log(txtScore);
  //replace on screen 
  document.getElementById(disp).innerHTML = txtScore;
  setTimeout(function () {
    const removableDiv = document.querySelectorAll('.pattern');
    removableDiv.forEach(pattern => {
      pattern.remove();
    });
    arrOnePatt.splice(0, arrCheck.length);
    arrTwoPatt.splice(0, arrCheck.length);
    arrCheck.splice(0, arrCheck.length);
    generatePattern(genPattern, arrCheck);
  }, 500);
  return numScore;
}


function incorrect(plyOneFd) { //need to create individual ones because this isn't altering what I need
  console.log('Incorrect pattern');
  setTimeout(function () {
    if (plyOneFd === true) {
      const removableDiv = document.querySelectorAll('.oneShape');
      removableDiv.forEach(oneShape => {
        oneShape.remove();
      });
    } else {
      const removableDiv = document.querySelectorAll('.twoShape');
      removableDiv.forEach(twoShape => {
        twoShape.remove();
      });
    }
    //TO DO: make it stop removing from both sides
    //chang colour make to make more noticable that it is wrong
  }, 500);
}

function playerMoves(foundPlayer, shape) {
  //what am I looping through, the key, but then what. I could create param
  //add if statement
  //maybe also array, because if it comes back as n/a then that would help
  if (foundPlayer === true) {
    playerOneClick++;
    displayShapePlayer(shape, 'playerInput', foundPlayer);
    console.log(arrOnePatt); //nothing in arrOnePatt
  } else {
    playerTwoClick++;
    //playerMoves(arrTwoPatt, arrItems[i], '#playerInput2');
    displayShapePlayer(shape, 'playerInput2', foundPlayer);
    console.log(arrTwoPatt);
  }
}


function generatePattern(generated, checker) {
  //when play == true
  playerOneClick = 0;
  playerTwoClick = 0;
  var count = 0;
  while (count < 3) {
    var randomNumber = Math.floor(Math.random() * 3);
    generated.push(arrItems[randomNumber]);
    checker.push(arrItems2[randomNumber]);
    console.log(checker);
    //display
    displayShapeGenerated(arrItems[randomNumber], "patternGenerator");
    count++;
  }
  console.log('this is what the player inputs: ' + generated);
  console.log('this is the check array: ' + checker); //correct here
}

function setGenerateImg(shape) { //TO DO: get Josh
  if (shape.className !== "oneShape" || shape.className !== "twoShape") {
    if (shape.className == "circle") {
      document.getElementById("myImg").src = "/image/circleGenerated";
    } else if (shape.className == "square") {
      document.getElementById("myImg").src = "hackanm.gif";
    } else {
      document.getElementById("myImg").src = "hackanm.gif";
    }
  }
}

function checkArray(plyFd) {
  var leftRight = localStorage.getItem('display');
  var correct = false;
  if (leftRight == 'left') {
    if (plyFd === true) {
      correct = regularCheck(arrOnePatt);
    } else {
      correct = reverseCheck(arrTwoPatt);
    }
  } else {
    if (plyFd === true) {
      correct = reverseCheck(arrOnePatt);
    } else {
      correct = regularCheck(arrTwoPatt);
    }
  }

  return correct;
}

function regularCheck(array) { //TO DO: something wrong with reverse check when left or right is clicked
  var correct = true;
  var count = 0;
  while (count < array.length && correct === true) {
    if (array[count] === arrCheck[count]) {
      if (count === 2) {
        console.log('win');
        correct = true;
      }
    } else if (array[count] != arrCheck[count]) {
      console.log('Incorrect pattern');
      correct = false;

    }
    count++;
  }
  return correct;
}


function reverseCheck(array) {
  var correct = true;
  var count = 2;
  var arrCount = 0;
  while (count < array.length && count >= 0 && correct === true) {
    if (array[arrCount] === arrCheck[count]) {
      if (count === 0) {
        console.log('win');
        correct = true;
      }
    } else if (array[arrCount] != arrCheck[count]) {
      console.log('Incorrect pattern');
      correct = false;
    }
    arrCount++;
    count--;
  }
  return correct;
}

//checks if the pattern is correct
function checkArrray(array, clicker, score) {
  if (clicker == 3) {
    var count = 0;
    while (count < array.length) {
      console.log(array[count]);
      console.log(arrCheck[count]);
      if (array[count] === arrCheck[count]) { //isn't working
        count++;
        if (count == 3) {
          score++;
          console.log('win');
          setTimeout(function () {
            const removableDiv = document.querySelectorAll('.pattern');
            removableDiv.forEach(pattern => {
              pattern.remove();
            });
            arrOnePatt.splice(0, arrCheck.length);
            arrTwoPatt.splice(0, arrCheck.length);
            arrCheck.splice(0, arrCheck.length);
            generatePattern(genPattern, arrCheck);
            findPlayer(); //gotta find a better way to find between the two and add points.
            addPoint();
            //chang colour make to make more noticable that it is right
          }, 500);
          break;
        }
      } else {
        console.log('Incorrect pattern');
        playerOneClick = 0;
        playerTwoClick = 0;
        setTimeout(function () {
          arrOnePatt = [];
          arrTwoPatt = [];
          const removableDiv = document.querySelectorAll('.removable');
          removableDiv.forEach(removable => {
            removable.remove();
          });
          //change colour make to make more noticable that it is wrong
        }, 500);
        correct = false;
        break;
      }
    }
  }
}

//-- sliding transitions
const pages = document.querySelectorAll(".page");
const translateAmount = 100;
let translate = -100;

slide = (direction) => {

  direction === "next" ? translate -= translateAmount : translate += translateAmount;

  pages.forEach(
    pages => (pages.style.transform = `translateX(${translate}%)`)
  );
}

document.querySelector("#playNow").addEventListener("click", (e) => {
  startGame();
  currentPage = "game";
  document.getElementById("startEffect").play();
});



document.querySelector("#backHomeBtn").addEventListener("click", (e) => {
  currentPage = "home";
  document.querySelector(".page").style.display = "block";
  document.querySelector("#gameOverPg").style.display = "none";
  location.reload();
});


function leftRightFunc() {
  var lOrR = localStorage.getItem('display');
  if (document.getElementById('txtLeft').innerHTML === "Left") {
    document.getElementById('txtLeft').innerHTML = "Right";
  } else {
    document.getElementById('txtLeft').innerHTML = "Left";
  }

  lOrR === 'left' ? lOrR = 'right' : lOrR = 'left';
  if (lOrR == "right") {
    document.getElementById("playerInput").style.transform = "rotate(180deg)";
    document.getElementById("playerInput2").style.transform = "rotate(0deg)";
    document.getElementsByClassName("oneShape").style.transform = "rotate(180deg)";
    document.getElementsByClassName("twoShape").style.transform = "rotate(180deg)";
    localStorage.setItem('display', 'right');
  } else {
    document.getElementById("playerInput").style.transform = "rotate(0deg)";
    document.getElementById("playerInput2").style.transform = "rotate(180deg)";
    localStorage.setItem('display', 'left');
  }
}

window.addEventListener("gamepadconnected", function (e) {
  console.log(e);
});

function switchButtons(letter) { //better way to do this
  if (letter === "w") { //(38, 39, 37) w, d a
    if (currentPage == "welcome") {
      document.getElementById("getStarted").click();
      currentPage = "home";
    } else if (currentPage == "home") {
      document.getElementById("playNow").click();
      currentPage = "game";
    } else if (currentPage == "settings") {
      document.getElementById("setDisplay").click();
    } else if (currentPage == "gameOver"){
      document.getElementById("backHomeBtn").click();
      currentPage = "home";
    }
  } else if (letter === "d") {
    if (currentPage == "home") {
      document.getElementById("rules").click();
      document.getElementById("changeScreen").play();
      currentPage = "rules";
    }
  } else if (letter === "39") {
    if (currentPage == "rules") {
      document.getElementById("goBackRules").click();
      document.getElementById("changeScreen").play();
      currentPage = "home";
    } else if (currentPage == "settings") {
      document.getElementById("mute").click();
    }
  } else if (letter === "a") {
    if (currentPage == "home") {
      document.getElementById("settings").click();
      document.getElementById("changeScreen").play();
      currentPage = "settings";
    }
  } else if (letter === "37") {
    if (currentPage == "settings") {
      document.getElementById("setDisplay").click();
    }
  } else if (letter === "38") {
    if (currentPage == "settings") {
      document.getElementById("goBackSet").click();
      document.getElementById("changeScreen").play();
      currentPage = "home";
    }

  }
}


window.addEventListener("keydown", function (e) {
  // If the user presses the "Enter" key on the keyboard
  console.log(e);
  if (e.key === "w") {
    // Cancel the default action, if needed
    e.preventDefault();
    switchButtons("w");
  } else if (e.key === "d") {
    switchButtons("d");
  } else if (e.key === "a") {
    switchButtons("a");
  } else if (e.key === "ArrowUp") { //up
    switchButtons("37");
  } else if (e.key === "ArrowRight") { //right
    switchButtons("39");
  } else if (e.key === "ArrowLeft") { //left
    switchButtons("38");
  }
});

//TODO: replace with settings button
document.querySelector("#getStarted").addEventListener("click", (e) => {
  currentPage = "home";
  document.querySelector(".page").style.display = "block";
  document.querySelector("#welcomeUser").style.display = "none";
  document.getElementById("homeMusic").play();
  document.getElementById("startEffect").play();
});

function toggleMute() {
  var homeAudio = document.getElementById('homeMusic');
  var gameAudio = document.getElementById('gameMusic');
  homeAudio.muted = !homeAudio.muted;
  gameAudio.muted = !gameAudio.muted;
  if (document.getElementById('txtMute').innerHTML === "Mute") {
    document.getElementById('txtMute').innerHTML = "UnMute";
  } else {
    document.getElementById('txtMute').innerHTML = "Mute";
  }
}


