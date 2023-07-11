function calcularFrigorias(metrosCuadrados) {
    const ratio = 100;
    
    let frigorías = metrosCuadrados * ratio;
    
    return frigorías;
}

function calculador() {
    let seguirCalculando = true;
    do {
        let metrosCuadrados = prompt("Por favor, introduce los metros cuadrados de tu habitación.");
        
        if (isNaN(metrosCuadrados)) {
            console.log("La entrada debe ser un número. Por favor, inténtalo de nuevo.");
            continue; 
        }
        
        let frigorías = calcularFrigorias(metrosCuadrados);
        
        console.log("Necesitás comprar un aire de " + frigorías + " frigorías para enfriar tu habitación de " + metrosCuadrados + " metros cuadrados.");
        
        let respuesta = prompt("¿Querés calcular las frigorías para otra habitación? (si/no)");
        if (respuesta.toLowerCase() !== "si") {
            seguirCalculando = false;
        }
    } while (seguirCalculando);
}

calculador();
