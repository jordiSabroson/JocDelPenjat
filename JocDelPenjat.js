console.log("1. Iniciar");
console.log("2. Mostrar estadístiques");
console.log("3. Sortir");

let opcio = prompt("Tria una opció: ");
while (isNaN(opcio) || opcio == null || opcio < 1 || opcio > 3) {
    alert("La opció introduïda no és correcte!");
    opcio = prompt("Tria una opció: ");
}

let lletresEndevinades = [];
let lletresFallades = [];
let max = 6;

let guanyades = parseInt(localStorage.getItem("guanyades"));

let perdudes = localStorage.getItem("perdudes");

let jugades = localStorage.getItem("jugades");

if (opcio == 1) {
    novaPartida();
}

if (opcio == 2) {
    estadistiques();
}

if (opcio == 3) {
    sortir();
}

function valid(caracter) {
    return caracter.match(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]$/);
}

function novaPartida() {
    let paraula = prompt("Introdueix una paraula per jugar al penjat: ").toLowerCase();
    if (paraula.length < 1) {
        alert("La paraula ha de tenir una lletra com a mínim.");
        novaPartida();
    }
    console.clear();
    let endevina = "_".repeat(paraula.length);
    console.log(endevina);
    let lletra, c = 0, contador = 0;
    do {
        lletra = prompt("Endevina una lletra: ").toLowerCase();
        if (lletra.length != 1 || !valid(lletra)) {
            alert("Si us plau, introdueix una única lletra vàlida.");
            continue;
        }


        let lletraCorrecta = false;
        for (let i = 0; i < paraula.length; i++) {
            if (paraula[i] == lletra) {
                endevina = endevina.substring(0, i) + lletra + endevina.substring((i + 1));
                console.log(endevina);
                c++;
                lletraCorrecta = true;
                lletresEndevinades.push(lletra);
            }
        }
        if (!lletraCorrecta) {
            if (lletresFallades.includes(lletra)) {
                console.log("Aquesta lletra ja l'has introduit!");
                continue;
            }
            lletresFallades.push(lletra);
            console.log("Incorrecte! Portes " + (contador + 1) + "/" + max + " intents. Lletres incorrectes: " + lletresFallades.join(", "));
            contador++;
        }
    } while (c < paraula.length && contador < max)
    if (c == paraula.length) {
        console.log("Has endevinat la paraula! Era " + paraula);
        localStorage.setItem("guanyades", ++guanyades);
        localStorage.setItem("jugades", ++jugades);
    } else {
        console.log("Has fet " + contador + "/" + max + " intents ! La paraula era: " + paraula);
        localStorage.setItem("perdudes", ++perdudes);
        localStorage.setItem("jugades", ++jugades);
    }
}

function estadistiques() {
    console.log("Total de partides: " + jugades);
    console.log("Partides guanyades (" + (guanyades / jugades * 100).toFixed(2) + "%): " + guanyades);
    console.log("Partides perdudes (" + (perdudes / jugades * 100).toFixed(2) + "%): " + perdudes);
}

function sortir() {
    console.log("Sortint del joc");
    return;
}