const typeImages = {
    normal: "./img/types/normal.svg",
    fire: "./img/types/fire.svg",
    water: "./img/types/water.svg",
    grass: "./img/types/grass.svg",
    electric: "./img/types/electric.svg",
    psychic: "./img/types/psychic.svg",
    fighting: "./img/types/fighting.svg",
    poison: "./img/types/poison.svg",
    ground: "./img/types/ground.svg",
    fairy: "./img/types/fairy.svg",
    bug: "./img/types/bug.svg",
    rock: "./img/types/rock.svg",
    ghost: "./img/types/ghost.svg",
    dragon: "./img/types/dragon.svg",
    dark: "./img/types/dark.svg",
    steel: "./img/types/steel.svg",
    ice: "./img/types/ice.svg",
    flying: "./img/types/flying.svg",
};

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};

function openOverlay(pokemon, currentIndex) {
    const overlay = document.getElementById("overlay");
    const overlayContent = document.getElementById("overlay-content");

    if (!overlay || !overlayContent) {
        console.error("Overlay nicht gefunden!");
        return;
    }

    const primaryType = pokemon.types[0].type.name;
    const backgroundColor = typeColors[primaryType];

    overlayContent.style.backgroundColor = backgroundColor;
    overlayContent.innerHTML = createOverlayHTML(pokemon, currentIndex);

    updateNavigationButtons(currentIndex);

    overlay.style.display = "flex";

    overlay.onclick = (event) => {
        if (event.target === overlay) {
            closeOverlay();
        }
    };
}

function updateNavigationButtons(currentIndex) {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (prevBtn) {
        prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    }

    if (nextBtn) {
        nextBtn.style.display =
            currentIndex === pokemonData.length - 1 ? "none" : "block";
    }
}

function closeOverlay() {
    const overlay = document.getElementById("overlay");

    if (overlay) {
        overlay.style.display = "none";
    }
}

function changeTab(tabName) {
    document.querySelectorAll(".tab").forEach((tab) => {
        tab.classList.remove("active");
    });

    document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
    });

    const selectedTab = document.querySelector(
        `.tab[onclick="changeTab('${tabName}')"]`
    );
    const selectedContent = document.getElementById(tabName);

    if (selectedTab && selectedContent) {
        selectedTab.classList.add("active");
        selectedContent.classList.add("active");
    }
}

