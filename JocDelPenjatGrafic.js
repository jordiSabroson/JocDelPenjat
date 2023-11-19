// Variable que conté les lletres que s'imprimiran com a botons per jugar
let abc = ["A", "B", "C", "Ç", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Variable per inicialitzar l'array amb les lletres fallades
let lletresFallades = [];

// Variable amb els intents màxims del joc
let max = 6;

// Variable per inicialitzar la paraula que demanarem, la string que es veurà durant el joc, la string per mostrar els errors durant el joc,
// la string on s'acumulen els botons de l'abecedari per mostrar-los a l'HTML i la string que utilitzarem per mostrar la imatge
let paraula = "";
let endevina = "";
let errors = "";
let botons = '';
let imatge;

// Variables que faran de contadors de paraules encertades o errònees
let be = 0, malament = 0;

// Variable booleana que servirà per executar segons quin codi si es false o true
let lletraCorrecta = false;

// Variables que emmagatzemen localment les partides guanyades, perdudes i jugades (les inicialitza a 0 si no existeixen)
let guanyades = localStorage.getItem("guanyades") || 0;
let perdudes = localStorage.getItem("perdudes") || 0;
let jugades = localStorage.getItem("jugades") || 0;

// Funció que valida que la paraula no contingui números i que tingui més d'un caràcter
function validarParaula(paraula) {
    return /^[^0-9\s]+$/.test(paraula) && paraula.length > 1;
}

function novaPartida() {

    // Recuperem la variable dels errors perquè la imatge del penjat es vegi bé
    malament = 0;

    // Bucle do while per demanar la paraula i validar-la utilitzant la funció
    do {
        paraula = prompt("Introdueix una paraula: ");
    } while (!validarParaula(paraula));

    // Passem la paraula a majúscula
    paraula = paraula.toUpperCase();

    // Bucle que itera la longitud de l'abecedari per crear una string amb tots els botons i posar-la a l'HTML amb el getElementById
    for (let i = 0; i < abc.length; i++) {
        let char = abc[i];
        botons += '<button id="' + char + '" onclick="clickLletra(\'' + char + '\')">' + char + '</button>';
    }
    document.getElementById("abecedari").innerHTML = botons;

    // Eliminem els botons de la pantalla d'inici
    document.querySelector("#novaPartida").remove();
    document.querySelector("#estadistiques").remove();
    document.querySelector("#esborrar").remove();

    // Fem un bucle per la string que es veurà durant el joc amb barres baixes que representen les lletres a endevinar
    for (let i = 0; i < paraula.length; i++) {
        endevina += "_";
    }
    document.getElementById("jocPenjat").innerHTML = endevina;

    // Assignem l'element img de l'HTML a la variable imatge i amb l'atribut src i la variable que recompta els errors mostrem la imatge corresponent
    imatge = document.getElementById("imatgePenjat");
    imatge.src = "img/penjat_" + malament + ".png";
}

function clickLletra(lletra) {

    // Fem que la variable torni a false cada cop que es premi el botó
    lletraCorrecta = false;

    // El botó queda deshabilitat un cop es prem
    document.getElementById(lletra).disabled = true;

    // Bucle que itera la longitud de la paraula i si alguna lletra de la paraula coincideix amb la lletra apretada torna la variable lletraCorrecta a true
    // i modifica la string endevina per veure el progrés de les lletres endevinades de la paraula
    for (let i = 0; i < paraula.length; i++) {
        if (paraula[i] == lletra) {
            lletraCorrecta = true;
            endevina = endevina.substring(0, i) + lletra + endevina.substring((i + 1));
        }
    }

    // Si la variable lletraCorrecta s'ha canviat a true, s'incrementa el comptador "be", i es mostra la string endevina amb la lletra endevinada
    if (lletraCorrecta) {
        be++;
        document.getElementById("jocPenjat").innerHTML = endevina;

    // Si la variable es false, s'incrementa el comptador "malament", s'afegeix la lletra a l'array i es modifica la imatge del penjat segons la variable "malament"
    } else {
        lletresFallades.push(lletra);
        malament++;
        let imatge = document.getElementById("imatgePenjat");
        imatge.src = "img/penjat_" + malament + ".png";
    }

    // Mostrem els errors independentment de si la lletra es correcta o no 
    errors = "Errors: " + malament + "/" + max + ". Lletres fallades: " + lletresFallades.join(", ");
    document.getElementById("lletresUtilitzades").innerHTML = errors;

    // Si la paraula s'ha endevinat, es mostra un alert amb un timeOut perquè es pugui veure la última lletra introduida
    if (be == paraula.length) {
        setTimeout(function () { alert("Has guanyat !"); }, 50);
        // Recuperem les variables locals i s'incrementa la de partides guanyades i jugades
        localStorage.setItem("guanyades", ++guanyades);
        localStorage.setItem("jugades", ++jugades);
    } else if (malament == max) {
        setTimeout(function () { alert("Has perdut! La paraula era " + paraula); }, 50);
        // S'incrementen les variables locals de partides perdudes i jugades
        localStorage.setItem("perdudes", ++perdudes);
        localStorage.setItem("jugades", ++jugades);
    }

}

function estadistiques() {
    // Declarem en una variable la nova finestra que s'obrirà per veure les estadístiques
    let stats = window.open("", "_blank");
    stats.document.write("Total de partides: " + jugades + "<br>");
    // Es mostra també el percentatge de partides guanyades i perdudes junt amb el nombre de partides
    stats.document.write("Partides guanyades (" + (guanyades / jugades * 100).toFixed(2) + "%): " + guanyades + "<br>");
    stats.document.write("Partides perdudes (" + (perdudes / jugades * 100).toFixed(2) + "%): " + perdudes);
}

function esborrarEstadistiques() {
    // Declarem els valors de les variables locals a 0 i ho informem
    localStorage.setItem("guanyades", 0);
    localStorage.setItem("perdudes", 0);
    localStorage.setItem("jugades", 0);
    guanyades = 0;
    perdudes = 0;
    jugades = 0;
    alert("Estadístiques esborrades.");
}
