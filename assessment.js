let questionsData = {};
let currentTopic = '';
let currentQuestionIndex = 0;
let score = 0;

// Load questions from JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questionsData = data;
    showTopics(Object.keys(data));
  })
  .catch(error => console.error('Error loading questions:', error));

// Display topic buttons
function showTopics(topics) {
  const container = document.getElementById('topics-container');
  topics.forEach(topic => {
    const btn = document.createElement('button');
    btn.textContent = topic.replace(/_/g, ' ').toUpperCase();
    btn.onclick = () => startQuiz(topic);
    btn.style.margin = '10px';
    container.appendChild(btn);
  });
}

// Start quiz
function startQuiz(topic) {
  currentTopic = topic;
  currentQuestionIndex = 0;
  score = 0;

  document.getElementById('topics-container').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'block';
  document.getElementById('quiz-title').textContent = topic.replace(/_/g, ' ').toUpperCase();

  showQuestion();
}

// Display a question
function showQuestion() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  const questionObj = questionsData[currentTopic][currentQuestionIndex];

  const questionElem = document.createElement('p');
  questionElem.textContent = questionObj.question;
  container.appendChild(questionElem);

  questionObj.options.forEach(option => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'option';
    radio.value = option;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
}

// Go to next question
function nextQuestion() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert('Please select an option!');
    return;
  }

  const answer = questionsData[currentTopic][currentQuestionIndex].answer;
  if (selectedOption.value === answer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questionsData[currentTopic].length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Show final score
function showScore() {
  document.getElementById('quiz-container').innerHTML = '';
  document.getElementById('score-section').textContent = `You scored ${score} out of ${questionsData[currentTopic].length}`;
}

console.log("assessment.js loaded");

fetch('questions.json')
  .then(response => {
    console.log("Questions JSON loaded");
    return response.json();
  })
  .then(data => {
    console.log("Questions Data:", data);
    // Continue loading quiz topics here
  })
  .catch(error => {
    console.error("Error loading questions:", error);
  });
