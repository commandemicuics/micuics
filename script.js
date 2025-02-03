document.addEventListener("DOMContentLoaded", function () {
    // Charger les données CSV pour le classement
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUCMqpGR25E3pSTtY4xqKp_S36-WAOyD5B5G1Ne5-xolv_-Ru_mGnx53YXcDuADBBGjZbXPZF7Cefs/pub?gid=977177823&single=true&output=csv";
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

    // Génération des flocons
    const snowflakesContainer = document.getElementById("snowflakes-container");

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");

        // Ajouter un caractère Unicode de flocon de neige
        snowflake.textContent = "❄️";

        // Position horizontale aléatoire
        const randomX = Math.random();
        snowflake.style.setProperty("--random-x", randomX);

        // Durée de chute aléatoire
        const randomDuration = Math.random() * 10 + 5; // Entre 5 et 15 secondes
        snowflake.style.animationDuration = `${randomDuration}s`;

        // Taille aléatoire
        const randomSize = Math.random() * 10 + 10; // Entre 10px et 20px
        snowflake.style.fontSize = `${randomSize}px`;

        // Opacité aléatoire
        const randomOpacity = Math.random() * 0.3 + 0.5; // Entre 0.5 et 0.8
        snowflake.style.opacity = randomOpacity;

        // Ajouter le flocon au conteneur
        snowflakesContainer.appendChild(snowflake);

        // Supprimer le flocon après la fin de l'animation
        snowflake.addEventListener("animationend", () => {
            snowflake.remove();
        });
    }

    // Créer des flocons à intervalle régulier
    setInterval(createSnowflake, 100); // Un nouveau flocon toutes les 100ms
});
