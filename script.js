//! Strings guardados como variables (para que quede mas legible) y variables numericas
//? (con arrays seria mil veces mas legible y comodo xd)

const invalidOption = "Por favor, ingrese un número de opción válido"
const invalidInput = "Por favor, ingrese un número válido"

const precioProducto1Unidad = 150;
const stringProducto1Unidad = `1 - Sensor de humedad y temperatura de suelo SoilScan L3 (aprox. 9u por hectárea) --> ${precioProducto1Unidad}USD`;

const precioProducto2Unidad = 120;
const stringProducto2Unidad = `2 - Pulverizador selectivo con IA SmartWeeds (1u cada 5m de pulverizadora) --> ${precioProducto2Unidad}USD`;

const precioProducto3Unidad = 250;
const stringProducto3Unidad = `3 - Equipos de seguimiento de cultivo AgrObserve (aprox. 4u por hectárea) --> ${precioProducto3Unidad}USD`;

const stringListaProductosUnidad = stringProducto1Unidad + "\n" + stringProducto2Unidad + "\n" + stringProducto3Unidad;

const precioProducto1Mayorista = 120;
const stringProducto1Mayorista = `1 - Sensores de humedad y temperatura de suelo SoilScan L3 x 18u+   --> ${precioProducto1Mayorista}USD`;

const precioProducto2Mayorista = 95;
const stringProducto2Mayorista = `2 - Pulverizador selectivo con IA SmartWeeds x 12u+ --> ${precioProducto2Mayorista}USD`;

const precioProducto3Mayorista = 210;
const stringProducto3Mayorista = `3 - Equipos de seguimiento de cultivo AgrObserve x 8u+ --> ${precioProducto3Mayorista}USD`;

const stringComprasMayorista = "Equipando su campo con la gama completa de productos de RemoteAgro por mayor, recibe un 15% de descuento"

const stringListaProductosMayorista = stringProducto1Mayorista + "\n" + stringProducto2Mayorista + "\n" + stringProducto3Mayorista + "\n" + stringComprasMayorista;



const stringPromptHectareas = "Ingrese la cantidad de hectáreas de su campo: ";
const stringPromptCantPulv = "Ingrese la cantidad de pulverizadoras que utiliza: ";
const stringPromptAnchoPulv = "Ingrese el ancho en metros de sus pulverizadoras: ";

// Porcentaje de descuento aplicado al presupuesto total por comprar todas las lineas de productos
const descuentoCompraCompleta = 10;

//! Funciones que muestran los menus a los que se puede acceder desde el principal

// Menu de precio de productos por unidad
function menuPreciosUnidad() {
    let submenuEnable = true;
    while (submenuEnable) {
        let menuOption = parseInt(prompt(stringListaProductosUnidad + "\n\n1. Ver precios al por mayor \n2. Salir"));
        if (menuOption == 1) {
            submenuEnable = menuPreciosMayorista();
        }
        else if (menuOption == 2) {
            submenuEnable = false;
        }
        else {
            alert(invalidOption);
        }
    }
}

// Menu de precio de productos por mayor
function menuPreciosMayorista() {
    // Menu sin submenus --> no tiene loop y devuelve un valor al menu que lo invocó
    let menuOption = parseInt(prompt(stringListaProductosMayorista + "\n\n1. Volver a lista por unidad \n2. Salir"));
    if (menuOption == 1) {
        return true;
    }
    else if (menuOption == 2) {
        return false;
    }
    else {
        alert(invalidOption);
    }
}

// Pide al usuario que ingrese un numero positivo
function numericPromptCheck(promptString) {
    let input = parseInt(prompt(promptString));
    while (isNaN(input) || input < 0) {
        alert(invalidInput);
        input = parseInt(prompt(promptString));
    }
    return input;
}

// Calculadora de presupuestos
function calculadoraPresupuesto() {
    let cantidadHectareas = numericPromptCheck(stringPromptHectareas);
    let cantidadPulverizadoras = numericPromptCheck(stringPromptCantPulv);
    let anchoPulverizadoras = numericPromptCheck(stringPromptAnchoPulv);

    // Cuenta los productos que se requieren al por mayor
    let cantidadPorMayor = 0;

    let presupuestoProducto1;
    let cantidadProducto1 = cantidadHectareas * 9;
    if (cantidadProducto1 >= 18) {
        presupuestoProducto1 = cantidadProducto1 * precioProducto1Mayorista;
        cantidadPorMayor++;
    }
    else {
        presupuestoProducto1 = cantidadProducto1 * precioProducto1Unidad;
    }

    let presupuestoProducto2;
    let cantidadProducto2 = parseInt(cantidadPulverizadoras * anchoPulverizadoras / 5);
    if (cantidadProducto2 >= 12) {
        presupuestoProducto2 = cantidadProducto2 * precioProducto2Mayorista;
        cantidadPorMayor++;
    }
    else {
        presupuestoProducto2 = cantidadProducto2 * precioProducto2Unidad;
    }

    let presupuestoProducto3;
    let cantidadProducto3 = cantidadHectareas * 4;
    if (cantidadProducto3 >= 8) {
        presupuestoProducto3 = cantidadProducto3 * precioProducto3Mayorista;
        cantidadPorMayor++;
    }
    else {
        presupuestoProducto3 = cantidadProducto3 * precioProducto3Unidad;
    }

    // Presupuesto total (con un 15% de descuento si se compran productos de todas las lineas al por mayor)
    let presupuestoTotal = (presupuestoProducto1 + presupuestoProducto2 + presupuestoProducto3);
    let stringDescuentoAplicado = ""
    if (cantidadPorMayor == 3) {
        presupuestoTotal = parseInt(presupuestoTotal* (100 - descuentoCompraCompleta) / 100);
        stringDescuentoAplicado = `(Descuento del ${descuentoCompraCompleta}% aplicado)`
    }

    alert(`Usted precisa para su campo de: \n- ${cantidadProducto1} Sensores SoilScan L3 --> ${presupuestoProducto1}USD \n- ${cantidadProducto2} Pulverizadores SmartWeeds --> ${presupuestoProducto2}USD \n- ${cantidadProducto3} Equipos AgrObserve --> ${presupuestoProducto3}USD \n------------------------ \n\nPresupuesto total --> ${presupuestoTotal}USD ` + stringDescuentoAplicado);
}

// Aca empieza el programa

// Variable booleana que habilita el menu 
let menuEnable = true;

alert("¡Bienvenido a RemoteAgro! La solución para controlar su campo desde donde desee");

// Loop del menu principal
while (menuEnable) {
    // Pide al usuario ingresar un numero de opcion del menu
    let menuOption = parseInt(prompt("Seleccione un número de opción: \n1. Ver productos y precios \n2. Calcule un presupuesto para su campo \n3. Salir"));
    switch (menuOption) {
        case 1:
            menuPreciosUnidad();
            break;
        case 2:
            calculadoraPresupuesto();
            break;
        case 3:
            alert("¡Hasta luego!");
            menuEnable = false;
            break;
        default:
            alert(invalidOption);
            break;
    }
}