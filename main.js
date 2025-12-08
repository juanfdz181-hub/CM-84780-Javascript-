alert("bienvenido a mi verduleria");
// declaro constantes para los precios
const precioKiwi = 1500;
const precioPera = 300;
const precioBanana = 900;

let precioFinal = 0;
let carrito = [];


// funcion auxiliar de cantidades 
function cantidad(fruta) {
  let entrada = prompt("¿Cuántos kilos de " + fruta + "?");


  if (entrada === null) {
    alert("Operación cancelada.");
    return null;
  }
  entrada = entrada.replace(",", ".");

  let kilos = parseFloat(entrada);

  if (isNaN(kilos) || kilos <= 0) {
    alert("Debe ingresar una cantidad válida mayo a 0");
    return null;
  }

  alert("usted lleva " + kilos + " kilos de " + fruta + ".");
  return kilos;

}

// agrego funcion para acumular los totales
function sumarAlTotal(producto, kilos) {
  let subtotal = 0;

  if (producto === "kiwi") subtotal = precioKiwi * kilos;
  else if (producto === "banana") subtotal = precioBanana * kilos;
  else if (producto === "pera") subtotal = precioPera * kilos;


  precioFinal += subtotal;


  carrito.push({
    producto: producto,
    kilos: kilos,
    subtotal: subtotal
  });

  alert(
    "Subtotal por " +
    kilos +
    " kg de " +
    producto +
    ": $" +
    subtotal +
    "\nTotal acumulado: $" +
    precioFinal
  );

}

//funcion principal
function productoDeseado() {
  let seguir = true;

  while (seguir) {

    let producto = prompt("que producto desea? Tengo Kiwi, banana, pera").toLowerCase();

    if (producto === "" || producto === null) {
      alert("No ingresó nada. Intente otra vez.");
      continue;
    }
    if (producto === "kiwi" || producto === "banana" || producto === "pera") {

      let kilos = cantidad(producto);

      if (kilos === null) {
        continue;
      }

      sumarAlTotal(producto, kilos);


      seguir = confirm("Desea comprar otra cosa?");

    }
    else {
      alert("Producto inválido. Intente de nuevo.");

    }

  }
  let resumen = "Gracias por su compra.\n\nDetalle:\n";
  carrito.forEach((item, index) => {
    resumen +=
      (index + 1) +
      ") " +
      item.producto +
      " — " +
      item.kilos +
      " kg — Subtotal: $" +
      item.subtotal +
      "\n";
  });
  resumen += "\nTOTAL A PAGAR: $" + precioFinal;
  alert(resumen);
}


productoDeseado();
