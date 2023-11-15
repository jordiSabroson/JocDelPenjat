// Mostrar les opcions del menú principal del joc
console.log("1. Iniciar");
console.log("2. Mostrar estadístiques");
console.log("3. Sortir");

// Demanem que l'usuari trii una opció
let opcio = prompt("Tria una opció: ");

// Verificar que la opció introduida sigui correcte
while (isNaN(opcio) || opcio == null || opcio < 1 || opcio > 3) {
    alert("La opció introduïda no és correcte!");
    opcio = prompt("Tria una opció: ");
}

// Variables per inicialitzar els arrays amb les lletres endevinades i fallades
let lletresEndevinades = [];
let lletresFallades = [];

// Variable amb els intents màxims del joc
let max = 6;

// Variables que emmagatzemen localment les partides guanyades, perdudes i jugades (les inicialitza a 0 si no existeixen)
let guanyades = localStorage.getItem("guanyades") || 0;
let perdudes = localStorage.getItem("perdudes") || 0;
let jugades = localStorage.getItem("jugades") || 0;

// Depenent de quina funció esculli l'usuari, es crida a la funció corresponent
if (opcio == 1) {
    novaPartida();
}

if (opcio == 2) {
    estadistiques();
}

if (opcio == 3) {
    sortir();
}

// Funció que valida el caràcter que s'introdueix al jugar 
function valid(caracter) {
    return caracter.match(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]$/);
}

// Funció que conté el joc del penjat
function novaPartida() {

    // Primer demanem la paraula per jugar i la passem a minúscula
    let paraula = prompt("Introdueix una paraula per jugar al penjat: ").toLowerCase();
    
    // Si la paraula només té una lletra, no es deixa jugar i es torna a demanar la paraula
    if (paraula.length < 1) {
        alert("La paraula ha de tenir una lletra com a mínim.");
        novaPartida();
    }

    // Es neteja la consola per treure les opcions del menú de la consola
    console.clear();

    // Variable que mostra el progrés de la paraula per consola
    let endevina = "_".repeat(paraula.length);
    console.log(endevina);

    // Variables per controlar els intents bons i dolents
    let lletra, be = 0, contador = 0;

    // Do while per endevinar la lletra
    do {

        // Demanem la lletra i la passem a minúscula
        lletra = prompt("Endevina una lletra: ").toLowerCase();
        
        // Comprovem que només s'hagi introduit una lletra i que sigui correcta amb la funció valid()
        if (lletra.length != 1 || !valid(lletra)) {
            alert("Si us plau, introdueix una única lletra vàlida.");
            continue;
        }

        // Declarem una variable en false que es converteix a true si s'endevina la lletra
        let lletraCorrecta = false;

        // Bucle que itera la longitud de la paraula
        for (let i = 0; i < paraula.length; i++) {

            // Si la posició de la paraula és igual a la lletra:
            if (paraula[i] == lletra) {

                // IF per comprovar que la lletra encertada no hagi estat encertada abans
                if (lletresEndevinades.includes(lletra)) {
                    console.log("Aquesta lletra ja l'has endevinat");
                    lletraCorrecta = true;
                    continue;
                }

                // S'imprimeix la cadena endevina junt amb la lletra en la seva posició correcte
                endevina = endevina.substring(0, i) + lletra + endevina.substring((i + 1));
                console.log(endevina);
                
                // S'augmenta el contador de lletres correctes
                be++;

                // LletraCorrecta és converteix a true
                lletraCorrecta = true;

                // S'afegeix la lletra a l'array de lletresEndevinades
                lletresEndevinades.push(lletra);
            }
        }

        // Si la variable lletraCorrecta segueix sent false:
        if (!lletraCorrecta) {

            // Comprovem si la lletra introduida ja figura a l'array de lletres fallades perquè no conti com un intent més
            if (lletresFallades.includes(lletra)) {
                console.log("Aquesta lletra ja l'has introduit!");
                continue;
            }

            // Si la lletra no és a l'array, se l'afegeix i s'informa per consola dels intents que es porten i es mostra l'array de lletres fallades
            lletresFallades.push(lletra);
            console.log("Incorrecte! Portes " + (contador + 1) + "/" + max + " intents. Lletres incorrectes: " + lletresFallades.join(", "));
            
            // S'incrementa el contador de lletres incorrectes
            contador++;
        }

    // El bucle segueix fins que el contador de lletres correctes sigui major que la longitud de la paraula  o el contador d'incorrectes superi als intents màxims
    } while (be < paraula.length && contador < max)
    
    // Si el contador de lletres correctes és igual a la longitud de la paraula vol dir que s'ha endevinat
    if (be == paraula.length) {

        // S'informa de que s'ha endevinat la paraula i es mostra quina era
        console.log("Has endevinat la paraula! Era " + paraula);

        // Recuperem les variables locals i s'incrementa la de partides guanyades i jugades
        localStorage.setItem("guanyades", ++guanyades);
        localStorage.setItem("jugades", ++jugades);

    // Si el contador de lletres correctes no és igual a la longitud de la paraula vol dir que no s'ha endevinat
    } else {

        // S'informa de que s'han fet els intents màxims i es diu quina paraula era
        console.log("Has fet " + contador + "/" + max + " intents ! La paraula era: " + paraula);
        
        // S'incrementen les variables locals de partides perdudes i jugades
        localStorage.setItem("perdudes", ++perdudes);
        localStorage.setItem("jugades", ++jugades);
    }
}

// Funció d'estadístiques que mostra per consola les variables locals
function estadistiques() {
    console.log("Total de partides: " + jugades);

    // Es mostra també el percentatge de partides guanyades i perdudes junt amb el nombre de partides
    console.log("Partides guanyades (" + (guanyades / jugades * 100).toFixed(2) + "%): " + guanyades);
    console.log("Partides perdudes (" + (perdudes / jugades * 100).toFixed(2) + "%): " + perdudes);
}

// La funció sortir informa de que s'està sortint del joc i es fa un return per acabar el programa
function sortir() {
    console.log("Sortint del joc");
    return;
}