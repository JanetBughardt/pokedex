let pokemonData = [];
let allPokemon = [];
let currentOffset = 0;
let currentPokemonIndex = 0;

async function init() {
    await Promise.all([
        loadAllPokemon(),
        fetchPokemonData()
    ]);
}

async function loadMore() {
    await fetchPokemonData();
}

async function fetchPokemonData() {
    const loader = document.getElementById('loader');
    if (!loader) return console.error("Loader-Element nicht gefunden!");

    loader.classList.remove('hidden');
    try {
        const limit = 50;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`);
        const { results } = await response.json();
        const newPokemon = results.filter(pokemon =>
            !pokemonData.some(existing => existing.name === pokemon.name)
        );
        pokemonData.push(...newPokemon);
        await renderCards(pokemonData.slice(currentOffset, currentOffset + limit));
        currentOffset += limit;
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Daten:', error);
    } finally {
        loader.classList.add('hidden');
    }
}

async function renderCards(pokemonArray) {
    const container = document.getElementById('card-container');

    if (!container) {
        console.error('Container für die Pokémon-Daten wurde nicht gefunden!');
        return;
    }

    container.innerHTML = '';

    for (const [index, pokemon] of pokemonArray.entries()) {
        try {
            const details = await fetchPokemonDetails(pokemon.url);

            if (!details) continue;

            const primaryType = details.types[0].type.name;
            const backgroundClass = `bg-${primaryType.toLowerCase()}`;

            const typesHTML = details.types
                .map(typeInfo =>
                    typeImages[typeInfo.type.name]
                        ? `<img src="${typeImages[typeInfo.type.name]}" alt="${typeInfo.type.name}" class="type-img">`
                        : typeInfo.type.name
                )
                .join('');

            const card = document.createElement('div');
            card.classList.add('pokemon-card', backgroundClass);

            card.innerHTML = `
                <h3>${capitalizeFirstLetter(details.name)}</h3>
                <img src="${details.sprites.other['official-artwork'].front_default}" alt="${details.name}">
                <div class="types bg-secondary">
                    <strong>Typen:</strong> ${typesHTML}
                </div>
            `;

            const globalIndex = pokemonData.findIndex(
                currentPokemon => currentPokemon.name === pokemon.name
            );

            card.onclick = () => {
                currentPokemonIndex = globalIndex;
                openOverlay(details, currentPokemonIndex);
            };

            container.appendChild(card);

        } catch (error) {
            console.error('Fehler beim Laden der Pokémon-Details:', error);
        }
    }
}

async function navigatePokemon(direction) {
    const nextIndex = currentPokemonIndex + direction;
    if (nextIndex >= 0 && nextIndex < pokemonData.length) {
        currentPokemonIndex = nextIndex;
        const details = await fetchPokemonDetails(pokemonData[currentPokemonIndex].url);
        openOverlay(details, currentPokemonIndex);
    }
}

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Fehler beim Abrufen der Pokémon-Details:", error);
        return null;
    }
}

async function searchPokemon() {
    const searchTerm = document
        .getElementById('search-input')
        .value
        .toLowerCase()
        .trim();

    if (!searchTerm) {
        renderCards(pokemonData);
        return;
    }

    if (searchTerm.length < 3) {
        console.warn('Bitte mindestens 3 Buchstaben eingeben.');
        return;
    }

    const filteredPokemon = allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );

    renderCards(filteredPokemon);
}
async function loadAllPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        allPokemon = data.results;
    } catch (error) {
        console.error('Fehler beim Laden aller Pokémon:', error);
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

window.onload = init;