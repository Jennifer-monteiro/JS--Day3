document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", function () {
        fetchPokemonData();
    });

    function fetchPokemonData() {
        const enteredPokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${enteredPokemonName}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Pokemon not found. Please enter a valid name.");
                }
                return response.json();
            })
            .then((data) => {
                const pokemonInfoContainer = document.getElementById("pokemonInfo");
                const pokemonNameElement = document.getElementById("pokemonNameSpan");
                const pokemonImageElement = document.getElementById("pokemonImage");
                const abilitiesListElement = document.getElementById("abilitiesList");

                pokemonNameElement.textContent = data.name;
                pokemonImageElement.src = data.sprites.front_default;

                abilitiesListElement.innerHTML = "";

                data.abilities.forEach((ability) => {
                    const abilityListItem = document.createElement("li");
                    abilityListItem.textContent = ability.ability.name;
                    abilitiesListElement.appendChild(abilityListItem);
                });

                pokemonInfoContainer.style.display = "block";
            })
            .catch((error) => {
                console.error("Error: ", error);
                alert(error.message);
            });
    }
});
