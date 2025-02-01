document.addEventListener("DOMContentLoaded", function () {
    // Charger les données CSV pour le classement
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNt4LhcL_7ONX9xynngciezXrBAVlsf1jBWAR_03Kb8M9QLD8Uy0sZ7d_hIplKfet8jKc-37kSFFRz/pub?gid=0&single=true&output=csv";
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Ignorer la première ligne (en-têtes)
            const ranking = [];
            rows.forEach(row => {
                const [colocName, micuicsCount] = row.split(",");
                if (colocName && micuicsCount) {
                    ranking.push({
                        name: colocName,
                        count: parseInt(micuicsCount, 10)
                    });
                }
            });
            // Trier le classement par ordre décroissant
            ranking.sort((a, b) => b.count - a.count);
            // Insérer les données dans le tableau
            const tableBody = document.querySelector("#rankingTable tbody");
            ranking.forEach((item, index) => {
                const row = document.createElement("tr");
                const positionCell = document.createElement("td");
                positionCell.textContent = index + 1;
                const nameCell = document.createElement("td");
                nameCell.textContent = item.name;
                const countCell = document.createElement("td");
                countCell.textContent = item.count;
                row.appendChild(positionCell);
                row.appendChild(nameCell);
                row.appendChild(countCell);
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Erreur lors du chargement du CSV:", error));

    // Génération des étoiles
    const starsContainer = document.getElementById("stars-container");

    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");

        // Position horizontale aléatoire
        const randomX = Math.random();
        star.style.setProperty("--random-x", randomX);

        // Durée de chute aléatoire
        const randomDuration = Math.random() * 10 + 5; // Entre 5 et 15 secondes
        star.style.animationDuration = `${randomDuration}s`;

        // Taille aléatoire
        const randomSize = Math.random() * 2 + 1; // Entre 1px et 3px
        star.style.width = `${randomSize}px`;
        star.style.height = `${randomSize}px`;

        // Opacité aléatoire
        const randomOpacity = Math.random() * 0.5 + 0.3; // Entre 0.3 et 0.8
        star.style.opacity = randomOpacity;

        // Ajouter l'étoile au conteneur
        starsContainer.appendChild(star);

        // Supprimer l'étoile après la fin de l'animation
        star.addEventListener("animationend", () => {
            star.remove();
        });
    }

    // Créer des étoiles à intervalle régulier
    setInterval(createStar, 200); // Une nouvelle étoile toutes les 200ms
});