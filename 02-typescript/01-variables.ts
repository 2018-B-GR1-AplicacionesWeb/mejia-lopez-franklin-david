//02-typescript/01-variables.ts

//Transpilar

//npm install -g typescript

const nombre: string='';
const edad:number=12;
const nada=null;
const casado:boolean=false;

let loQueSea:any={};
loQueSea=1;
loQueSea='Facil';
loQueSea=true;

const fechaNacimiento:Date=new Date();

let identificador:number|string ='1';
identificador=1;
identificador='uno';
interface usuarioInterface {
    nomnbre:string;
    apellido:string;
    edad?:string|number;
}

class Usuario{
    public nombre:string;
    public  apellido:string;
    public edad?: number|string;
}

const usuario:Usuario={
    nombre:'Adrian',
    apellido:'Eguez'
   };
//TSC nombreArchivo --target es3

function sumarDosNumeros(
    numeroUno:number,
    numeroDos:number
) {
    return  numeroUno+numeroDos;
}
sumarDosNumeros(2,3);

