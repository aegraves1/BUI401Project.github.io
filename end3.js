const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores3')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = username.value


saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score)

    highScores.sort((a, b) => {
        return b.score - a.score
    })
    highScores.splice(5)

    localStorage.setItem('highScores3', JSON.stringify(highScores))
    window.location.assign('highscores3.html')
}