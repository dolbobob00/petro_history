const quizData = [
    

];

let currentQuestion = 0;
let selectedAnswer = null;
let results = [];
let correctPicked = 0;
function selectAnswer(element, index) {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => answer.classList.remove('selected'));
    element.classList.add('selected');
    selectedAnswer = index;
}

function nextQuestion() {
    if (selectedAnswer === null) {
        alert("Пожалуйста, выберите ответ.");
        return;
    }
    if (selectedAnswer == quizData[currentQuestion].correct) {
        correctPicked++;
    }
    results.push({
        question: quizData[currentQuestion].question,
        selected: quizData[currentQuestion].answers[selectedAnswer],
        correct: quizData[currentQuestion].answers[quizData[currentQuestion].correct]
    });

    currentQuestion++;
    selectedAnswer = null;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showSummary();
    }
}

function loadQuestion() {
    const questionEl = document.getElementById('question');
    const answersEl = document.querySelectorAll('.answer');
    questionEl.textContent = quizData[currentQuestion].question;
    answersEl.forEach((answerEl, index) => {
        answerEl.textContent = quizData[currentQuestion].answers[index];
        answerEl.classList.remove('selected');
    });
}

function showSummary() {
    document.getElementById('quiz').classList.add('hidden');
    const summaryEl = document.getElementById('summary');
    summaryEl.classList.remove('hidden');
    let summaryHTML = `<h2>Результаты: ${correctPicked} / ${quizData.length} </h2>`;
    results.forEach((result, index) => {
        summaryHTML += `${result.question}<br> Ваш ответ: ${result.selected}<br> Правильный ответ: ${result.correct}</p>`;
    });
    summaryEl.innerHTML = summaryHTML;
}
document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();  // Загрузка первого вопроса при открытии страницы
});