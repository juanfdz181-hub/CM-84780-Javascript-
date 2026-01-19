
// declaro objeto para los precios
const precios = {
  kiwi: 1500,
  banana: 900,
  pera: 300
};

// variables principales
let precioFinal = 0;
let carrito = [];

const form = document.getElementById("formCompra");


//evento principal

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const producto = document.getElementById("producto").value;
  const kilos = parseFloat(document.getElementById("kilos").value);

  if (producto === "" || isNaN(kilos) || kilos <= 0) {
    
    return;

  }

  agregarAlCarrito(producto, kilos);
});


//funcion agregar carrito

function agregarAlCarrito(producto, kilos) {
  const subtotal = precios[producto] * kilos;

  carrito.push({ producto, kilos, subtotal });
  precioFinal += subtotal;

  guardarCarrito();
  renderCarrito();
}

function renderCarrito() {
  const lista = document.getElementById("listaCarrito");
  const total = document.getElementById("total");

  lista.innerHTML = "";

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.producto} - ${item.kilos} kg - $${item.subtotal}`;
    lista.appendChild(li);
  });

  total.textContent = `Total a pagar: $${precioFinal}`;
}

// punto obligatorio para guardar la informacion

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", precioFinal);
}

function cargarCarrito() {
  const data = localStorage.getItem("carrito");
  const totalGuardado = localStorage.getItem("total");

  if (data) {
    carrito = JSON.parse(data);
    precioFinal = Number(totalGuardado);
    renderCarrito();
  }
}

cargarCarrito();


