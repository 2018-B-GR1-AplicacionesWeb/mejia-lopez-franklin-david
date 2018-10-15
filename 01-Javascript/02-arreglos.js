var arreglo = [];

arreglo = [
    1,
    "David",
    false,
    null,
    new Date(),
    {
        nombre: "Frank"
    },
    [1, 2, false, true]
];

console.log(arreglo);
arreglo.push(3);
console.log(arreglo);
arreglo.pop();
console.log(arreglo);

var arregloNumeros = [1, 2, 3, 4, 5];

arregloNumeros.splice(1, 0, 1.1);
console.log(arregloNumeros);

arregloNumeros.splice(4, 1);
console.log(arregloNumeros);
arregloNumeros.splice(2,0,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9);
console.log(arregloNumeros);

var indiceUnoSiete=arregloNumeros.indexOf(1.7);
console.log(arregloNumeros[indiceUnoSiete]);
console.log(arregloNumeros[0]);

var posicionIncialUnoUno=arregloNumeros.indexOf(1.1);//0

var posicionIncialUnoNueve=arregloNumeros.indexOf(1.9);//5
var desdeUnoUnoAlUnoNueve=(posicionIncialUnoNueve-posicionIncialUnoUno)+1;
arregloNumeros.splice(posicionIncialUnoUno,desdeUnoUnoAlUnoNueve);
console.log(arregloNumeros);


//unir dos o mas arreglos

var arregloUno=[1,2,3];
var arregloDos=[4,5,6];

//Destructuracion de arreglos

console.log(1,2,3);
console.log(...arregloUno);

var arregloCompleto=[...arregloUno,...arregloDos];
console.log(arregloCompleto);

var arregloArgumentos= [posicionIncialUnoUno,posicionIncialUnoNueve];
arregloNumeros.splice(...arregloArgumentos);
console.log(arregloNumeros);




var david={
    nombre:"David",
    apellido:"Mejia",
    direccion:"Solanda",
    casado:false,
    edad:32
};
var kaiser={
    mascota:{
        nombre:"Kaiser"
    },
    fechaNac:"Marzo"
};

var datosusuario={...david,...kaiser};
console.log(datosusuario);

//Objetos

var atributosDelObjeto=Object.keys(datosusuario);
console.log(atributosDelObjeto);