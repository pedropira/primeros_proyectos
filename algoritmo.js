
//DECLARACION DE VARIABLES
let casas = [];
let papel;
let vidrio;
let plastico;
let reciclajeTotal;
let recompensa;
let noReciclable = 0
let hogaresRecompensados = 0


//FUNCION REGISTRO DE CASAS 
const registrarCasas = (cantidadCasas)=>{

    //SE INICIA UN BUCLE CON EL PARAMETRO SOLICITADO
    for (let i = 0; i < cantidadCasas; i++){

    //SE INICIA OTRO BUCLE PARA MANEJO DE ERRORES
    do {
        
        //SE SOLICITA CANTIDAD DE MATERIAL
        papel = parseFloat(prompt(`casa ${i + 1}: ingrese la cantidad de papel en KG`));
        
        //VERFICAR VALORES INGRESADOS
        if (papel > 1000 || papel < 0 || isNaN(papel)){
            alert("!VALORES NO VALIDOS¡")
        }

    } while (papel > 1000 || papel < 0 || isNaN(papel));
    //CLASIFICAR MATERIAL
    papel = clasificarMateriales(papel);
        
    

    do {

        plastico = parseFloat(prompt(`casa ${i + 1}: ingrese la cantidad de plastico en KG`));
        
        if (plastico > 1000 || plastico < 0 || isNaN(plastico)){
            alert("!VALORES NO VALIDOS¡")
        }

    } while (plastico > 1000 || plastico < 0 || isNaN(plastico));
    plastico = clasificarMateriales(plastico);
    

    do {

        vidrio = parseFloat(prompt(`casa ${i + 1}: ingrese la cantidad de vidrio en KG`));
        
        if (vidrio > 1000 || vidrio < 0 || isNaN(vidrio)){
            alert("!VALORES NO VALIDOS¡")
        }

    } while (vidrio > 1000 || vidrio < 0 || isNaN(vidrio));
    vidrio = clasificarMateriales(vidrio);
        
        //SUMAR RECICLAJE TOTAL
        reciclajeTotal = papel + plastico + vidrio;
        
        //mensaje de recompensa
        recompensa = determinarRecompensa()

        //REGISTRAR LA CASA 
        let casa = {
            papel:papel,
            platico : plastico,
            vidrio : vidrio,
            reciclajeTotal: reciclajeTotal,
            recompensa : recompensa
        }

        //ADICIONAR CASA A ARRAY CASAS
        casas.push(casa);
    }

    return casas

}


//FUNCION PARA  CLASIFICAR MATERIALES
const clasificarMateriales = (material) =>{

    //PREGUNTAR ESTADO DE MATERIALES
    let estadoMaterial = prompt(`el material esta:
        1. Reciclable
        2. No Reciclable
        3.Con Condiciones (sucio,mezclado)`)

        //VERIFICAR RESPUESTA

    if (estadoMaterial == "1" || estadoMaterial == "3"){
        material = material;
    } else {
        noReciclable  += material;

        material = 0
    }
    //RETURNAR MATERIAL
    return material
}


//FUNCIOR PARA DETERMINAR HOGARES RECOMPENSADOS
const determinarRecompensa = () =>{

        //VERIFICAR MINIMO PARA REALIZAR DESUENTO
        if(reciclajeTotal > 50 ){
            recompensa = 3
            alert (`Felicidades has recibido ${recompensa} cupones de recompensa`)
            hogaresRecompensados += 1;

        } else{
            recompensa = 0
        }

        return recompensa
    };


let hogares = parseInt(prompt("cuantas hogares vas a registar?: "))

registrarCasas(hogares);

console.log(casas)
console.log(noReciclable)
