const question = document.querySelector('#question');
const scoreText = document.querySelector('#score');
const optionsContainer = document.querySelector('#answer-input');
const attemptsLeft = document.querySelector('#attempts-info');
const submitButton = document.querySelector('.btn');
const userAnswer = document.getElementById('answer-input').value.trim();
const userAnswerLower = userAnswer.toLowerCase();
const correctAnswerLower = currentQuestion.answer.toLowerCase();


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let currentQuestionIndex = 0;


const questions = [
    {
        question: "We know that this user uses the most used password in the world, what is it?",
        answer: "123456",
        attemptsLeft: 10,
    },
    {
        question: 'We know that this user has a cat named Nolan and they were born in 1996, can you guess the password?',
        answer: "Nolan1996",
        attemptsLeft: 10,
    },
    {
        question: 'We know that this user grew up in Atlanta and their favorite number is 11',
        answer: "Atlanta11",
        attemptsLeft: 10,
    },
    {
        question: 'We know that this user has three children named Zach, Noah, and Sadie and it is followed by a single digit number?',
        answer: "ZachNoahSadie3",
        attemptsLeft: 10,
    }
]

function displayQuestion() {
    currentQuestion = questions[currentQuestionIndex];
    attemptsLeft = currentQuestion.attemptsLeft;
    document.getElementById('questionTitle').textContent = `Question ${currentQuestionIndex + 1}`;
    document.getElementById('questionText').textContent = currentQuestion.question;
    document.getElementById('attemptsLeft').textContent = `Attempts Left: ${attemptsLeft}`; // Update attempts left display
}

function checkAnswer() {
    const userAnswer = document.getElementById('userAnswer').value.trim();
    const correctAnswer = currentQuestion.answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById('answerResult').textContent = 'Correct!';
        score++; // Increment the score
        document.getElementById('score').textContent = score; // Update the score display
        // Move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            document.getElementById('questionContainer').innerHTML = '<h1>Quiz Complete!</h1>';
        }
    } else {
        attemptsLeft--;
        if (attemptsLeft > 0) {
            document.getElementById('answerResult').textContent = `Incorrect!' ${attemptsLeft} attempt(s) left.`;
            document.getElementById('attemptsLeft').textContent = `Attempts Left: ${attemptsLeft}`; // Update attempts left display
        } else {
            document.getElementById('answerResult').textContent = 'Incorrect! No attempts left.';
            // Move to the next question
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                document.getElementById('questionContainer').innerHTML = '<h1>Quiz Complete!</h1>';
            }
        }
    }
}

submitButton.addEventListener('click', function () {
    checkAnswer()
})

// Display the first question when the page loads
window.onload = displayQuestion;




// const SCORE_POINTS = 100
// const MAX_QUESTIONS = 4

// startGame = () => {
//     questionCounter = 0
//     score = 0
//     availableQuestions = [...questions]
//     attemptsRemaining = questions[currentQuestion].attemptsLimit
//     getNewQuestion()
// }

// getNewQuestion = () => {
//     if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
//         localStorage.setItem('mostRecentScore', score)
//         return window.location.assign('end3.html')
//     }
//     questionCounter++


//     currentQuestion = availableQuestions[questionsIndex]
//     question.innerText = currentQuestion.question
//     optionsContainer.innerHTML = `<input type="text" id="answer-input" placeholder="Type your answer">`
//     availableQuestions.splice(questionsIndex, 1)

//     acceptingAnswers = true
// }

// incrementScore = num => {
//     score += num
//     scoreText.innerText = score
// }

// submitButton.addEventListener('click', function () {
//     if (attemptsRemaining <= 0) {
//         return; // No more attempts allowed
//     }
//     if (!acceptingAnswers) return
//     acceptingAnswers = false

//     if (userAnswerLower === correctAnswerLower) {

//         optionsContainer.classList.add('correct');
//         incrementScore()
//     }
//     else {
//         optionsContainer.classList.add('incorrect');
//     }

//     attemptsRemaining--;

//     if (attemptsRemaining === 0) {
//         // Disable the input field or any other action when the attempts limit is reached
//         document.getElementById('answer-input').disabled = true;
//     }

//     setTimeout(() => {
//         optionsContainer.classList.remove('correct', 'incorrect');
//         getNewQuestion()
//     }, 1000)


// });




// startGame()