//declare var module:any;
const rxjs = require('rxjs');
const observableUno$ = rxjs.of(7);
console.log(observableUno$);
observableUno$
    .subscribe((ok) => {
    console.log('En ok', ok);
}, (error) => {
    console.log(error);
});
