import { animateGoal, animateMiss } from "../src/anime.min.js";
const team2Score = document.getElementById("scoreSP");
const team1Score = document.getElementById("scoreNL");
let intervalId;
let team1 = 0;
let team2 = 0;
const players = ["shooter", "goalkeeper"];
let currentPlayerIndex = 0;
// timing bar code start
const timerBar = document.getElementById("timer-bar");
let progress = 0;
let direction = "up";
// timing bar code end

function startTimer() {
    intervalId = setInterval(function() {
      if (direction === "up") {
        progress += 3;
      } else {
        progress -= 3;
      }
      timerBar.style.height = progress + "%";
      if (progress >= 100) {
        direction = "down";
      } else if (progress <= 0) {
        clearInterval(intervalId);
        direction = "up";
        progress = 0;
        timerBar.style.height = progress + "%";
      }
    }, 50);
  }


function controller(shooterAndGoalkeeper) {
    const activeTeam1 = document.getElementById("team1Active");
    const activeTeam2 = document.getElementById("team2Active");
    const currentPlayer = shooterAndGoalkeeper[currentPlayerIndex];

    // Do something with the current player (e.g. show their name on the screen)
    console.log(`Current player: ${currentPlayer}`);

    if (currentPlayer == "shooter") {
        activeTeam1.style.border = "5px solid green";
        activeTeam2.removeAttribute("style");
    } else if (currentPlayer == "goalkeeper") {
        activeTeam1.removeAttribute("style");
        activeTeam2.style.border = "5px solid green";
        activeTeam1.removeAttribute("style");
    }
    // Switch to the next player
    currentPlayerIndex = (currentPlayerIndex + 1) % shooterAndGoalkeeper.length;
    penaltyShoot();
}

const divs = document.querySelectorAll(".divs");
divs.forEach((div) => {
  div.addEventListener("click", () => {
    clearInterval(intervalId);
    console.log("click", div.id)
    controller(players); // Call the controller function to switch players
  });
});

// Function checks if the goal is scored or not then executes the animation.
function showResult(checkScored) {
    const resultText = checkScored ? "GOAL!" : "MISSED!";
    const resultElement = document.createElement("div");
    resultElement.textContent = resultText;
    resultElement.classList.add("result");
    document.body.appendChild(resultElement);

    // Add animation class to trigger the animation
    resultElement.classList.add("result-animation");
    // Remove the result element after the animation finishes
    setTimeout(() => {
        resultElement.remove();
    }, 2000);
}

function penaltyShoot() {
    console.log("Current progress: " + progress + "%");
    let bonus = 0;
    if (progress >= 75 ){
        bonus = 100 + 10;
    } else if (progress >= 50) {
        bonus = 100 + 5;
    } else if (progress > 25) {
        bonus = 100 + 2;
    } else if (progress <= 25) {
        bonus = 100 - 20;
    }
    const totalNumber = bonus;
    // Winning condition value. Change this value to change the winning score.
    const randomNumber = Math.floor(Math.random() * totalNumber);
    if (currentPlayerIndex == 0) {
        if (randomNumber >= 50) {
            console.log("goal");
            statusGoals(1);
            showResult(true); // Goal scoored animation start
            team2 += 1; // Update team2 score
        } else {
            statusGoals(2);
            showResult(false); // Goal missed animation start
            console.log("no goal");
        }
    } else if (currentPlayerIndex == 1) {
        if (randomNumber >= 50) {
            console.log("goal");
            statusGoals(1);
            showResult(true); // Goal scoored animation start
            team1 += 1; // Update team1 score
        } else {
            statusGoals(2);
            showResult(false); // Goal missed animation start
            console.log("no goal");
        }
    }
    team1Score.innerHTML=`${team1}`;
    team2Score.innerHTML=`${team2}`;

}

// scoreboard start
function points() {
    const team2Score = document.getElementById("scoreSP");
    const team1Score = document.getElementById("scoreNL");
    team1Score.innerHTML=`${team1}`;
    team2Score.innerHTML=`${team2}`;
}

// popup code player selection
function playerSelection() {
    const open = document.querySelector(".pickPlayer");
    const close = document.querySelector(".containerPlayerSelection");

    open.addEventListener("click", () => {
        if (close.classList.contains("hidden")) {
            close.classList.remove("hidden");
            console.log("open");
        } else {
            close.classList.add("hidden");
            console.log("close");
        }
    });
}
// code for selected player
function pickedPlayer(i) {
    console.log(i);
}

function loadBall() {
    const createBall = document.getElementById("balID");
    const classImage = document.getElementsByClassName("ball");
    const ballImage = document.createElement("img");
    ballImage.classList.add("ball");
    ballImage.src = "../img/ball.png";
    createBall.appendChild(ballImage);
    if (createBall.childNodes.length > 1) {
        classImage[1].remove();
    }
}

function repeatStartTimer() {
    setTimeout(function() {
        startTimer();
        repeatStartTimer();
    }, 3000);
}
function statusGoals(i) {
    document.getElementById("balID").removeAttribute("style");
    loadBall();
    if (i == 1) {
        animateGoal();
        // animation goal scored.
        console.log("goal");
    }  else if (i == 2) {
        animateMiss();
        // animation goal missed.
        console.log("missed");
    }
}
export { statusGoals };
points();
repeatStartTimer();
loadBall();
