
function  sumarDosNumeros(nUno,nDos) {
    var esNumberNumeroUno=typeof nUno=='number';
    var esNumberNumeroDos=typeof nDos=='number';
    if(esNumberNumeroUno && esNumberNumeroDos){
        return nUno+nDos;

    }
    else {
        console.error('No envia numeros');
        return 0;
    }
}


console.log(sumarDosNumeros("Adrian",true,4,5,6,7));
console.log(sumarDosNumeros(false,true,null,{},6,7));
console.log(sumarDosNumeros(1,3,4,5,6,7));

function sumarNNumeros(...numeros) {
    var tieneUnParametroDiferenteDeNumber = false;

    var resultado = 0;

    var respuesta= sumarNumerosDesdeUnArreglo(numeros);

   if(respuesta.noEsNumber){
        console.error('No envia numeros');
        return 0;
    }else{
        return respuesta.resultado;
    }
}

function sumarNumerosDesdeUnArreglo(numeros){
    var tieneUnParametroDiferenteDeNumber = false;
    var resultado=0;
    for (var i = 0; i < numeros.length; i++) {
        var esNumeroNumber = typeof numeros[i] == 'number';
        if (!esNumeroNumber) {
            tieneUnParametroDiferenteDeNumber = true;
        } else{
            resultado = resultado + numeros[i]
        }
    }
    return {
        noEsNumber:tieneUnParametroDiferenteDeNumber,
        resultado:resultado
    }
}


console.log(sumarNNumeros("Adrian",true,4,5,6,7));
console.log(sumarNNumeros(false,true,null,{},6,7));
console.log(sumarNNumeros(1,3,4,5,6,7));
console.log(sumarNNumeros(1,2,3));

