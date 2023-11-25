const quizData = [
    {
      question: 'What essential items should you prioritize bringing with you to a remote island to ensure your survival?',
      options: ['Laptop and headphones', 'Sunglasses and sunscreen', 'Swiss army knife and water purification tablets', 'Paperback novel and a camera'],
      answer: 'Swiss army knife and water purification tablets',
    },
    {
      question: 'How would you go about finding a source of freshwater on a deserted island, and what methods could you use to make it safe for consumption?',
      options: ['Drink seawater directly', 'Collect rainwater and use a water filter', 'Ignore the need for freshwater', 'Create a straw to suck water from plants'],
      answer: 'Collect rainwater and use a water filter',
    },
    {
      question: 'In terms of shelter, what natural resources on the island could be utilized for building a makeshift shelter, and what considerations should be taken into account?',
      options: ['Use only rocks for shelter to avoid contact with insects', 'Utilize leaves, branches, and other vegetation for shelter construction', ' Ignore building a shelter and sleep on the sand', 'Rely on finding abandoned structures on the island'],
      answer: 'Utilize leaves, branches, and other vegetation for shelter construction',
    },
    {
      question: 'What are some key strategies for starting a fire on a remote island, and why is fire important for survival?',
      options: ['Fire is not essential for survival', ' Use a magnifying glass on sunny days', 'Rub two sticks together vigorously', 'Carry waterproof matches or a fire starter, and use available dry materials'],
      answer: 'Carry waterproof matches or a fire starter, and use available dry materials',
    },
    {
      question: 'How would you assess the available food resources on the island, and what methods could you employ to catch or gather food for sustenance?',
      options: [
        'Wait for a food delivery from the mainland',
        'Hunt animals without considering the ecosystem',
        'Conduct a thorough survey of edible plants and fishing',
        'Ignore food and focus on other survival tasks',
      ],
      answer: 'Conduct a thorough survey of edible plants and fishing',
    },
    {
      question: 'In the absence of immediate rescue, what signaling techniques could you use to increase the chances of being spotted by passing ships or aircraft?',
      options: ['Shouting loudly at all times', 'Creating large, visible symbols on the beach', 'Hiding in the shade to avoid detection', ' Ignoring signaling and waiting for rescue'],
      answer: 'Creating large, visible symbols on the beach',
    },
    {
      question: 'What safety measures should you take to protect yourself from wildlife hazards on a remote island?',
      options: [
        'Attempt to befriend all wildlife',
        'Wear a suit of armor to protect against bites and stings',
        'Avoid contact with unknown animals and understand local wildlife behavior',
        'Use wildlife as a food source without caution',
      ],
      answer: 'Avoid contact with unknown animals and understand local wildlife behavior',
    },
    {
      question: 'How might you navigate and orient yourself on the island without the aid of modern technology, such as a GPS?',
      options: [
      'Rely solely on intuition and guesswork',
      'Use natural landmarks, such as the sun and stars, for navigation',
      'Ignore navigation and wander aimlessly',
      'Wait for someone else to navigate for you'],
      answer: 'Use natural landmarks, such as the sun and stars, for navigation',
    },
    {
      question: 'What medical considerations should you keep in mind, and what basic first aid skills would be crucial for survival in a remote location?',
      options: [
        'Medical considerations are not important in survival situations',
        'Basic first aid skills like wound cleaning, bandaging, and CPR are crucial',
        'Only seek medical help if available',
        'Rely on natural remedies without any first aid knowledge',
      ],
      answer: 'Basic first aid skills like wound cleaning, bandaging, and CPR are crucial',
    },
    {
      question: 'In a long-term survival scenario, what psychological strategies could help you maintain a positive mindset and cope with the challenges of isolation?',
      options: [
      'Ignore mental health and focus only on physical survival',
      'Engage in activities that bring joy, maintain a routine, and stay hopeful', 
      'Assume that isolation has no impact on mental well-being', 
      'Depend solely on others for emotional support'],
      answer: 'Engage in activities that bring joy, maintain a routine, and stay hopeful',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();