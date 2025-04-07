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

//FUNCION PARA REGISTRAR LOS DATOS DE CADA CASA
const registrarCasa = () => {
    //VALIDAMOS QUE LOS CAMPOS NO ESTEN VACIOS Y QUE SEAN NUMERICOS
    let validacion = validarDatos();
    if (validacion) {

        //OBTENEMOS LOS VALORES DE CADA MATERIAL
        papel = parseFloat(cantPapel.value);
        plastico = parseFloat(cantPlastico.value);
        vidrio = parseFloat(cantVidiro.value);  
        
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

    //VALIDAMOS QUE LOS CAMPOS NO ESTEN VACIOS
    if (cantPapel.value === "" || cantVidiro.value === "" || cantPlastico.value === "") {
        alert("Por favor, completa todos los campos.");
        return false;
    };
    
    //VALIDAMOS QUE LOS CAMPOS SEAN NUMERICOS
    if (isNaN(cantPapel.value) || isNaN(cantVidiro.value) || isNaN(cantPlastico.value)) {
        alert("Por favor, ingresa valores numéricos válidos.");
        return false;
    };
    
    //VALIDAMOS QUE LOS CAMPOS NO SEAN NEGATIVOS
    if (parseFloat(cantPapel.value) < 0 || parseFloat(cantVidiro.value) < 0 || parseFloat(cantPlastico.value) < 0) {
        alert("Los valores no pueden ser negativos.");
        return false;
    };

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
    if (totalPapel >= 1000) {
        alert("El papel ya está en su máximo.");
        // REEMPLAZAMOS EL INPUT POR UN DIV CON UN MENSAJE
        reemplazarInputPorDiv(cantPapel, "Papel máximo alcanzado");
    };
    
    //REPETIMOS PROCESO PARA VIDRIO
    if (totalVidrio >= 1000) {
        alert("El vidrio ya está en su máximo.");
        reemplazarInputPorDiv(cantVidiro, "Vidrio máximo alcanzado");
    };
    
    //REPETIMOS PROCESO PARA PLASTICO
    if (totalPlastico >= 1000) {
        alert("El plástico ya está en su máximo.");
        reemplazarInputPorDiv(cantPlastico, "Plástico máximo alcanzado");
    };
};

//FUNCION PARA REEMPLAZAR EL INPUT POR UN DIV CON UN MENSAJE
const reemplazarInputPorDiv = (inputElement, mensaje) => { // SELECCIONAMOS EL INPUT A REEMPLAZAR

    //CREAMOS UN DIV Y LO REEMPLAZAMOS POR EL INPUT
    const div = document.createElement("div");
    div.textContent = mensaje;
    div.className = "material-maximo"; 
    div.classList.add("bloqueado");
    inputElement.parentNode.replaceChild(div, inputElement);
    
    // OCULTAMOS EL SELECT DEL MATERIAL
    const selectElement = div.parentNode.querySelector(".estado"); 
    if (selectElement) {
        selectElement.style.display = "none"; 
    };

};

//INICIO DE REGISTRO A DAR CLICK EN EL BOTON REGISTRAR
btnRegistrar.addEventListener("click", () => {

    //VALIDAMOS FUNCION DE REGISTRO DE CASA
    let registro = registrarCasa();
    validacionCantidad();

    //VERIFICAMOS SI EL REGISTRO FUE EXITOSO Y SI HAY MAS CASAS POR REGISTRAR
    if(registro && casaActualIndex + 1 < totalCasas){
        
        //VERIFICAMOS SI HAY MAS CASAS POR REGISTRAR
        casaActualIndex++;

        //CAMBIAMOS EL NUMERO DE CASA EN EL HTML Y VALORES DE LOS INPUTS
        numCasa.textContent = `Formulario Casa ${casaActualIndex + 1}`;

        cantPapel.value = "";
        cantVidiro.value = "";
        cantPlastico.value = "";

        
    //MENSAJE DE ERROR EN CASO
    }else if (!registro){
        alert("Por favor, corrige los datos antes de continuar.");
    }
    
    //MENSAJE EN CASO DE ACABAR CASAS A REGISTRAR
    else{
        alert("No hay más casas por registrar");
        cantPapel.value = "";
        cantVidiro.value = "";
        cantPlastico.value = "";
        btninforme.click();
    };
});

btninforme.addEventListener("click", () => {
    //ENCONTRAMOS LAS CASAS CON MAYOR Y MENOR RECICLAJE
    let casaMayorReciclaje = casas.reduce((max, casa)=> casa.reciclajeTotal > max.reciclajeTotal? casa : max, casas[0]);
    let casaMenorReciclaje = casas.reduce((min, casa)=> casa.reciclajeTotal < min.reciclajeTotal? casa : min, casas[0]);

    //ENCONTRAMOS LOS INDICES DE LAS CASAS CON MAYOR Y MENOR RECICLAJE
    let indiceCasaMayorReciclaje = casas.indexOf(casaMayorReciclaje);
    let indiceCasaMenorReciclaje = casas.indexOf(casaMenorReciclaje);


    //VALIDAMOS QUE HAYA CASAS REGISTRADAS
    if (casas.length === 0) {
        alert("No hay casas registradas.");
        return;
    };

    //MOSTRAMOS UN INFORME CON LOS DATOS DE CADA CASA
    let informe = "<h3>Informe de reciclaje por casa:</h3>";
    casas.forEach((casa, index) => {
        informe += `
            <div>
                <h4>Casa ${index + 1}:</h4>
                <p>Papel: ${casa.papel}kg</p>
                <p>Plástico: ${casa.plastico}kg</p>
                <p>Vidrio: ${casa.vidrio}kg</p>
                <p>Reciclaje Total: ${casa.reciclajeTotal}kg</p>
                <p>Promociones: ${casa.promociones}</p>
                <hr>
            </div>
        `;
    });

    informe += `<h3>Resumen de la comunidad:</h3>
        <p>Total de reciclaje en la comunidad: ${reciclajeComunidad}kg</p>
        <p>Total de no reciclaje en la comunidad: ${totalNoReciclaje}kg</p>
        <p>Hogares recompensados: ${hogaresRecompensados}</p>
        <p>Casa con mayor reciclaje: Casa ${indiceCasaMayorReciclaje + 1} con ${casaMayorReciclaje.reciclajeTotal}kg</p>
        <p>Casa con menor reciclaje: Casa ${indiceCasaMenorReciclaje + 1} con ${casaMenorReciclaje.reciclajeTotal}kg</p>
    `;

    const informeDiv = document.querySelector(".mensaje");
    informeDiv.innerHTML= informe;
    modal.style.display = "block"; 
    modal.style.animation = "aparecer 0.7s forwards";// Mostrar el informe
});

cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
    modal.style.animation = "cerrar 0.7s forwards";
})













