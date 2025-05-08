const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "HyperTool Multi Language",
        "None of the above",
      ],
      answer: 0,
    },
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "JQuery", "CSS", "XML"],
      answer: 2,
    },
    {
      question: "Which is not a JavaScript Framework?",
      options: ["Python Script", "React", "Angular", "Vue"],
      answer: 0,
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets",
      ],
      answer: 0,
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;
  
  const questionEl = document.getElementById("question-container");
  const optionsEl = document.getElementById("options-container");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const resultEl = document.getElementById("result-container");
  const timerEl = document.getElementById("time");
  
  function showQuestion() {
    resetState();
    startTimer();
  
    let q = questions[currentQuestion];
    questionEl.innerText = q.question;
  
    q.options.forEach((option, index) => {
      const btn = document.createElement("div");
      btn.innerText = option;
      btn.classList.add("option");
      btn.addEventListener("click", () => selectOption(btn, index));
      optionsEl.appendChild(btn);
    });
  }
  
  function resetState() {
    clearInterval(timer);
    timerEl.textContent = 15;
    timeLeft = 15;
    nextBtn.style.display = "none";
    optionsEl.innerHTML = "";
    resultEl.innerHTML = "";
  }
  
  function selectOption(btn, selectedIndex) {
    const options = document.querySelectorAll(".option");
    options.forEach((opt) => opt.classList.remove("selected"));
    btn.classList.add("selected");
  
    if (selectedIndex === questions[currentQuestion].answer) {
      score++;
    }
  
    clearInterval(timer);
    nextBtn.style.display = "inline-block";
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextBtn.style.display = "inline-block";
      }
    }, 1000);
  }
  
  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  
  restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    restartBtn.style.display = "none";
    showQuestion();
  });
  
  function showResult() {
    questionEl.innerText = "Quiz Completed!";
    optionsEl.innerHTML = "";
    resultEl.innerHTML = `<h3>You scored ${score} out of ${questions.length}!</h3>`;
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
  }
  
  showQuestion();  