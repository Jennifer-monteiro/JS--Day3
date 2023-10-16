document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", function () {
        getPokemonData();
    });

    function getPokemonData() {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Pokemon not found. Please enter a valid name.");
                }
                return response.json();
            })
            .then((data) => {
                const pokemonInfo = document.getElementById("pokemonInfo");
                const pokemonNameSpan = document.getElementById("pokemonNameSpan");
                const pokemonImage = document.getElementById("pokemonImage");
                const abilitiesList = document.getElementById("abilitiesList");

                pokemonNameSpan.textContent = data.name;
                pokemonImage.src = data.sprites.front_default;

                abilitiesList.innerHTML = ""; // Clear previous abilities

                data.abilities.forEach((ability) => {
                    const li = document.createElement("li");
                    li.textContent = ability.ability.name;
                    abilitiesList.appendChild(li);
                });

                pokemonInfo.style.display = "block";
            })
            .catch((error) => {
                console.error("Error: ", error);
                alert(error.message);
            });
    }
});
