const apiKey = 'a6f9305e0fec777af51a602160d7d461';
const teamId = 2766; // The ID of the team you want to check
const leagueId = 292; // The ID of the league you want to check
const season = 2023; // The season you want to check

// Make the API call to get the list of matches for the given team and league
const currentDate = new Date().toISOString().slice(0, 10);
const matchesUrl = `https://v3.football.api-sports.io/fixtures?date=${currentDate}&league=${leagueId}&season=${season}&team=${teamId}`;

fetch(matchesUrl, {
  method: "GET",
  headers: {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": apiKey
  }
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch matches data');
    }
  })
  .then(data => {
    // Check if the team is playing
    const matches = data.response;
    const playingMatches = matches.filter(match => {
      const homeTeam = match.teams.home.id;
      const awayTeam = match.teams.away.id;
      const isPlaying = homeTeam === teamId || awayTeam === teamId;
      return isPlaying;
    });

    if (playingMatches.length === 0) {
      console.log(`Team ${teamId} is not playing in league ${leagueId}.`);
      return;
    }

    // Check if any of the playing matches are at halftime
    const halftimeMatches = playingMatches.filter(match => {
      const isHalfTime = match.fixture.status.short === "HT";
      return isHalfTime;
    });

    if (halftimeMatches.length === 0) {
      console.log(`Team ${teamId} is playing in league ${leagueId}, but none of their matches are currently at halftime.`);
    } else {
      halftimeMatches.forEach(match => {
        console.log(`Team ${teamId} is playing in league ${leagueId} and their match against ${match.teams.home.name} is currently at halftime.`);
      });
    }
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });




$(".info").on("click", function() {
  $("#info-overlay").toggle();
  $(".info").toggleClass('porp');
});

$("#play-game").on("click", function() {
  $("#start-sec").hide();
  $("#game-sec").show();
});

$(".close").on("click", function() {
window.location.href='../index.html';
});

let currentQuestion = 0;
let score = 0;
let answerSelected = false;
let wrong = 0;
$("#progress").text("1/" + questions.length);

// Display a question and answer choices
function displayQuestion() {
  const questionArea = document.getElementById("question-area");
  const questionImage = document.getElementById("p-img");
  const question = questions[currentQuestion];
  questionArea.innerHTML = question.question;
  questionImage.src = question.image;
  
  const choices = document.getElementById("choices");
  choices.innerHTML = "";
  
  for (let i = 0; i < question.choices.length; i++) {
    const choice = document.createElement("button");
    choice.innerHTML = question.choices[i];
    choice.addEventListener("click", function() {
      if (!answerSelected) {
        checkAnswer(choice);
      }
    });
    choices.appendChild(choice);
  }
}
  // Check the user's answer
function checkAnswer(selectedChoice) {
  const selectedAnswer = selectedChoice.innerHTML;
  const question = questions[currentQuestion];
  
  if (selectedAnswer === question.correctAnswer) {
    score++;
    selectedChoice.classList.add("correct");
    $("#antwoord").text("Deze vraag heb je goed beantwoord");
    $("#wrong-yellow").hide();
  } else {
    selectedChoice.classList.add("incorrect");
    for (let i = 0; i < choices.children.length; i++) {
      const choice = choices.children[i];
      if (choice.innerHTML === question.correctAnswer) {
        choice.classList.add("correct");
        break;
      }
    }
    $("#antwoord").text("Deze vraag heb je niet goed beantwoord");
    if (wrong == 0) {
        $("#wrong-yellow").prepend('<img id="theImg" src="../img/yellow_plus.png" />')
      }
    $("#wrong-yellow").show();
    wrong += 1;
    console.log(wrong);
  }
  
    if (wrong == 2) {
      $("#antwoord").text("2 gele kaarten, je ligt uit het spel");
      $("#wrong-yellow").empty();
        $("#wrong-yellow").prepend('<img id="theImg" src="../img/red.png" />')
        $("#wrong-yellow").show();
        $("#next").text("Naar Score");
        $("#next").click(function() {
          endGame()
        });
      }

  answerSelected = true;
  $("#game-overlay").show();
}

// End the game
function endGame() {
  score = score * 10;
  $("#xp-sec").text("+ " + score + " Punten");
  $("#game-sec").hide();
  $("#end-page").show();
}

// Start the game
displayQuestion();

$("#next").click(function() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    endGame();
  } else {
    displayQuestion();
    currentQuestionParse = parseInt (currentQuestion);
    currentQuestionParse += 1;
    $("#progress").text(currentQuestionParse + "/" + questions.length);
    answerSelected = false;
    $("#game-overlay").hide();
  }
});
