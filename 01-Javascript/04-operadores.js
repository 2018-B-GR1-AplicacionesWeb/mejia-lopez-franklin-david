function ejemplo(){}

var ejemploDos=function () {
//anonymus function
};

var adrian ={
    trabajar:function () {
        return 'Trabajando';
    }
};

var arregloFunciones=[function () { //Anonymus function

}];

/* No se pueden usar funciones anonimas sin igualar o enviar como parametro
var sumar = function(a,b,c){

};*/
console.log(typeof ejemplo); //Tipo de dato -> function
console.log(ejemplo); // Definicion de la funcion
console.log(ejemplo()); //Ejecucion funcion
var variableUno; //NUNCA USAR
let variableDos=2; //USAR MUTABLE (ESTE SE ASIGNA A OTRO VALOR)

variableDos=variableDos+1;
const pi=3.1416;

//operadores
const arregloDeNombres=['A','b','C'];
arregloDeNombres[1]='B';


const vicente={
    nombre:'Vicente'
};
vicente.nombre='Adrian';
vicente.edad=24;

console.log(arregloDeNombres);
console.log(vicente);

//Escribir codigo que se entienda
arregloDeNombres.forEach(function (valorActual,indiceActual,arreglo) {
    console.log('Valor Actual',valorActual);
    console.log('Indice Actual',indiceActual);
    console.log('Arreglo',arreglo);
});
//function con nombre
//function anonimas
//fat arrow functions -> =>
arregloDeNombres.forEach((valorActual,indiceActual,arreglo)=>{
    console.log('Valor Actual',valorActual);
    console.log('Indice Actual',indiceActual);
    console.log('Arreglo',arreglo);
});
/*
const sumarDosNumeros=(numUno,numDos)=>{return numUno+numDos};

const sumarDosNumeros=(numUno,numDos)=>numUno+numDos;
const elevarAlCuadrado=(numero)=>numero*numero;
const elevarAlCuadrado2=numero=>numero*numero;
*/
const arregloDeNombresDos=['E','F','G','H'];

const resultado= arregloDeNombresDos
    .map(//mutar cada elemento del arreglo
 valorActual=>{
     return valorActual+'.';
 }

)
.forEach(
    (valorNuevo)=>console.log(valorNuevo)
);


console.log(resultado);

const  arregloNumeros=[2,3,1,5,6,4,7,8,9,10];

const resultadoFilter = arregloNumeros
.filter(
    valorActual=>{
      return (valorActual%2)===0
    }
);
console.log(resultadoFilter);
//Triple Igual
if('1'===1){
    console.log('Es verdad');
}
else{
    console.log('Es falso');
}

// Every

const resultadoEvery=arregloNumeros
.every(n=>n>1);//Si cumple devuelve true y si uno no cumple false
console.log(resultadoEvery);
//Some
const resultadoSome=arregloNumeros
    .some(n=>n<0);//Si cumple devuelve true y si no cumple false
console.log(resultadoSome);


//findIndexOf
const resultadofio=arregloNumeros
    .findIndex(n=>n===7);//Si cumple devuelve true y si no cumple false
console.log(arregloNumeros.indexOf(7));
console.log(resultadofio);

//find
const resultadof=arregloNumeros
    .find(n=>n===7);//Si cumple devuelve true y si no cumple false
console.log(arregloNumeros.indexOf(7));
console.log(resultadof);

//reduce
const resultadored=arregloNumeros
    .reduce((valorActualDelNumero,ValorActualDelArreglo)=>{
        return valorActualDelNumero-ValorActualDelArreglo
        },//1er parametro funcion
    100 //Acepta valor
);
console.log(resultadored);

const resultadoReduce=arregloNumeros
.reduceRight((a,b)=>a+b,0);
console.log(arregloNumeros);
console.log(resultadoReduce);

//sort
const clonArreglosNumeros=JSON.parse(JSON.stringify(arregloNumeros));
console.log(clonArreglosNumeros.sort((a, b) => a-b));
console.log(clonArreglosNumeros.sort((a, b) => b-a));