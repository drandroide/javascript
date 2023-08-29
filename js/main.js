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
    const listaAires = document.getElementById("listaAires");
    const metrosCuadrados = document.getElementById("metrosCuadrados").value;
    const frigorias = calcularFrigorias(metrosCuadrados);
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

function agregarAlCarrito(aire) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(aire);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

function calcularImporteTotal(carrito) {
    return carrito.reduce((total, aire) => total + aire.precio, 0);
}

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const listaCarrito = document.getElementById("carrito");
    const total = calcularImporteTotal(carrito);
    
    listaCarrito.innerHTML = '';
    
    let container = document.createElement("div");
    container.className = "container";
    
    carrito.forEach(aire => {
        let cardDiv = document.createElement("div");
        cardDiv.className = "card mb-3";
        
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        
        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = `${aire.nombre} - ${aire.frigorias} frigorías - ${aire.tipo} - $${aire.precio}`;
        
        cardBody.appendChild(cardText);
        cardDiv.appendChild(cardBody);
        
        container.appendChild(cardDiv);
    });
    
    let divTotal = document.createElement("div");
    divTotal.className = "row mb-2";
    let pTotal = document.createElement("p");
    pTotal.className = "col font-weight-bold";
    pTotal.textContent = `Total a abonar: $${total}`;
    divTotal.appendChild(pTotal);
    container.appendChild(divTotal);
    
    let btnComprar = document.createElement("button");
    btnComprar.className = "btn btn-primary mb-2";
    btnComprar.textContent = "Comprar";
    btnComprar.addEventListener('click', () => {
        mostrarFechasInstalacion ();
    });
    container.appendChild(btnComprar);
    
    listaCarrito.appendChild(container);
    
    if (listaCarrito.style.display === 'none' || listaCarrito.style.display === '') {
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

function mostrarFechasInstalacion() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const fechasContainer = document.getElementById('fechas-container');

    if (carrito.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'Primero agrega productos al carrito antes de continuar.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
        return; 
    }

    if (fechasContainer.children.length > 1) { 
        return;
    }

    let URL = "./calendario.json";

    fetch(URL)
    .then(response => response.json())
    .then(data => {
        const fechasDisponibles = data.fechas;

        let titulo = document.createElement("h3");
        titulo.textContent = "Estas son las fechas disponibles para la instalación";
        fechasContainer.appendChild(titulo);

        fechasDisponibles.forEach((fechaObj) => {
            const fechaElement = document.createElement('div');
            fechaElement.className = "row mb-2";
            fechaElement.innerHTML = `
            <h2 class="col">${fechaObj.dia}</h2>
            <p class="col">Fecha: ${fechaObj.fecha}</p>
            <p class="col">Hora: ${fechaObj.hora}</p>
            `;
            const btnAgendar = document.createElement('button');
            btnAgendar.className = "btn btn-success col";
            btnAgendar.textContent = "Agendar";
            fechaElement.appendChild(btnAgendar);
            fechasContainer.appendChild(fechaElement);

            btnAgendar.addEventListener('click', () => {
                Swal.fire({
                    title: '¡Listo!',
                    text: 'Se confirmó tu instalación.',
                    icon: 'success'
                });
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

cargarCarrito();

const calcularBtn = document.getElementById('calcularBtn');
calcularBtn.addEventListener('click', function() {
    const metrosCuadrados = document.getElementById("metrosCuadrados").value;
    const frigorias = calcularFrigorias(metrosCuadrados);

    Swal.fire({
        title: 'Frigorías necesarias',
        text: `Necesitas ${frigorias} frigorías para tu habitación.`,
        icon: 'info',
        confirmButtonText: 'Entendido',
        preConfirm: () => {
            calculador();
        }
    });
});

const verCarritoBtn = document.getElementById('verCarritoBtn');
verCarritoBtn.addEventListener('click', () => {
    cargarCarrito();
});

const borrarCarritoBtn = document.getElementById('borrarCarritoBtn');
borrarCarritoBtn.addEventListener('click', () => { 
    borrarCarrito();
});
