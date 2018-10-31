//06-callback-propio.js
const fs = require('fs');
function appendFile(nombreArchivo,contenidoArchivo,callback){

    //1ero leer si existe el archivo
    //2do si existe leer el contenido
    //sobre escribir el archivo con el contenido nuevo
    //mas el contenido antiguo

    let totalArchivo='INICIO';

    fs.readFile(nombreArchivo,'utf-8',
        (error,contenidoArchivoLeido)=>{
        if (error){
           fs.writeFile(nombreArchivo,contenidoArchivo,
               (err)=>{
               if(err){
                   console.error('Error escribiendo');
                   callback(undefined,err);
               }else {
                   console.log('Archivo creado');
                   callback(contenidoArchivo)
               }

               }
           );

        }else{
            fs.writeFile(nombreArchivo,contenidoArchivoLeido+contenidoArchivo,
                (err)=>{
                    if(err){
                        console.error('Error escribiendo');
                        callback(contenidoArchivo)
                    }else {
                        console.log('Archivo creado');
                    }
                }
            );
        }

        }


        );


}
appendFile('06-texto2.text','\n Adios Mundo',
    (contenidoArchivo,error)=>{
    if(error){
        console.log('Error',error)
    }else{
        console.log(contenidoArchivo)
    }
    }
    );



// ['A','B','C']
//0-A.txt 'A'
//1-B.txt 'B'
//2-C.txt 'C'
//Todo en formato JSON

const respuesta={
    nombreArchivo:'',
    contenidoArchivo:'',
    error:''
};

[respuesta,respuesta,respuesta,respuesta,respuesta,respuesta]
function ejercicioDeArchivos(arregloStrings, callback) {

    const arregloRespuestas = [];

    arregloStrings
        .forEach(
            (string, indice) => {
                const archivo = `${indice}-${string}.txt`;
                const contenido = string;
                fs.writeFile(archivo,
                    contenido,
                    (err) => {
                        const respuesta = {
                            nombreArchivo: archivo,
                            contenidoArchivo: contenido,
                            error: err
                        };
                        arregloRespuestas.push(respuesta);
                        const tamanoRespuestas = arregloRespuestas.length;
                        if (tamanoRespuestas === arregloStrings.length) {
                            callback(arregloRespuestas)
                        }
                    });
            }
        );
    /*
        for (let i = 0; i < arregloStrings.length; i++) {
            ;
            fs.writeFile(`${i}-${arregloStrings[i]}.txt`,
                contenido,
                (err) => {
                    const respuesta = {
                        nombreArchivo: archivo,
                        contenidoArchivo: contenido,
                        error: err
                    };
                    arregloRespuestas.push(respuesta);
                    const tamanoRespuestas = arregloRespuestas.length;
                    if (tamanoRespuestas === arregloStrings.length) {
                        callback(arregloRespuestas)
                    }
                });
        }
        */
}

const arregloStrings = ['A', 'B', 'C'];

ejercicioDeArchivos(arregloStrings,
    (arregloRespuestas) => {
        console.log(arregloRespuestas);
    });


function ejercicioDeArchivos(arregloStrings) {
    return new Promise(
        (resolve,reject()=>{
            resolve();
            reject();
    }
);
};

    )
}