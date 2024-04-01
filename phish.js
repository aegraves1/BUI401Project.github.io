const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const imageElement = document.getElementById('question-image');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Is this a phishing email? How can you tell? Pick the Best Answer',
        image: "tiktok.jpg",
        choice1: 'The header is sus',
        choice2: 'There is a sense of urgency',
        choice3: 'There are typos',
        choice4: 'This is not a phishing email',
        answer: 4,
    },
    {
        question: "Is this a phishing email? How can you tell? Pick the Best Answer",
        image: "amazonPhish.jpg",
        choice1: "The header is sus",
        choice2: "There is a sense of urgency",
        choice3: "There are typos",
        choice4: "This is not a phishing email",
        answer: 1,
    },
    {
        question: "Is this a phishing email? How can you tell? Pick the Best Answer",
        image: "spotifyPhish.jpg",
        choice1: "The header is sus",
        choice2: "There is a sense of urgency",
        choice3: "There are typos",
        choice4: "This is not a phishing email",
        answer: 1,
    },
    {
        question: "Is this a phishing email? How can you tell? Pick the Best Answer",
        image: "primePhish.jpg",
        choice1: "The header is sus",
        choice2: "There is a sense of urgency",
        choice3: "There are typos",
        choice4: "This is not a phishing email",
        answer: 3,
    },
    {
        question: "Is this a phishing email? How can you tell? Pick the Best Answer",
        image: "instaPhish.jpg",
        choice1: "The header is sus",
        choice2: "There is a sense of urgency",
        choice3: "There are typos",
        choice4: "This is not a phishing email",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    imageElement.src = currentQuestion.image

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()