const typeImages = {"normal": "./img/types/normal.svg", "fire": "./img/types/fire.svg", "water": "./img/types/water.svg", "grass": "./img/types/grass.svg", "electric": "./img/types/electric.svg", "psychic": "./img/types/psychic.svg", "fighting": "./img/types/fighting.svg", "poison": "./img/types/poison.svg", "ground": "./img/types/ground.svg", "fairy": "./img/types/fairy.svg", "bug": "./img/types/bug.svg", "rock": "./img/types/rock.svg", "ghost": "./img/types/ghost.svg", "dragon": "./img/types/dragon.svg", "dark": "./img/types/dark.svg", "steel": "./img/types/steel.svg", "ice": "./img/types/ice.svg", "flying": "./img/types/flying.svg"};
const typeColors = { normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C", grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1", ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A", rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", dark: "#705746", steel: "#B7B7CE", fairy: "#D685AD" };

function openOverlay(pokemon, currentIndex) {
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlay-content');
    if (!overlay || !overlayContent) return console.error("Overlay nicht gefunden!");
    const primaryType = pokemon.types[0].type.name;
    overlayContent.style.backgroundColor = typeColors[primaryType];
    overlayContent.innerHTML = createOverlayHTML(pokemon, typeColors[primaryType], currentIndex);

    const prevBtn = overlayContent.querySelector('#prevBtn');
    const nextBtn = overlayContent.querySelector('#nextBtn');
    if (prevBtn && nextBtn) {
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'hidden';
    }
    overlay.style.display = 'flex';
    overlay.onclick = (e) => e.target === overlay && closeOverlay();
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

function changeTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelector(`.tab[onclick="changeTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

