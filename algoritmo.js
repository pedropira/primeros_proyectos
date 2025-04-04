const numCasa = document.querySelector(".num__casa");
const cantPapel = document.querySelector(".papel");
const cantVidiro = document.querySelector(".vidrio");
const cantPlastico = document.querySelector(".plastico");
const estadoMaterial = document.querySelectorAll(".estado");
const btnRegistrar = document.querySelector(".registrar");
const btninforme = document.querySelector(".informe");

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


btnRegistrar.addEventListener("click", () => {

    let registro = registrarCasa();

    if(registro && casaActualIndex < totalCasas){
        
        casaActualIndex++;

        numCasa.textContent = `Formulario Casa ${casaActualIndex + 1}`;

        cantPapel.value = "";
        cantVidiro.value = "";
        cantPlastico.value = "";

    }else if (!registro){
        alert("Por favor, corrige los datos antes de continuar.");
    }

    else{

        alert("No hay más casas por registrar");
    }

})



const registrarCasa = () => {

    let validacion = validarDatos();

    if (validacion) {

        papel = parseFloat(cantPapel.value);
        plastico = parseFloat(cantPlastico.value);
        vidrio = parseFloat(cantVidiro.value);  

    reciclajeTotal = papel + plastico + vidrio;
    reciclajeComunidad += reciclajeTotal;   

    let casa = {
        papel: papel,
        plastico: plastico,
        vidrio: vidrio,
        reciclajeTotal: reciclajeTotal
    }

    casas.push(casa);

    alert("Casa registrada correctamente.");

    return true
    } 

    return false;
}

const validarDatos = () => {
    if (cantPapel.value === "" || cantVidiro.value === "" || cantPlastico.value === "") {
        alert("Por favor, completa todos los campos.");
        return false;
    }

    if (isNaN(cantPapel.value) || isNaN(cantVidiro.value) || isNaN(cantPlastico.value)) {
        alert("Por favor, ingresa valores numéricos válidos.");
        return false;
    }

    if (parseFloat(cantPapel.value) < 0 || parseFloat(cantVidiro.value) < 0 || parseFloat(cantPlastico.value) < 0) {
        alert("Los valores no pueden ser negativos.");
        return false;
    }
    return true;
}


console.log(casas);