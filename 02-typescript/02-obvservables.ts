//02-observables.ts
//import{}from 'rxjs';
declare var require;
//declare var module:any;
const rxjs=require('rxjs');
const map=require('rxjs/operators').map;
const disctint=require('rxjs/operators').distinct;


const observableUno$=rxjs.of([1,2,3],'Hola',3,true,{nombre: 'Adrian'},new Date(),3,3, 3,);
console.log(observableUno$);
observableUno$
    .pipe(
        disctint(),
        map(
            (valor)=>{
                console.log('Valor',valor);
                return {data: valor};
            }
        )

    )
.subscribe(
    (ok)=>{
        console.log('En ok',ok);
    },
    (error)=>{
        console.log(error);
    },
    ()=>{
        console.log('completado');
    }
    );

const promesita = () => {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            reject(':(');
        }
    )
};
const observableDePromesa$ = rxjs.from(promesita());

observableDePromesa$
    .pipe(
        map(
            (valor) => {
                return {
                    data: valor
                }
            }
        )
    )
    .subscribe(
        (objetoFeliz) => {
            console.log(objetoFeliz);
        },
        (error) => {
            console.log(error);
        }
    );

async function ejecutarCodigoSyncrono() {
    console.log('Inicio');
    try{
        const resultadoPromesita = await promesita();
        console.log(resultadoPromesita);

    }
    catch (e) {
        console.log('Error en promesita',e);
    }

    console.log('Fin');

}