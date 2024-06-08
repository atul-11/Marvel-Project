let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

// API keys and values
let ts = "1716545288061";
let publicKey = "c91bea2cedcc03f899417ca40b1d0ce5";
let hashVal = "57303454a185f745dc54066315ac0e60";

function displayWords(value) {
    input.value = value;
    removeElements();
}

function removeElements() {
    listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
    removeElements();
    if (input.value.length < 4) {
        return false;
    }
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&nameStartsWith=${input.value}`;
   
    const response = await fetch(url);
    const jsonData = await response.json();

    jsonData.data["results"].forEach((result) => {
        let name = result.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick", `displayWords('${name}')`);
        
        let word = "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        
        div.innerHTML = `<p class="item">${word}</p>`;
        listContainer.appendChild(div);
    });
});

button.addEventListener("click", async () => {
    if (input.value.trim().length < 1) {
        alert("Input cannot be blank");
        return;
    }
    
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&nameStartsWith=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    
    jsonData.data["results"].forEach((element) => {
        showContainer.innerHTML += `
        <div class="card-container">    
            <div class="container-character-image">
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}">
            </div>
            <div class="character-name">${element.name}</div>
            <div class="character-description">${element.description || "No description available"}</div>
        </div>`;
    });
});

window.onload = async () => {
    // Assuming you want to fetch and display some default results on load
    const defaultUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&nameStartsWith=iron%20man`;

    const response = await fetch(defaultUrl);
    const jsonData = await response.json();
    
    jsonData.data["results"].forEach((element) => {
        showContainer.innerHTML += `
        <div class="card-container">    
            <div class="container-character-image">
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}">
            </div>
            <div class="character-name">${element.name}</div>
            <div class="character-description">${element.description || "No description available"}</div>
        </div>`;
    });
};
