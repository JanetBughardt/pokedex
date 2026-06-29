 function createOverlayHTML(pokemon, currentIndex) {
    const tabHTML = createTabs();
    const infoContentHTML = createInfoContent(pokemon);
    const progressBarsHTML = pokemon.stats.map(stat => {
        const normalizedValue = Math.round((stat.base_stat / 255) * 100);
        return `
            <div class="stat-bar">
                <label>${capitalizeFirstLetter(stat.stat.name)}: </label>
                <progress value="${normalizedValue}" max="100"></progress>
                <span>${normalizedValue}</span>
            </div>
        `;
    }).join('');

    return `
        <span class="close-btn" onclick="closeOverlay()">&times;</span> 
        <h2>${capitalizeFirstLetter(pokemon.name)}</h2>
        <img class="pokemon-img" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">

        ${tabHTML}

        <div id="info" class="tab-content active bg-light">${infoContentHTML}</div>
        <div id="stats" class="tab-content bg-light">
            ${progressBarsHTML}
        </div>

        <div class="overlay-nav bg-primary">
            <button id="prevBtn" class="nav-btn bg-transparent" onclick="navigatePokemon(-1)">
                <img src="./img/arrow-left.svg" alt="Zurück" class="arrow-img"> 
            </button>
            <button id="nextBtn" class="nav-btn bg-transparent" onclick="navigatePokemon(1)">
                <img src="img/arrow-right.svg" alt="Weiter" class="arrow-img">
            </button>
        </div>
    `;
}

function createTabs() {
    return `
        <div class="tabs bg-secondary">
            <div class="tab active" onclick="changeTab('info')">info</div>
            <div class="tab" onclick="changeTab('stats')">stats</div>
        </div>
    `;
}

function createInfoContent(pokemon) {
    return `
        <table class="info-table">
            <tr><th>Attribut</th><th>value</th></tr>
            <tr><td>ID</td><td>${pokemon.id}</td></tr>
            <tr><td>basic experience</td><td>${pokemon.base_experience}</td></tr>
            <tr><td>weight</td><td>${pokemon.weight / 10} kg</td></tr>
            <tr><td>size</td><td>${pokemon.height / 10} m</td></tr>
            <tr><td>type</td><td>${pokemon.types.map(type => type.type.name).join(', ')}</td></tr>
        </table>
    `;
}

function createStatsContent(pokemon) {
    const statsHTML = pokemon.stats.map(stat => `
        <tr>
            <td class="clickable" onclick="showStatInfo('${stat.stat.name}', ${stat.base_stat})">
                <strong>${stat.stat.name.toUpperCase()}</strong>
            </td>
            <td>${stat.base_stat}</td>
        </tr>
    `).join('');
    return `
        <table class="stats-table">
            <tr><th>Stat</th><th>Wert</th></tr>
            ${statsHTML}
        </table>
    `;
}






