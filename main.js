const endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

let retter = [];

let filter = "alle";

const container = document.querySelector("#data-container");
const oversigtTemplate = document.querySelector("template");
const detalje = document.querySelector("#detalje");

document.addEventListener("DOMContentLoaded", start);

function start() {
    hentData();
    addEventListenersToButtons();
}

async function hentData() {
    const response = await fetch(endpoint);
    retter = await response.json();
    console.log(retter);
    visRetter();
}


// Gør retterne synlige
function visRetter() {
    container.innerHTML = "";
    retter.feed.entry.forEach(ret => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            let klon = oversigtTemplate.cloneNode(true).content;
            klon.querySelector(".navn").textContent = ret.gsx$navn.$t;
            klon.querySelector(".kategori").textContent = ret.gsx$kategori.$t;
            klon.querySelector(".kort").textContent = ret.gsx$kort.$t;
            klon.querySelector(".pris").textContent = ret.gsx$pris.$t + ".-";

            klon.querySelector("img").src = `imgs/small/${
                ret.gsx$billede.$t}-sm.jpg`;

            klon.querySelector("article").addEventListener("click", function () {

                location.href = "single.html?id=" + ret.gsx$id.$t;
            });

            container.appendChild(klon);

        }
    });
}


//Tilføjer elementer til min popup her
//function visDetalje(ret) {
//  detalje.classList.remove("skjul");
//  detalje.querySelector("button").addEventListener("click", () => detalje.classList.add("skjul"));

//  detalje.querySelector("h3").textContent = ret.gsx$navn.$t;
//  detalje.querySelector(".lang").textContent = ret.gsx$lang.$t;
//  detalje.querySelector(".pris").textContent = ret.gsx$pris.$t;

//  detalje.querySelector("img").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;

//}

//Tilføjer klik til filtreringen af de forskellige kategorier når man klikker på knapperne.
function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);

    })
}

function filtrering() {
    console.log("FILTER");
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("button_active");
        document.querySelector("h1").textContent = this.textContent;

    })

    filter = this.dataset.køn;
    visRetter();
    this.classList.add("button_active");
}


// gør farve på knappen rød effter click
