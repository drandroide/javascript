function calcularFrigorias(metrosCuadrados) {
    const ratio = 100;
    return metrosCuadrados * ratio;
}

function airesAcondicionados(nombre, frigorias, tipo, precio) {
    this.nombre = nombre;
    this.frigorias = frigorias;
    this.tipo = tipo;
    this.precio = precio;
}

function agregarAlCarrito(aire) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(aire);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

let producto1 = new airesAcondicionados("Surrey", 2500, "frio", 150000);
let producto2 = new airesAcondicionados("LG", 3500, "frio/calor", 250000);
let producto3 = new airesAcondicionados("Samsung", 3000, "frio/calor", 200000);
let producto4 = new airesAcondicionados("Carrier", 4500, "frio", 350000);
let producto5 = new airesAcondicionados("Hitachi", 6500, "frio/calor", 650000);

let lista = [producto1, producto2, producto3, producto4, producto5];

function buscarAires(frigorias) {
    return lista.filter(aire => aire.frigorias >= frigorias);
}

function calculador() {
    const metrosCuadrados = document.getElementById("metrosCuadrados").value;
    const listaAires = document.getElementById("listaAires");
    
    let frigorias = calcularFrigorias(metrosCuadrados);
    let airesAdecuados = buscarAires(frigorias);
    
    listaAires.innerHTML = airesAdecuados.length ? '' : "<li>No hay aires adecuados para la habitación</li>";

    airesAdecuados.forEach(aire => {
        let li = document.createElement("li");
        li.className = "card";  
        li.textContent = `${aire.nombre} - ${aire.frigorias} frigorías - ${aire.tipo} - $${aire.precio}`;
        
        let boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";
        boton.addEventListener('click', () => agregarAlCarrito(aire)); 
        
        li.appendChild(boton);
        listaAires.appendChild(li);
    });
}

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const listaCarrito = document.getElementById("carrito");
    
    if (listaCarrito.style.display === 'none' || listaCarrito.style.display === '') {
        listaCarrito.innerHTML = '';
        carrito.forEach(aire => {
            let li = document.createElement("li");
            li.textContent = `${aire.nombre} - ${aire.frigorias} frigorías - ${aire.tipo} - $${aire.precio}`;
            listaCarrito.appendChild(li);
        });
        listaCarrito.style.display = 'block'; 
    } else {
        listaCarrito.style.display = 'none'; 
    }
}

function borrarCarrito() {
    localStorage.removeItem("carrito");
    const listaCarrito = document.getElementById("carrito");
    listaCarrito.innerHTML = '';
}

document.getElementById('calcularBtn').addEventListener('click', calculador);
document.getElementById('verCarritoBtn').addEventListener('click', cargarCarrito);
document.getElementById('borrarCarritoBtn').addEventListener('click', borrarCarrito);

cargarCarrito();
