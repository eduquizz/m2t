var pageIndex;
var reponses;

function pageSuivante() {
	console.log("Index : " + pageIndex);
	if (pageIndex >= 1) {
		var pageActuelle = document.getElementsByTagName("article")[pageIndex];
		var pageSuivante = document.getElementsByTagName("article")[pageIndex + 1];
		pageActuelle.classList.add("hidden");
		pageSuivante.remove("hidden");
		// TODO: ajouter les reponses dans le tableau
		var reponsesQuestionActuelle = document.getElementsByName("question-" + pageIndex);
		pageIndex++;
	} else {
		document.getElementsByTagName("main")[0].classList.add("hidden");
		pageIndex++;
		document.getElementsByTagName("article")[pageIndex].classList.remove("hidden");
	}
}

function pagePrecedente() {
	console.log("Index : " + pageIndex);
	if (pageIndex > 1) {
		document.getElementsByTagName("article")[pageIndex].classList.add("hidden");
		pageIndex--;
		document.getElementsByTagName("article")[pageIndex].classList.remove("hidden");
	} else {
		document.getElementsByTagName("article")[pageIndex].classList.add("hidden");
		pageIndex--;
		document.getElementsByTagName("main")[0].classList.remove("hidden");
	}
}

function startQuiz() {
	pageIndex = 0;
	answers = [];
	pageSuivante();
}
