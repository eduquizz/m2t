let pageIndex;
let reponses = [];

function startQuiz() {
    pageIndex = 0;
    reponses = [];
	document.getElementsByTagName("main")[0].classList.add("hidden");
	document.getElementsByTagName("article")[pageIndex].classList.remove("hidden");
}

// Method to save the answer of the user in the array reponses 
function saveAnswer() {
	const inputs = document.getElementsByTagName("input");
	for (const element of inputs) {
		if (element.checked && reponses.includes(element.getAttribute("value")) === false) {
			reponses.push(element.getAttribute("value"));
		}
	}
	const inputs_uncheck = document.querySelectorAll("input[type='radio'], input[type='checkbox']");
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
    console.log("Index : " + pageIndex);
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
	console.log("Index : " + pageIndex);

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
	console.log("Réponses de l'utilisateur :", reponses);

	reponses.forEach(reponse => {
		const input = document.getElementsByName(reponse)[0];
		if (input && input.getAttribute("name") === reponse) {
			console.log("input", input.getAttribute("name"));
			console.log("reponse", reponse);
			input.checked = true;
		}
	});
}

function showResults() {
    // Calculer le score ou afficher les réponses dans la dernière section
	let score = 0;
    const resultSpan = document.querySelector('article:last-of-type h2 span');
	const articles = document.getElementsByTagName("article");

	const inputs = document.querySelector(`input[type="hidden"]`);
	console.log("inputs", inputs);
		/*for (const input of inputs) {
			if (input && input.getAttribute("type") === "hidden") {
				console.log("input", input);
				if (input.getAttribute("value") === "true") {
					score++;
				}
			}
		}*/
	

    resultSpan.textContent = `${score} / ${articles.length - 2}`;

    // Afficher la section des résultats
    articles[pageIndex].classList.add("hidden");
    articles[articles.length - 1].classList.remove("hidden");
}
