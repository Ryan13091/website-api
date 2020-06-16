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
