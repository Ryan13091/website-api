//Start Creating variables needed on page for index.html to pull from
var page = document.getElementById('page-body');
var pageContent = document.getElementById('page-content');
var highScoresTxtLink = document.getElementById('high-scores');
var startTheQuizBtn = document.getElementById('starts-quiz');
var timeDisplay = document.getElementById('timer');

//Start - Creating Global Variable Needed in Console etc. to call out later down the page
var counter = 60;
var scoreArray = loadScores() || [];
var questIndex = 0;
//Starts loading the questions for the quiz
var questArray = [
    {
        question: 'Here is a list of common data type, which one does not belong?',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correctAnswersIndex: 2
    },

    //question 2 start - repeated from above
    {
        question: 'Arrays in Javascript are used to store what?',
        answers: ['numbers & strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswersIndex: 3
    },
    {
        question: 'The condition in an IF/ELSE is enclosed in what?',
        answers: ['quotes" "', 'curly brackets {}', 'parenthesis ()', 'square brackets []'],
        correctAnswersIndex: 2
    },
    {
        question: 'String values must be enclosed within what?',
        answers: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        correctAnswersIndex: 2
    },
    {
        question: 'A very useful tool used during development & debugging for printing content to the debugger console is?',
        answers: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswersIndex: 3
    }
];

// Need Event Listeners to create clickable buttons that trigger a callback from Variables
highScoresTxtLink.addEventListener('click', topScoresPage);
startTheQuizBtn.addEventListener('click', startQuiz);

//Define call back functions intentions
function startQuiz() {
    timer();

    //call back function to create the questions
    createQuestion(questArray[questIndex]);
}

//define what the timer function will do
function timer() {
    window.startCount = setInterval(function () {
        counter--;
        //counts down by 1 - now definie that it should count down to zero and display
        counter > 0 ? (timeDisplay.innerText = counter) : (timeDisplay.innerText = 0);
        if (counter === 0) {
            clearInterval(startCount);
            gameFinishWindow();
        }
    }, 1000);
}

//Create function for questions to display
function createQuestion(questionObj) {
    //clear for new question
    pageContent.innerHTML = '';

    //go to next question
    questIndex++;

    //create question elements on page-content container
    var questionContainerEl = document.createElement('div');
    questionContainerEl.className = 'question';
    questionContainerEl.id = 'question';

    //push questions within container
    var questEl = document.createElement('h2');
    questEl.textContent = questionObj.question;

    //add the question as a child with append function
    questionContainerEl.appendChild(questEl);
    //show the available answers
    var answersAvailEl = document.createElement('ul');
    answersAvailEl.className = 'answer-avail-list';
    answersAvailEl.id = 'answer-avail-list';

    //pull the available answers list on front end
    var answers = questionObj.answers;
    //need for var - to store answers
    for (var i = 0; i < answers.length; i++) {
        var answerEl = document.createElement('li');
        answerEl.className = 'answer-avail-item';
        // need to create a button to submit answer
        answerEl.innerHTML = `<button class="btn answer-btn">${i + 1}. ${answers[i]}</button>`;
        //let user know if answer was correct or not
        if (i === questionObj.correctAnswersIndex) {
            answerEl.setAttribute('answer-correct', 'true');
        }
        // place answer 
        answersAvailEl.appendChild(answerEl);
    }

    questionContainerEl.appendChild(answersAvailEl);
    pageContent.appendChild(questionContainerEl);

    //add event listener for user when they click on Answer object
    answersAvailEl.addEventListener('click', verifyAnswer);
}
//check to see if answer from user is correct and change variables accordingly
function verifyAnswer(event) {
    var clicked = event.target.closest('li.answer-avail-item');
    var answerList = document.getElementById('answer-avail-list');

    //check for verified answer if it's right or wrong.
    if (clicked) {
        var isCorrectAnswer = clicked.hasAttribute('answer-correct');
        //now tell user they were right
        if (isCorrectAnswer) {
            var rightMsgEl = document.createElement('p');
            rightMsgEl.className = 'feedback-msg';
            rightMsgEl.innerText = 'Right Answer!';
            answerList.appendChild(rightMsgEl);
            //or tell user they were wrong and deduct 10 seconds from 60
        } else {
            counter = counter - 10;
            var wrongMsgEl = document.createElement('p');
            wrongMsgEl.className = 'feedback-msg';
            wrongMsgEl.innerText = 'Wrong Answer!';
            answerList.appendChild(wrongMsgEl);
        }
        answerList.removeEventListener('click', verifyAnswer);

        //now setup when feedback on correct/wrong answer displays and user proceeds.
        setTimeout(function () {
            if (counter <= 0 || questIndex >= questArray.length) {
                endGamePage();
            } else {
                createQuestion(questArray[questIndex]);
            }
        }, 1000);
    }
}

//Need function to display final scores and also to clear/go back and stop the Startcount timer
function endGamePage() {
    clearInterval(window.startCount);

    pageContent.innerHTML = '';
    var endGameEl = document.createElement('div');
    endGameEl.className = "end-game";
    endGameEl.id = 'end-game';

    var endGameMsgEl = document.createElement('h2');
    endGameMsgEl.innerText = 'You finished!';
    endGameEl.appendChild(endGameMsgEl);

    var finScoreMsgEl = document.createElement('h3');
    finScoreMsgEl.innerText = 'Check your final score: ';

    var finScoreEl = document.createElement('span');
    finScoreEl.id = 'final=score';

    if (counter >= 0) {
        finScoreEl.innerText = counter + '.';
    } else {
        finScoreEl.innerText = 0 + '.';
    }

    finScoreMsgEl.appendChild(finScoreEl);
    endGameEl.appendChild(finScoreMsgEl);

    var userStatsEl = document.createElement('form');
    userStatsEl.innerHTML =
        "<label for='initials'>Enter your Initials Here</label>" +
        "<input type='text' id='initials' name='initials' maxlength=2>" +
        "<button class='btn btn-short' type='submit'>Submit Score</button>";

    // Add event listener for which adds in player initials and overall score
    userStatsEl.addEventListener('submit', allStatsSubmit);

    endGameEl.appendChild(userStatsEl);
    pageContent.appendChild(endGameEl);
}

function allStatsSubmit(event) {
    event.preventDefault();
    var userInitials = document.querySelector("input[name='initials']")
        .value.toUpperCase();
    var userScore = counter > 0 ? counter : 0;
    var userStatsObj = {
        player: userInitials,
        score: userScore
    };
    scoreArray.push(userStatsObj);
    saveScores();

    //high score page
    topScoresPage();
}

//need fuction to call variable to show all top scores

function topScoresPage() {
    page.innerHTML = '';

    var topScoresContainerEl = document.createElement('div');
    topScoresContainerEl.classList = 'containter high-scores';
    topScoresContainerEl.id = 'high-scores';

    var heading = document.createElement('h2');
    heading.innerText = 'High Scores';
    topScoresContainerEl.appendChild(heading);

    var highScoresList = document.createElement('ul');
    for (var i = 0; i < scoreArray.length; i++) {
        var playerStats = document.createElement('li');
        playerStats.innerText =
            i + 1 + '. ' + scoreArray[i].player + ' - ' + scoreArray[i].score;
        highScoresList.appendChild(playerStats);
    }
    topScoresContainerEl.appendChild(highScoresList);

    var actionContainer = document.createElement('div');
    actionContainer.className = 'actions';

    var goBackBtn = document.createElement('a');
    goBackBtn.id = 'go-back';
    goBackBtn.setAttribute('href', './index.html');
    goBackBtn.classList = 'btn btn-short';
    goBackBtn.innerText = '<-- Back';
    actionContainer.appendChild(goBackBtn);

    var clearAllScores = document.createElement('button');
    clearAllScores.classList = 'btn btn-short';
    clearAllScores.innerText = 'Clear All Scores';
    clearAllScores.addEventListener('click', handleClearAllScores);
    actionContainer.appendChild(clearAllScores);

    topScoresContainerEl.appendChild(actionContainer);
    page.appendChild(topScoresContainerEl);
}

//need function to actually clear the scores
function handleClearAllScores() {
    scoreArray = [];
    saveScores();
    topScoresPage();
}

//need function to put top scores in order from high to low
function saveScores() {
    scoreArray.sort((a, b) => b.score - a.score);
    localStorage.setItem('stats', JSON.stringify(scoreArray));
}

// need function to pull highest scores from local storage
function loadScores() {
    var stats = localStorage.getItem('stats');
    if (!stats) {
        return false;
    }
    return (stats = JSON.parse(stats));
}
