//SELECCIONAMOS ELEMENTOS HTML A UTILIZAR
const numCasa = document.querySelector(".num__casa");
const cantPapel = document.querySelector(".papel");
const cantVidiro = document.querySelector(".vidrio");
const cantPlastico = document.querySelector(".plastico");
const estadoMaterial = document.querySelectorAll(".estado");
const btnRegistrar = document.querySelector(".btn__registrar");
const btninforme = document.querySelector(".btn__informe");
const modal = document.querySelector(".informe__modal");
const cerrarModal = document.querySelector(".btn__cerrar");

//DECLARAMOS VARIABLES GLOBALES
let casas = [];
let semanas = [];
let semanaActualIndex = 0;
let papel;
let plastico;
let vidrio;
let reciclajeTotal;
let promociones;
let totalNoReciclaje = 0;
let reciclajeComunidad = 0;
let hogaresRecompensados = 0;
let casaActualIndex = 0;
let totalCasas = parseInt(prompt("¿cuantas casas hay en la comunidad?"));
let cantSemanas = parseInt(prompt("¿cuantas semanas se registraran?"));

//FUNCION PARA REGISTRAR LOS DATOS DE CADA CASA
const registrarCasa = () => {
    //VALIDAMOS QUE LOS CAMPOS NO ESTEN VACIOS Y QUE SEAN NUMERICOS
    let validacion = validarDatos();
    if (validacion) {

        //OBTENEMOS LOS VALORES DE CADA MATERIAL
        papel = cantPapel.disabled ? 0 : parseFloat(cantPapel.value);
        plastico = cantPlastico.disabled ? 0 : parseFloat(cantPlastico.value);
        vidrio = cantVidiro.disabled ? 0 : parseFloat(cantVidiro.value);
        
        //CLASIFICAMOS CADA MATERIAL SEGUN SU ESTADO
        papel = clasificarMaterial(cantPapel, papel);
        plastico = clasificarMaterial(cantPlastico, plastico);
        vidrio = clasificarMaterial(cantVidiro, vidrio);

    //SUMAMOS EL TOTAL DE RECICLAJE POR CASA
    reciclajeTotal = papel + plastico + vidrio;

    //SUMAMOS EL TOTAL DE RECICLAJE POR COMUNIDAD
    reciclajeComunidad += reciclajeTotal;   

    //VERIFICAMOS SI EL TOTAL DE RECICLAJE ES MAYOR O IGUAL A 50 PARA ASIGNAR UNA PROMOCION
    if (reciclajeTotal >= 50) {
        //SUMAMOS UN HOGAR RECOMPENSADO
        hogaresRecompensados++;
        alert("¡Felicidades! Has acumulado puntos para una promoción.");
        //ASIGNAMOS UNA PROMOCION
        promociones = 1;
    } else{
        alert("No has acumulado puntos para una promoción.");
        promociones = 0;
    }

    //CREAMOS UN OBJETO CON LOS DATOS DE CADA CASA
    let casa = {
        papel: papel,
        plastico: plastico,
        vidrio: vidrio,
        reciclajeTotal: reciclajeTotal,
        promociones: promociones
    };
    
    //AGREGAMOS EL OBJETO A UN ARRAY DE CASAS
    casas.push(casa);
    
    //MOSTRAMOS UN MENSAJE DE CONFIRMACION
    alert("Casa registrada correctamente.");

    //ACTUALIZAMOS EL NUMERO DE CASA EN EL HTML
    return true;
    } 

    return false;
};


//FUNCIONES PARA VALIDAR LOS DATOS INGRESADOS EN LOS INPUTS
const validarDatos = () => {
    if(!cantPapel || cantPapel.disabled || !cantVidiro || cantVidiro.disabled || !cantPlastico || cantPlastico.disabled) {
        // si no existe o está disabled, lo ignoramos (ya no hay que validarlo)
        return true;
    } else {
        if (cantPapel.value === "" || cantVidiro.value === "" || cantPlastico.value === "") {
            alert("Por favor, completa todos los campos.");
            return false;
        };
        if(!cantPapel || cantPapel.disabled) {
            // si no existe o está disabled, lo ignoramos (ya no hay que validarlo)
            return true;
        } else if (isNaN(cantPapel.value) || isNaN(cantVidiro.value) || isNaN(cantPlastico.value)) {
            alert("Por favor, ingresa valores numéricos válidos.");
            return false;
        };
        
        //VALIDAMOS QUE LOS CAMPOS NO SEAN NEGATIVOS
        if (parseFloat(cantPapel.value) < 0 || parseFloat(cantVidiro.value) < 0 || parseFloat(cantPlastico.value) < 0) {
            alert("Los valores no pueden ser negativos.");
            return false;
        };
    } 
    
    return true;
};


//FUNCION PARA CLASIFICAR LOS MATERIALES SEGUN SU ESTADO
const clasificarMaterial = (inputElement , material) => { //SELECCIONAMOS EL INPUT A CLASIFICAR
    
    //OBTENEMOS EL VALOR DEL SELECT DE CADA MATERIAL(INPUT)
    const selectElement = inputElement.parentNode.querySelector(".estado"); 
    if (selectElement) {

        //VERIFICAMOS EL VALOR DEL SELECT Y CLASIFICAMOS EL MATERIAL
        if (selectElement.value >= "Reciclable" || selectElement.value <= "Con Condiciones") {
            //SUMAMOS EL MATERIAL RECICLABLE A LA VARIABLE DE RECICLAJE TOTAL
            material = material;
            reciclajeComunidad += material;

        } else{
            //SUMAMOS EL MATERIAL NO RECICLABLE A LA VARIABLE DE NO RECICLAJE TOTAL
            totalNoReciclaje += material;
            material = 0; // No se suma al reciclaje total
        };

    };
        return material;
};

//FUNCION PARA VALIDAR LA CANTIDAD DE MATERIALES INGRESADOS
const validacionCantidad = () => {

    // IGUALAMOS EN TOTAL DE CADA MATERIAL DE CADA CASA A 0
    let totalPapel = 0;
    let totalVidrio = 0; 
    let totalPlastico = 0;

    // RECORREMOS EL ARRAY DE CASAS Y SUMAMOS LOS MATERIALES
    casas.forEach(casa => {
        totalPapel += casa.papel;
        totalVidrio += casa.vidrio;
        totalPlastico += casa.plastico;
    })

    // VERIFICAMOS SI EL TOTAL DE CADA MATERIAL SUPERA EL LIMITE
    if (totalPapel >= 1000 ) {
        alert("El papel ya está en su máximo.");
        // REEMPLAZAMOS EL INPUT POR UN DIV CON UN MENSAJE
        reemplazarInputPorDiv(cantPapel, "Papel máximo alcanzado");
        return false;

    };
    
    //REPETIMOS PROCESO PARA VIDRIO
    if (totalVidrio >= 1000) {
        alert("El vidrio ya está en su máximo.");
        reemplazarInputPorDiv(cantVidiro, "Vidrio máximo alcanzado");
        return false;
    };
    
    //REPETIMOS PROCESO PARA PLASTICO
    if (totalPlastico >= 1000) {
        alert("El plástico ya está en su máximo.");
        reemplazarInputPorDiv(cantPlastico, "Plástico máximo alcanzado");
        return false;
    };

    if(totalPapel >= 1000 && totalVidrio >= 1000 && totalPlastico >= 1000) {

        semanaActualIndex++;
        casaActualIndex = 0; // Reiniciamos el índice de casas para la nueva semana
            alert(`Iniciando registro de la semana ${semanaActualIndex + 1}`);
            numCasa.textContent = `Formulario Casa ${casaActualIndex + 1} semana ${semanaActualIndex + 1}`;
            cantPapel.value = "";
            cantVidiro.value = "";
            cantPlastico.value = "";

            cantPapel.disabled    = false;
            cantVidiro.disabled    = false;
            cantPlastico.disabled  = false;
            cantPapel.classList.remove("bloqueado, material__maximo");
            cantVidiro.classList.remove("bloqueado, material__maximo"); 
            cantPlastico.classList.remove("bloqueado, material__maximo");

            const selectPapel = cantPapel.parentNode.querySelector("select.estado");
            if (selectPapel) select.style.display = "block";
            const selectVidrio = cantVidiro.parentNode.querySelector("select.estado");
            if (selectVidrio) select.style.display = "block";
            const selectPlastico = cantPlastico.parentNode.querySelector("select.estado");
            if (selectPlastico) select.style.display = "block"; // Mostrar el select nuevamente
        return false; 
    }

    return true;
};

//FUNCION PARA REEMPLAZAR EL INPUT POR UN DIV CON UN MENSAJE
const reemplazarInputPorDiv = (inputElement, mensaje) => { // SELECCIONAMOS EL INPUT A REEMPLAZAR

    //CREAMOS UN DIV Y LO REEMPLAZAMOS POR EL INPUT
    inputElement.value       = "0";
    inputElement.placeholder = mensaje;
    inputElement.disabled    = true;
    inputElement.classList.add("material__maximo","bloqueado");
    
    // OCULTAMOS EL SELECT DEL MATERIAL
    const select = inputElement.parentNode.querySelector("select.estado");
    if (select) select.style.display = "none";
    return true;
};

const guardarSemana = () => {
    // Creamos un objeto para la semana actual
    let semana = {
        numero: semanaActualIndex + 1,
        casas: [...casas], // Copiamos los datos de las casas registradas
        reciclajeTotal: reciclajeComunidad,
        noReciclajeTotal: totalNoReciclaje,
        hogaresRecompensados: hogaresRecompensados
    };

    // Agregamos la semana al array de semanas
    semanas.push(semana);

    // Reiniciamos los datos globales para la siguiente semana
    casas = [];
    reciclajeComunidad = 0;
    totalNoReciclaje = 0;
    hogaresRecompensados = 0;

    alert(`Datos de la semana ${semana.numero} guardados correctamente.`);
};

//INICIO DE REGISTRO A DAR CLICK EN EL BOTON REGISTRAR
btnRegistrar.addEventListener("click", () => {
    // Validamos la función de registro de casa
    let registro = registrarCasa();
    validacionCantidad();

    // Verificamos si el registro fue exitoso y si hay más casas por registrar en la semana actual
    if (registro && casaActualIndex + 1 < totalCasas) {
        casaActualIndex++;

        // Cambiamos el número de casa en el HTML y valores de los inputs
        numCasa.textContent = `Formulario Casa ${casaActualIndex + 1} semana ${semanaActualIndex + 1}`;
        cantPapel.value = "";
        cantVidiro.value = "";
        cantPlastico.value = "";

    } else if (!registro) {
        alert("Por favor, corrige los datos antes de continuar.");
    } else {
        // Guardamos los datos de la semana actual
        guardarSemana();

        // Verificamos si hay más semanas por registrar
        if (semanaActualIndex + 1 < cantSemanas) {
            semanaActualIndex++;
            casaActualIndex = 0; // Reiniciamos el índice de casas para la nueva semana
            alert(`Iniciando registro de la semana ${semanaActualIndex + 1}`);
            numCasa.textContent = `Formulario Casa ${casaActualIndex + 1} semana ${semanaActualIndex + 1}`;
            cantPapel.value = "";
            cantVidiro.value = "";
            cantPlastico.value = "";

            cantPapel.disabled    = false;
            cantVidiro.disabled    = false;
            cantPlastico.disabled  = false;
            cantPapel.classList.remove("bloqueado", "material__maximo");
            cantVidiro.classList.remove("bloqueado", "material__maximo"); 
            cantPlastico.classList.remove("bloqueado", "material__maximo");

            const selectPapel = cantPapel.parentNode.querySelector("select.estado");
            if (selectPapel) selectPapel.style.display = "block";
            const selectVidrio = cantVidiro.parentNode.querySelector("select.estado");
            if (selectVidrio) selectVidrio.style.display = "block";
            const selectPlastico = cantPlastico.parentNode.querySelector("select.estado");
            if (selectPlastico) selectPlastico.style.display = "block"; // Mostrar el select nuevamente
        } else {
            alert("No hay más semanas por registrar.");
            btninforme.click(); // Generar el informe al finalizar
        }
    }

    console.log(casas)
});

btninforme.addEventListener("click", () => {
    if (semanas.length === 0) {
        alert("No hay semanas registradas.");
        return;
    }

    // Generamos el informe
    let informe = "<h3>Informe de reciclaje por semanas:</h3>";
    semanas.forEach((semana) => {

        // Encontrar el índice de la casa con mayor y menor reciclaje
        let maxReciclaje = Math.max(...semana.casas.map(casa => casa.reciclajeTotal));
        let minReciclaje = Math.min(...semana.casas.map(casa => casa.reciclajeTotal));
        let casaMaxIndex = semana.casas.findIndex(casa => casa.reciclajeTotal === maxReciclaje) + 1;
        let casaMinIndex = semana.casas.findIndex(casa => casa.reciclajeTotal === minReciclaje) + 1;
        informe += `<h4>Semana ${semana.numero}:</h4>
        <h5>Casas registradas:</h5>`
        semana.casas.forEach((casa, index) => {
            informe +=`<div>
            <h6>Casa ${index + 1}:</h6>
            <p>Papel: ${casa.papel}kg</p>
            <p>Plástico: ${casa.plastico}kg</p>
            <p>Vidrio: ${casa.vidrio}kg</p>
            <p>Reciclaje Total: ${casa.reciclajeTotal}kg</p>
            <p>Promociones: ${casa.promociones}</p>
        </div>`;
    ;
});

        informe += `
                <p>Total de reciclaje: ${semana.reciclajeTotal}kg</p>
                <p>Total de no reciclaje: ${semana.noReciclajeTotal}kg</p>
                <p>Hogares recompensados: ${semana.hogaresRecompensados}</p>
                
        `;

        informe += `
        <p>Casa con mayor reciclaje: Casa ${casaMaxIndex} (${maxReciclaje}kg)</p>
        <p>Casa con menor reciclaje: Casa ${casaMinIndex} (${minReciclaje}kg)</p>
    `;



        informe += "<hr></div>";
    });

    const informeDiv = document.querySelector(".mensaje");
    informeDiv.innerHTML = informe;
    modal.style.display = "block";
    modal.style.animation = "aparecer 0.7s forwards"; // Mostrar el informe
});

cerrarModal.addEventListener("click", () => {
    modal.style.display = "none"; // Ocultar el modal
    modal.style.animation = "cerrar 0.7s forwards"; // Reiniciar la animación
})











