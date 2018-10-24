const fs = require('fs');
const contenidoAAgregar='David\n';
const nomnreArchivo='05-texto.txt';
console.log('Inicio');
fs.readFile(nomnreArchivo,'utf-8',
    (error,contenidoArchivo)=>{ //Callback
    if(error){
        console.error(error);
        try{
            throw new Error(error);
        }catch (e) {
            console.log(e);
        }
        console.log('Extra');

    }else{
        console.log('Si sirvio',contenidoArchivo);
        fs.writeFile(nomnreArchivo,contenidoArchivo+contenidoAAgregar,(err)=>{
            if (err)throw err;
            console.log('Archivo completao!');
        });
    }
    });



console.log('Fin');