
const invalidOption = "Por favor, ingrese un numero de opcion valido";
const invalidInputType = "Por favor, ingrese solamente numeros";
const invalidInputMin = "Por favor, ingrese un numero mas grande";
const invalidInputMax = "Por favor, ingrese un numero mas pequeño";

function mostrarObjeto(objeto) {
    let print = [];
    for (let propiedad in objeto) {
        print.push(`${formatearString(propiedad)}: ${objeto[propiedad]}\n`);
    }
    alert(print.join(''));
}

function randomNumber(min, max) {
    let difference = max - min;
    return Math.round((min + Math.random() * difference) * 10) / 10;
}

// Pide al usuario que ingrese un numero positivo
function numericPromptCheck(promptString, min = 0, max = Infinity) {
    while (true) {
        input = parseInt(prompt(promptString));
        if (isNaN(input)) {
            alert(invalidInputType);
        }
        else if (input < min) {
            alert(invalidInputMin);
        }
        else if (input > max) {
            alert(invalidInputMax);
        }
        else {
            break;
        }
    }
    return input;
}

class hectareaCultivo {
    constructor(id, cultivo, humedad, temperatura, progreso) {
        this.id = id;
        this.cultivo = cultivo;
        this.humedad = humedad;
        this.temperatura = temperatura;
        this.progreso = progreso;
    }
}

function generarProgreso(progresoGeneral) {
    switch (progresoGeneral) {
        case 1:
            return randomNumber(0, 5);
        case 2:
            return randomNumber(15, 25);
        case 3:
            return randomNumber(40, 50);
        case 4:
            return randomNumber(60, 75);
        case 5:
            return randomNumber(85, 95);
    }
}

function meterMayuscula(string) {
    return string[0].toUpperCase().concat(string.slice([1]));
}

function formatearString(string) {
    return meterMayuscula(string.toLocaleLowerCase());
}

const strPromptHumedad = `Ingrese un estado de humedad inicial:
1. Seco (0-20%)
2. Normal (20-40%)
3. Humedo (40-60%)
4. Saturado (60-80%+)
`

function promptHumedad() {
    while (true) {
        let menuOption = parseInt(prompt(strPromptHumedad));
        switch (menuOption) {
            case 1:
                return randomNumber(0, 20);
            case 2:
                return randomNumber(20, 40);
            case 3:
                return randomNumber(40, 60);
            case 4:
                return randomNumber(60, 80);
            default:
                alert(invalidOption);
                break;
        }
    }
}

const strPromptTemperatura = `Ingrese un estado de temperatura inicial:
1. Frio (10-15°C)
2. Templado (15-20°C)
3. Caliente (20-25°C)
`

function promptTemperatura() {
    while (true) {
        let menuOption = parseInt(prompt(strPromptTemperatura));
        switch (menuOption) {
            case 1:
                return randomNumber(10, 15);
            case 2:
                return randomNumber(15, 20);
            case 3:
                return randomNumber(20, 25);

            default:
                alert(invalidOption);
                break;
        }
    }
}

const strPromptProgreso = `Ingrese un estado de crecimiento inicial:
1. Recien sembrado
2. Menos de un mes de siembra
3. A medio crecer
4. Maduro
5. Cerca de la cosecha
`

function promptProgreso() {
    while (true) {
        let menuOption = parseInt(prompt(strPromptProgreso));
        switch (menuOption) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return menuOption;
            default:
                alert(invalidOption);
                break;
        }
    }
}

function compararCelda(celda, celdaFiltro) {
    for (let propiedad in celdaFiltro) {
        let valorFiltro = celdaFiltro[`${propiedad}`];
        if (valorFiltro !== undefined) {
            let valorPropiedad = celda[`${propiedad}`];
            if (propiedad == 'cultivo') {
                if (valorPropiedad !== valorFiltro) {
                    return false;
                }
            }
            else {
                let min = valorFiltro[0];
                let max = valorFiltro[1];
                if (valorPropiedad < min || valorPropiedad >= max) {
                    return false;
                }
            }
        }
    }
    return true;
}

function filtrarCampo(campo, celdaFiltro) {
    let campoFiltrado = [];
    campo.forEach((fila) => {
        let coincidenciasFila = fila.filter((celda) => compararCelda(celda, celdaFiltro))
        campoFiltrado = campoFiltrado.concat(coincidenciasFila);
    });
    return campoFiltrado;
}

const strFiltrarHumedad = `Seleccione el grado de humedad a filtrar: 
1. Seco (0-20%)
2. Normal (20-40%)
3. Humedo (40-60%)
4. Saturado (60-80%+)
`

function menuFiltrarHumedad() {
    let submenuEnable = true;
    while (submenuEnable) {
        let menuOption = parseInt(prompt(strFiltrarHumedad));
        switch (menuOption) {
            case 1:
                return [0, 20];
            case 2:
                return [20, 40];
            case 3:
                return [40, 60];
            case 4:
                return [60, 100];
            default:
                alert(invalidOption);

        }
    }
}

const strFiltrarTemperatura = `Seleccione el nivel de temperatura de suelo a filtrar:
1. Frio (15°C-)
2. Templado (15-20°C)
3. Caliente (20°C+)
`

function menuFiltrarTemperatura() {
    let submenuEnable = true;
    while (submenuEnable) {
        let menuOption = parseInt(prompt(strFiltrarTemperatura));
        switch (menuOption) {
            case 1:
                return [0, 15];
            case 2:
                return [15, 20];
            case 3:
                return [20, 100];
            default:
                alert(invalidOption);
                break;
        }
    }
}
const strFiltrarProgreso = `Seleccione el nivel de progreso a filtrar:
1. Siembra reciente (0-20%)
2. Cultivos jovenes (20-40%)
3. A medio crecer (40-60%)
4. Cultivos maduros (60-80%)
5. A punto de cosechar (8-99%)
6. Listos para cosechar (100%)
`
function menuFiltrarProgreso() {
    let submenuEnable = true;
    while (submenuEnable) {
        let menuOption = parseInt(prompt(strFiltrarProgreso));
        switch (menuOption) {
            case 1:
                return [0, 20];
            case 2:
                return [20, 40];
            case 3:
                return [40, 60];
            case 4:
                return [60, 80];
            case 5:
                return [80, 100];
            case 6:
                return [100, 101];
            default:
                alert(invalidOption);
                break;
        }
    }
}

const strMenuPrimerFiltro = `Ingrese un numero de opcion:
1. Filtrar por cultivo
2. Filtrar por humedad de suelo
3. Filtrar por temperatura
4. Filtrar por grado de crecimiento
`

const strMenuFiltrosAdicionales = `Ingrese un numero de opcion:
1. Filtrar por cultivo
2. Filtrar por humedad de suelo
3. Filtrar por temperatura
4. Filtrar por grado de crecimiento
5. Generar lista filtrada
`

function menuFiltrar(campo) {
    let filtro = {
        cultivo: undefined,
        humedad: undefined,
        temperatura: undefined,
        progreso: undefined
    }
    let submenuEnable = true;
    let primerFiltro = true;
    while (submenuEnable) {
        let menuOption;
        if (primerFiltro) {
            menuOption = parseInt(prompt(strMenuPrimerFiltro));
        }
        else {
            menuOption = parseInt(prompt(strMenuFiltrosAdicionales));
        }
        switch (menuOption) {
            case 1:
                filtro.cultivo = formatearString(prompt("Ingrese el nombre del cultivo: "));
                primerFiltro = false;
                break;
            case 2:
                filtro.humedad = menuFiltrarHumedad();
                primerFiltro = false;
                break;
            case 3:
                filtro.temperatura = menuFiltrarTemperatura();
                primerFiltro = false;
                break;
            case 4:
                filtro.progreso = menuFiltrarProgreso();
                primerFiltro = false;
                break;
            case 5:
                if (!primerFiltro) {
                    submenuEnable = false;
                    break;
                }
            default:
                alert(invalidOption);
                break;
        }
    }
    return filtrarCampo(campo, filtro);
}

function mapearCampo(campo, campoFiltrado) {
    let anchoCampo = campo[0].length;
    let stringAlert = [];
    campo.forEach((fila) => {
        let found;
        for (let celda of fila) {
            if (campoFiltrado.includes(celda)) {
                found = 'X'
            }
            else {
                found = '0'
            }
            stringAlert = stringAlert.concat(found)
        }
        stringAlert = stringAlert.concat("\n");
    })
    stringAlert = stringAlert.concat("\nSe ha generado una vista detallada de las celdas coincidentes en la consola.")
    console.log(campoFiltrado);
    alert(stringAlert.join(""));
}

const strMenuSimulador = `Ingrese un numero de opcion: 
1. Consultar el estado de una hectarea 
2. Simular el paso de un día 
3. Filtrar hectareas 
4. Consultar promedio 
5. Finalizar simulacion
`

function simuladorCampo() {
    let campo = [];
    let anchoCampo = numericPromptCheck("Ingrese el ancho de su campo en hectáreas: ");
    let humedadCampo = promptHumedad();
    let temperaturaCampo = promptTemperatura();
    let cantidadCultivos = numericPromptCheck("Ingrese la cantidad de cultivos de su campo: ");

    for (let i = 0; i < cantidadCultivos; i++) {
        let cultivoParcela = formatearString(prompt("Ingrese el cultivo de la parcela: "));
        let largoParcela = numericPromptCheck("Ingrese el largo en hectareas de la parcela: ")
        let progresoParcela = promptProgreso();
        for (let nFila = 0; nFila < largoParcela; nFila++) {

            let fila = [];

            for (let nColumna = 0; nColumna < anchoCampo; nColumna++) {
                let id = `${nFila};${nColumna}`;
                let celda = new hectareaCultivo(id, cultivoParcela, humedadCampo, temperaturaCampo, generarProgreso(progresoParcela));
                fila.push(celda);
            }

            campo.push(fila);

        }
    }

    console.log(campo);

    let subMenuEnable = true;

    //TODO: q el paso del dia tenga un evento random

    while (subMenuEnable) {
        let menuOption = parseInt(prompt(strMenuSimulador))
        switch (menuOption) {
            case 1:
                consultarCelda(campo);
                break;
            case 3:
                mapearCampo(campo, menuFiltrar(campo));
                break;
            case 4:
                menuPromedio(campo);
                break;
            case 5:
                subMenuEnable = false;
                break;
            default:
                alert(invalidOption);
                break;
        }
    }
}
const strMenuPromedio = `Ingrese el parámetro a promediar:
1. Temperatura
2. Humedad
3. Nivel de crecimiento
`
const strMenuPromedioFiltro = `¿Desea filtrar las celdas a promediar?
1. Si
2. No
`
function menuPromedio(campo) {
    let submenuEnable = true;
    let propiedad;
    while (submenuEnable) {
        let menuOption = parseInt(prompt(strMenuPromedio));
        switch(menuOption) {
            case 1:
                propiedad = 'temperatura';
                submenuEnable = false;
                break;
            case 2:
                propiedad = 'humedad';
                submenuEnable = false;
                break;
            case 3:
                propiedad = 'progreso';
                submenuEnable = false;
                break;
            default:
                alert(invalidOption);
                break;
        }
    }
    submenuEnable = true;
    let filtrarCampo = false;
    while (submenuEnable) {
        let menuOption = parseInt(prompt(strMenuPromedioFiltro));
        switch(menuOption) {
            case 1:
                filtrarCampo = true;
                campo = menuFiltrar(campo);
                submenuEnable = false;
                break;
            case 2:
                let filasFusionadas = [];
                for (let fila of campo) {
                    filasFusionadas = filasFusionadas.concat(fila);
                }
                campo = filasFusionadas;
                submenuEnable = false;
                break;
            default:
                alert(invalidOption);
                break;
        }
    }
    if ((filtrarCampo == true) && campo.length == 0) {
        alert("No hay celdas coincidentes con el filtro");
    }
    else {
        let sumaTotal = campo.reduce(
            (acumulador, celda) => acumulador + celda[`${propiedad}`],
            0
        );
        let promedio = sumaTotal / campo.length;
        alert(`El promedio de ${propiedad} es ${promedio}`);
    }
}

function consultarCelda(campo) {
    let found;
    let idPrompt = prompt("Ingrese el ID de la celda (fila;columna): ");
    let largoCampo = campo.length;
    for (let fila = 0; fila < largoCampo; fila++) {
        index = campo[fila].findIndex((celda) => celda.id == idPrompt)
        if (index != -1) {
            found = campo[fila][index];
            break;
        }
    }
    if (index == -1) {
        alert("No existe celda con el ID ingresado");
    }
    else {
        mostrarObjeto(found);
        console.log(found);
    }
}


// Programa principal

alert("¡Bienvenido al simulador de campo de RemoteAgro! \n\nCon esta herramienta, podra simular los efectos del clima en el estado de sus cultivos.");

let menuEnable = true;

const strMenuPrincipal = `Por favor, seleccione un numero de opcion: 
1. Generar un campo y comenzar simulacion 
2. Salir
`

while (menuEnable) {

    let menuOption = parseInt(prompt(strMenuPrincipal))
    switch (menuOption) {
        case 1:
            simuladorCampo();
            break;
        case 2:
            alert("¡Hasta luego!");
            menuEnable = false;
            break;
        default:
            alert(invalidOption);
            break;
    }
}