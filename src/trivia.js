$(".info").on("click", function() {
  $("#info-overlay").toggle();
  $(".info").toggleClass('porp');
});

$("#play-game").on("click", function() {
  $("#start-sec").hide();
  $("#game-sec").show();
});

let currentQuestion = 0;
let score = 0;
let answerSelected = false;
let wrong = 0;

// Fetch the questions data from the JSON file
$.ajax({
  url: '../vragen.json',
  dataType: 'json',
  success: function(data) {
    const questions = data.questions;
    const questionArea = document.getElementById("question-area");
    const questionImage = document.getElementById("p-img");
    $("#progress").text("1/" + questions.length);

    // Display a question and answer choices
    function displayQuestion() {
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
  },
  error: function() {
    console.log("Failed to load questions data.");
  }
});

