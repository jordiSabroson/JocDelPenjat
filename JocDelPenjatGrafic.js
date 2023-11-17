// Variable que conté les lletres que s'imprimiran com a botons per jugar
let abc = ["A", "B", "C", "Ç", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Variables per inicialitzar els arrays amb les lletres endevinades i fallades
let lletresEndevinades = [];
let lletresFallades = [];

// Variable amb els intents màxims del joc
let max = 6;

let paraula = "";
let endevina = "";
let errors = "";
let botons = '';

let be = 0, malament = 0;

let lletraCorrecta = false;

// Variables que emmagatzemen localment les partides guanyades, perdudes i jugades (les inicialitza a 0 si no existeixen)
let guanyades = localStorage.getItem("guanyades") || 0;
let perdudes = localStorage.getItem("perdudes") || 0;
let jugades = localStorage.getItem("jugades") || 0;

function valid(caracter) {
    return caracter.match(/^[a-zA-ZàáèéìíòóùúÀÁÈÉÌÍÒÓÙÚüÜñÑçÇ]$/);
}

function validarParaula(paraula) {
    return /^[^0-9\s]+$/.test(paraula) && paraula.length > 1;
}

function novaPartida() {
    do {
        paraula = prompt("Introdueix una paraula: ");
    } while (!validarParaula(paraula));
    paraula = paraula.toUpperCase();

    for (let i = 0; i < abc.length; i++) {
        let char = abc[i];
        botons += '<button id="' + char + '" onclick="clickLletra(\'' + char + '\')">' + char + '</button>';
    }
    document.getElementById("abecedari").innerHTML = botons;
    document.querySelector("#novaPartida").remove();
    document.querySelector("#estadistiques").remove();

    for (let i = 0; i < paraula.length; i++) {
        endevina += "_";
    }

    document.getElementById("jocPenjat").innerHTML = endevina;

    let imatge = document.getElementById("imatgePenjat");
    imatge.src = "img/penjat_" + malament + ".png";

}

function clickLletra(lletra) {
    do {
        lletraCorrecta = false;
    
        for (let i = 0; i < paraula.length; i++) {
            if (paraula[i] == lletra) {
                lletraCorrecta = true;
                endevina = endevina.substring(0, i) + lletra + endevina.substring((i + 1));
            }
        }
    
        if (lletraCorrecta) {
            be++;
            lletresEndevinades.push(lletra);
            document.getElementById("jocPenjat").innerHTML = endevina;
            document.getElementById(lletra).disabled = true;
        } else {
            lletresFallades.push(lletra);
            malament++;
            errors = "Errors: " + malament + "/" + max
            document.getElementById("lletresUtilitzades").innerHTML = errors;
            document.getElementById(lletra).disabled = true;

        }
    } while (be < paraula.length && malament < max);

}

function estadistiques() {

}
