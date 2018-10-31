//02-observables.ts
//import{}from 'rxjs';
declare var require;
//declare var module:any;
const rxjs=require('rxjs');

const observableUno$=rxjs.of(1,2,3,4,5,6,7);
console.log(observableUno$);

observableUno$
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