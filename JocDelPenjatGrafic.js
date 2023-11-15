// Variable que conté les lletres que s'imprimiran com a botons per jugar
let abc = ["A", "B", "C", "Ç", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Variables per inicialitzar els arrays amb les lletres endevinades i fallades
let lletresEndevinades = [];
let lletresFallades = [];

// Variable amb els intents màxims del joc
let max = 6;

// Variables que emmagatzemen localment les partides guanyades, perdudes i jugades (les inicialitza a 0 si no existeixen)
let guanyades = localStorage.getItem("guanyades") || 0;
let perdudes = localStorage.getItem("perdudes") || 0;
let jugades = localStorage.getItem("jugades") || 0;


function novaPartida() {
    for (let i = 0; i < abc.length; i++) {
        let button = document.createElement("button");
        button.innerText = abc[i];
        button.onclick = function() {
            clickLletra(abc[i]);
        };
        document.querySelector("#abecedari").appendChild(button);
    }
    document.querySelector("#novaPartida").remove();
    document.querySelector("#estadistiques").remove();

    let paraula;
    do {
        paraula = prompt("Introdueix una paraula: ");
    } while (paraula < 1)

    let endevina = "";
    for (let i = 0; i < paraula.length; i++) {
        endevina += "_ ";
    }
    document.getElementById("jocPenjat").innerHTML = endevina;

    // do {
        
    // } while(a);

}

function clickLletra(lletra) {
    return lletra;
}

function estadistiques() {

}
