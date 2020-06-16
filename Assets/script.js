//Start Creating variables needed on page for index.html to pull from
var page = document.getElementById('page-body')
var pageContent = document.getElementById('page-content')
var highScoresPage = document.getElementById('high-scores')
var startQuizBtn = document.getElementById('starts-quiz')
var timeDisplay = document.getElementById('timer')

//Start - Creating Global Variable Needed in Console etc.
var counter = 60;
var scoreArray = loadNewScore() || [];
var questIndex = 0;
//Starts loading the questions for the quiz
var questArray = [
    {
        question: 'Here is a list of common data type, which one does not belong?',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correctAnswerIndex: 2
    },


]