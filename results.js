// results.js
window.onload = function () {
    const resultsContainer = document.getElementById('results-container');

    // Extract answer and explanation parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const answers = [];

    // Loop through URL parameters to extract answers and explanations
    urlParams.forEach((value, key) => {
        if (key.startsWith('answer')) {
            const questionIndex = key.replace('answer', '');
            const explanation = urlParams.get(`explanation${questionIndex}`);
            answers.push({ answer: value, explanation: explanation });
        }
    });

    // Construct HTML for displaying results
    let resultsHTML = '';
    answers.forEach((item, index) => {
        resultsHTML += `<div><strong>Question ${index + 1}:</strong> ${item.answer}</div>`;
        resultsHTML += `<div><strong>Explanation:</strong> ${item.explanation}</div>`;
    });

    // Display results on the page
    resultsContainer.innerHTML = resultsHTML;
};
