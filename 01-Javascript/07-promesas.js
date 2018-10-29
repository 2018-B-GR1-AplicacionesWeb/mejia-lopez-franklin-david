// 07-promesas.js

const fs = require('fs');

const nuevaPromesaLectura = new Promise(
    (resolve, reject) => {
        fs.readFile('06-texto.txt', 'utf-8',
            (err, contenidoArchivo) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);


const nuevaPromesaEscritura = (contenidoLeido) => {
    return new Promise(
        (resolve, reject) => {

            const contenido = contenidoLeido ? contenidoLeido + 'Otro ola' : 'Otro ola';

            fs.writeFile('06-texto.txt', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('LO QUE SEA');
                    }
                });
        }
    );
};

nuevaPromesaLectura
    .then(
        (resultadoOk) => {
            console.log('Todo bien', resultadoOk);
            return nuevaPromesaEscritura(contenidoArchivo)

        }
    )
    .then(
        (contenidoCompleto) => {
            console.log('Contenido Completo',contenidoCompleto);

        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );