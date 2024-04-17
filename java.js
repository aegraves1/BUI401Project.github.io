(function () {

    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        let allAnswered = true;

        //redirect to results page after quiz
        let nextPageURL = 'results.html';

        const incorrectQuestions = [];
        const explanations = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // Check if the user has answered the current question
            if (!userAnswer) {
                allAnswered = false; // If the answer is not selected, set the flag to false
                answerContainer.style.color = 'red'; // Color the unanswered question in red
                return; // Exit the loop for this question
            }


            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                incorrectQuestions.push({
                    question: currentQuestion.question,
                    incorrectAnswer: userAnswer,
                    explanation: currentQuestion.explanation
                });
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // If all questions are not answered, display a message and prevent further action
        if (!allAnswered) {
            alert('Please answer all questions before submitting.');
            return; // Exit the function early
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        if (numCorrect == 10) {
            alert('Red: Follow the strings in the Basement, Yellow: Conference room(1003), Green: Upstairs Lounge, Blue: CYBER SECURITY, Purple: Find Grace!')
        }
        else if (numCorrect == 5) {
            alert('Maybe you should review your cyber security skills again...')
        }
        else if (numCorrect < 5) {
            alert('Yikes, is it your first day on the internet?')
        }

        //write out correct answer with explanation
        localStorage.setItem('quizResults', JSON.stringify({
            numCorrect: numCorrect,
            totalQuestions: myQuestions.length,
            incorrectQuestions: incorrectQuestions
        }));


        // Create a "See Results" button
        const seeResultsButton = document.createElement('button');
        seeResultsButton.textContent = 'See Results';
        seeResultsButton.onclick = function () {
            // Redirect to the results page
            window.location.href = 'results.html';
        };

        // Append the button to the page
        resultsContainer.appendChild(seeResultsButton);
    }


    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "What is the recommended character length of a secure password?",
            answers: {
                a: "5-8",
                b: "8-12",
                c: "12-14",
                d: "it doesn't matter"
            },
            correctAnswer: "c",
            explanation: "the longer your password, and the more complex, the harder it is to crack"
        },
        {
            question: "How should passwords be stored?",
            answers: {
                a: "Plaintext",
                b: "Hashed",
                c: "Enumerated",
                d: "Any way you want"
            },
            correctAnswer: "b",
            explanation: "storing the passwords in plaintext means that if someone gets into the database, they can read the passwords"
        },
        {
            question: "What is it called when a link or file that seems safe turns out to be malware?",
            answers: {
                a: "Virus",
                b: "Worm",
                c: "Keylogger",
                d: "Trojan"
            },
            correctAnswer: "d",
            explanation: "trojan horse viruses, like their namesake seem to be friendly and then turn out to be holding something malicious"
        },
        {
            question: "True or false: the only threat of clicking on an unknown link is losing your password?",
            answers: {
                a: "True",
                b: "False"
            },
            correctAnswer: "b",
            explanation: "clicking on an unknown link can do far more than just steal your password"

        },
        {
            question: "True or false: using public Wi-Fi is safe?",
            answers: {
                a: "True",
                b: "False"
            },
            correctAnswer: "b",
            explanation: "the connection may be being monitored by others who have bad intentions"
        },
        {
            question: "What is the most popular password in the world?",
            answers: {
                a: "123456",
                b: "password",
                c: "password1",
                d: "0123456"
            },
            correctAnswer: "a",
            explanation: "the most used password in the world is 123456 according to Google"
        },
        {
            question: "What is the method that is used to elicit information that is referred to as 'human hacking'?",
            answers: {
                a: "HumanInt",
                b: "Phishing",
                c: "Social engineering",
                d: "Vishing"
            },
            correctAnswer: "c",
            explanation: "social engineering is a manipulation of human emotions and interactions to get personal information"
        },
        {
            question: "What is the difference between a virus and a worm?",
            answers: {
                a: "A virus is self replicating, a worm is not",
                b: "A worm is self replicating, a virus is not",
                c: "A worm is a cute little fella in the ground",
                d: "A virus is smaller than a worm"
            },
            correctAnswer: "b",
            explanation: "a worm is able to self-replicate without human interaction, but a virus needs the user to do something"
        },
        {
            question: "Which is a myth about cyber security?",
            answers: {
                a: "Cyber security is vitally important",
                b: "Cyber security is protecting networks, devices, and data from unauthorized access",
                c: "Cyber security threats only come from outside sources",
                d: "Cyber security training is effective"
            },
            correctAnswer: "c",
            explanation: "cyber security threats can come from insider threats too"
        },
        {
            question: "What do you do if you are hacked and your passwords are stolen?",
            answers: {
                a: "Nothing, who cares",
                b: "Change your passwords",
                c: "Unplug your computer, its compromised",
                d: "Report it to the FBI"
            },
            correctAnswer: "b",
            explanation: "if your passwords are stolen, you need to change them, especially if you use the same one for muliple accounts"
        }


    ];

    //randomize question order
    myQuestions.sort(function () {
        return 0.5 - Math.random();
    });

    // Kick things off
    buildQuiz();

    // Event listeners
    submitButton.addEventListener('click', showResults);
})();
