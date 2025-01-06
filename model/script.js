let pageIndex;
let reponses = [];

function startQuiz() {
  pageIndex = 0;
  reponses = [];
  document.getElementsByTagName("main")[0].classList.add("hidden");
  document
    .getElementsByTagName("article")
    [pageIndex].classList.remove("hidden");
}

// Method to save the answer of the user in the array reponses
function saveAnswer() {
  const inputs = document.getElementsByTagName("input");
  for (const element of inputs) {
    if (
      element.checked &&
      reponses.includes(element.getAttribute("value")) === false
    ) {
      reponses.push(element.getAttribute("value"));
    }
  }
  const inputs_uncheck = document.querySelectorAll(
    "input[type='radio'], input[type='checkbox']"
  );
  for (const element of inputs_uncheck) {
    if (!element.checked) {
      const value = element.getAttribute("value");
      if (reponses.includes(value)) {
        const index = reponses.indexOf(value);
        reponses.splice(index, 1);
      }
    }
  }
  //console.log("Réponses de l'utilisateur :", reponses);
}

function pageSuivante() {
  //console.log("Index : " + pageIndex);
  const articles = document.getElementsByTagName("article");
  saveAnswer();
  if (pageIndex >= 0 && pageIndex < articles.length - 3) {
    articles[pageIndex].classList.add("hidden");
    pageIndex++;
    articles[pageIndex].classList.remove("hidden");
  } else if (pageIndex === articles.length - 3) {
    articles[pageIndex].classList.add("hidden");
    articles[pageIndex + 1].classList.remove("hidden");
    pageIndex++;

    showAnswers();
  }
}

function pagePrecedente() {
  //console.log("Index : " + pageIndex);

  const articles = document.getElementsByTagName("article");
  const main = document.getElementsByTagName("main")[0];

  if (pageIndex >= 1) {
    articles[pageIndex].classList.add("hidden");
    pageIndex--;
    articles[pageIndex].classList.remove("hidden");
  } else if (pageIndex === 0) {
    main.classList.remove("hidden");
    articles[pageIndex].classList.add("hidden");
  }
}

function showAnswers() {
  //console.log("Réponses de l'utilisateur :", reponses);

  reponses.forEach((reponse) => {
    const input = document.getElementsByName(reponse)[0];
    if (input && input.getAttribute("name") === reponse) {
      input.checked = true;
    }
  });
}

function showResults() {
  let score = 0;
  const resultSpan = document.getElementById("resultat");
  const articles = document.getElementsByTagName("article");

  const inputs = document.querySelectorAll("input[type='hidden']");
  let correctAnswers = {};

  // Compter le nombre de bonnes réponses attendues pour chaque question
  for (const input of inputs) {
    let questionNumber = parseInt(input.getAttribute("name").split("-")[1], 10);
    if (input.getAttribute("value") === "true") {
      if (!correctAnswers[questionNumber]) {
        correctAnswers[questionNumber] = 0;
      }
      correctAnswers[questionNumber]++;
    }
  }

  // Vérifier les réponses de l'utilisateur
  let compteur = 0;
  let currentQuestion = -1;

  for (const reponse of reponses) {
    let questionNumber = parseInt(reponse.split("-")[1], 10);

    // Détecter le changement de question
    if (questionNumber !== currentQuestion) {
      if (
        currentQuestion !== -1 &&
        compteur === correctAnswers[currentQuestion]
      ) {
        score++;
      }
      compteur = 0; // Réinitialiser le compteur pour la nouvelle question
      currentQuestion = questionNumber;
    }

    // Comparer la réponse de l'utilisateur avec les bonnes réponses
    for (const input of inputs) {
      let inputQuestionNumber = parseInt(
        input.getAttribute("name").split("-")[1],
        10
      );
      let inputOption = input.getAttribute("name").split("-")[2];
      let reponseOption = reponse.split("-")[2];

      if (
        inputQuestionNumber === questionNumber &&
        inputOption === reponseOption &&
        input.getAttribute("value") === "true"
      ) {
        compteur++;
        break;
      }
    }
  }

  // Vérifier la dernière question après la boucle
  if (compteur === correctAnswers[currentQuestion]) {
    score++;
  }

  resultSpan.textContent = `${score}`;

  // Afficher la section des résultats
  articles[pageIndex].classList.add("hidden");
  articles[articles.length - 1].classList.remove("hidden");
}
