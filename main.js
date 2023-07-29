function calcularFrigorias(metrosCuadrados) {
    const ratio = 100;
    
    let frigorias = metrosCuadrados * ratio;
    
    return frigorias;
}

const airesAcondicionados = function(nombre,frigorias,tipo,precio){
    this.nombre=nombre;
    this.frigorias=frigorias;
    this.tipo=tipo;
    this.precio=precio;
}


let producto1 = new airesAcondicionados("Surrey", 2500, "frio", 150000)
let producto2 = new airesAcondicionados("LG", 3500, "frio/calor", 250000)
let producto3 = new airesAcondicionados("Samsung", 3000, "frio/calor", 200000)
let producto4 = new airesAcondicionados("Carrier", 4500, "frio", 350000)
let producto5 = new airesAcondicionados("Hitachi", 6500, "frio/calor", 650000)


let lista = [producto1,producto2,producto3,producto4,producto5]

function buscarAires(frigorias) {
    return lista.filter(aire => aire.frigorias >= frigorias);
}

function calculador() {
    let seguirCalculando = true;
    do {
        let metrosCuadrados = prompt("Por favor, introduce los metros cuadrados de tu habitación.");
        
        if (isNaN(metrosCuadrados)) {
            console.log("La entrada debe ser un número. Por favor, inténtalo de nuevo.");
            continue; 
        }
        
        let frigorias = calcularFrigorias(metrosCuadrados);
        
        let airesAdecuados = buscarAires(frigorias);
        if (airesAdecuados.length > 0) {
            console.log("Estos son los aires acondicionados que podés comprar para enfriar tu habitación de " + metrosCuadrados + " metros cuadrados:");
            console.table(airesAdecuados);
        } else {
            console.log("Lo siento, no tenemos un aire acondicionado adecuado para tu habitación de " + metrosCuadrados + " metros cuadrados.");
        }
        
        let respuesta = prompt("¿Querés calcular las frigorías para otra habitación? (si/no)");
        if (respuesta.toLowerCase() != "si") {
            seguirCalculando = false;
        }
    } while (seguirCalculando);
}

calculador();