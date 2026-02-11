let productos = [];
let carrito = [];

// Cargo productos desde JSON 
fetch("productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    cargarProductos();
  });


function cargarProductos() {
  const select = document.getElementById("producto");

  select.innerHTML = `<option value="">Seleccione</option>`;

  productos.forEach(prod => {
    const option = document.createElement("option");
    option.value = prod.nombre;
    option.textContent = `${prod.nombre} - $${prod.precio}`;
    select.appendChild(option);
  });
}

//  formulario
document.getElementById("formCompra").addEventListener("submit", e => {
  e.preventDefault();

  const productoNombre = document.getElementById("producto").value;
  const kilos = parseFloat(document.getElementById("kilos").value);

  if (productoNombre === "" || isNaN(kilos) || kilos <= 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Debe seleccionar producto y cantidad válida"
    });
    return;
  }

  const producto = productos.find(p => p.nombre === productoNombre);

  const subtotal = producto.precio * kilos;

  carrito.push({
    id: Date.now(),
    producto: producto.nombre,
    kilos,
    subtotal
  });

  guardarCarrito();
  renderCarrito();

  Swal.fire({
    icon: "success",
    title: "Producto agregado"
  });
});


function renderCarrito() {
  const lista = document.getElementById("listaCarrito");
  const totalElemento = document.getElementById("total");

  lista.innerHTML = "";

  let total = 0;

  carrito.forEach(item => {
    total += item.subtotal;

    const li = document.createElement("li");

    li.innerHTML = `
      ${item.producto} - ${item.kilos}kg - $${item.subtotal}
      <button onclick="eliminarProducto(${item.id})">X</button>
    `;

    lista.appendChild(li);
  });

  totalElemento.textContent = `Total: $${total}`;
}

function eliminarProducto(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  renderCarrito();
}

document.getElementById("vaciarCarrito").addEventListener("click", () => {
  Swal.fire({
    title: "¿Vaciar carrito?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí"
  }).then(result => {
    if (result.isConfirmed) {
      carrito = [];
      guardarCarrito();
      renderCarrito();
    }
  });
});

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const data = localStorage.getItem("carrito");
  if (data) {
    carrito = JSON.parse(data);
    renderCarrito();
  }
}

cargarCarrito();



