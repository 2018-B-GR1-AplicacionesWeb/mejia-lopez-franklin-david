declare var Promise:any;

const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;


const preguntasMenuPrincipal = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que desea hacer?',
    choices: [
        'Nueva venta',
        'Buscar venta realizada',
        'Borrar una venta realizada',
        'Modificar una venta realizada',
    ]
};
const preguntasNuevaVenta = [
    {
        type: 'input',
        name: 'codigo',
        message: 'Codigo de la venta: '
    },
    {
        type: 'input',
        name: 'detalle',
        message: 'Detalle de la venta: '
    },
    {
        type: 'input',
        name: 'producto',
        message: 'Productos: '
    },
    {
        type: 'input',
        name: 'cantidad',
        message: 'Cantidad: '
    },
    {
        type: 'input',
        name: 'proveedor',
        message: 'Proveedor: '
    },
];
const preguntaVentaBusquedaPorCodigo = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el codigo de la venta:'
    }
];
const  preguntaBuscarVentaPorCodigo = {
    type: 'input',
    name: 'codigoABuscar',
    message: 'Ingrese el codigo de la venta a buscar'
};
const  preguntaBorrarVentaPorCodigo = {
    type: 'input',
    name: 'codigoABorrar',
    message: 'Ingrese el codigo de la venta que desea borrar'
};
const preguntasModificarVenta = [
    {
        type: 'input',
        name: 'codigoVenta',
        message: 'Ingrese el codigo de la venta a buscar: '
    },
    {
        type: 'input',
        name: 'nuevoDetalle',
        message: 'Ingrese un nuevo detalle de venta: '
    }
];

function main() {
    console.log('Inicio');
    inicializarBase()
        .pipe(
            mergeMap(
                (respuestaBDD: RespuestaBDD) => {
                    return preguntarMenuPrincipal()
                        .pipe(
                            map(
                                (respuesta: OpcionesPreguntaMenuPrincipal) => {
                                    return {
                                        respuestaUsuario: respuesta,
                                        respuestaBDD
                                    }
                                }
                            )
                        )
                }
            ),
            mergeMap(
                (respuesta: RespuestaUsuario) => {
                    console.log(respuesta);
                    switch (respuesta.respuestaUsuario.opcionMenu){
                        case 'Nueva venta':
                            return preguntarDatosNuevaVenta()
                                .pipe(
                                    map(
                                        (venta) =>{
                                            respuesta.venta = venta;
                                            return respuesta;
                                        }
                                    )
                                );
                        case "Buscar venta realizada":
                            return preguntarVentaABuscarPorCodigo()
                                .pipe(
                                    map(
                                        (nombreVenta) => {
                                            respuesta.codigoVenta = nombreVenta.codigoABuscar;
                                            console.log(respuesta.codigoVenta);
                                            return respuesta;
                                        }
                                    )
                                );
                        case 'Borrar una venta realizada':
                            return preguntarVentaAEliminarPorCodigo()
                                .pipe(
                                    map(
                                        (codigoVenta) => {
                                            respuesta.codigoVenta= codigoVenta.codigoABorrar;
                                            return respuesta;
                                        }
                                    )
                                );
                        case 'Modificar una venta realizada':
                            return rxjs
                                .from(inquirer.prompt(preguntaVentaBusquedaPorCodigo))
                                .pipe(
                                    mergeMap(
                                        (venta) => {
                                            respuesta.venta= venta;
                                            const codigoVentaBuscar = buscarVenta(respuesta.venta.codigo, respuesta.respuestaBDD.bdd);
                                            console.log('Codigo ' +codigoVentaBuscar);
                                            respuesta.codigoVenta = codigoVentaBuscar;
                                            if (codigoVentaBuscar > -1 ){
                                                console.log(JSON.stringify(respuesta.respuestaBDD.bdd.ventas[codigoVentaBuscar],null,2));
                                                return rxjs
                                                    .from(inquirer.prompt(preguntasNuevaVenta))
                                                    .pipe(
                                                        map(
                                                            (venta)=>{
                                                                console.log('Venta: ' + JSON.stringify(venta));
                                                                respuesta.venta = venta;
                                                                return respuesta
                                                            }
                                                        )
                                                    );
                                            }else {
                                                console.log(' Codigo de venta no existe');
                                            }
                                            respuesta.codigoVenta = codigoVentaBuscar;
                                            return respuesta

                                        }
                                    ),

                                );
                        default:
                            return 'No ingreso';
                    }
                }
            ),
            map(
                (respuesta: RespuestaUsuario) => {

                    console.log(respuesta.venta);
                    switch(respuesta.respuestaUsuario.opcionMenu){
                        case 'Nueva venta':
                            const ventaNueva = respuesta.venta;
                            respuesta.respuestaBDD.bdd.ventas.push(ventaNueva);
                            return respuesta;

                        case 'Buscar venta realizada':
                            const codVenta = respuesta.codigoVenta;
                            buscarPorCodigo(codVenta);
                            return respuesta;
                        case 'Borrar una venta realizada':
                            const nombreBorrar = respuesta.codigoVenta;
                            eliminarVenta(nombreBorrar);
                            return respuesta;

                        case 'Modificar una venta realizada':
                            console.log('Nueva Venta: ' + JSON.stringify(respuesta.venta));
                            console.log('Antigua Venta: ' + JSON.stringify(respuesta.respuestaBDD.bdd.ventas[respuesta.codigoVenta]));
                            respuesta.respuestaBDD.bdd.ventas[respuesta.codigoVenta].codigo = respuesta.venta.codigo;
                            respuesta.respuestaBDD.bdd.ventas[respuesta.codigoVenta].detalle = respuesta.venta.detalle;
                            respuesta.respuestaBDD.bdd.ventas[respuesta.codigoVenta].producto = respuesta.venta.producto;
                            respuesta.respuestaBDD.bdd.ventas[respuesta.codigoVenta].cantidad = respuesta.venta.cantidad;
                            respuesta.respuestaBDD.bdd.ventas[respuesta.codigoVenta].proveedor = respuesta.venta.proveedor;
                            return respuesta;

                    }
                }
            ),
            mergeMap(
                (respuesta: RespuestaUsuario) => {
                    return guardarBase(respuesta.respuestaBDD.bdd);
                }
            )
        ).subscribe(
        (mensaje) => {
            console.log(mensaje);
        },
        (error) => {
            console.log(error);
        }, () => {
            console.log('Completado');
            main();
        }
    )
}
function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDD());

    return leerBDD$
        .pipe(
            mergeMap(
                (respuestaLeerBDD: RespuestaBDD) => {
                    if (respuestaLeerBDD.bdd) {
                        // truty / {}
                        return rxjs.of(respuestaLeerBDD)
                    } else {
                        // falsy / null
                        return rxjs.from(crearBDD())
                    }
                }
            )
        )
        ;
}
function leerBDD(){
    return new Promise(
        (resolve) => {
            fs.readFile(
                'bddventas.json',
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        resolve({
                            mensaje: 'Base de datos vacia',
                            bdd: null
                        });
                    } else {
                        resolve({
                            mensaje: 'La Base existe!',
                            bdd: JSON.parse(contenidoLeido)
                        });
                    }

                }
            );
        }
    );
}
function crearBDD() {
    const contenidoInicialBDD ='{"ventas":[]}';
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bddventas.json',
                contenidoInicialBDD,
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error creando la Base',
                            error: 500
                        });
                    } else {
                        resolve({
                            mensaje: 'BDD creada',
                            bdd: JSON.parse(contenidoInicialBDD)
                        });
                    }

                }
            )

        }
    )
}
main();
function guardarBase(bdd: BaseDeDatos) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bddventas.json',
                JSON.stringify(bdd),
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error guardando la Base',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada'
                        })
                    }
                }
            )
        }
    );
}
function buscarPorCodigo(codigo) {
    fs.readFile('bddventas.json', 'utf-8',
        (err, contenido) => {
            if (err) {
                err({mensaje: 'Error leyendo'});
            } else {
                const base = JSON.parse(contenido);
                const respuestaFind = base.ventas.
                find((venta) => {
                        return venta.codigo === codigo;
                    }
                );

                console.log(respuestaFind);
                return respuestaFind;

            }
        }
    );
}
function eliminarVenta(codigo) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bddventas.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const base = JSON.parse(contenido);
                        const CodVenta = base.ventas
                            .findIndex(
                                (venta) => {
                                    return venta.codigo === codigo;
                                }
                            );

                        base.ventas.splice([CodVenta],1);

                        fs.writeFile(
                            'bddventas.json',
                            JSON.stringify(base),
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({mensaje: 'Venta Modifcada'});
                                }
                            }
                        );
                    }
                });
        }
    );
}
function buscarVenta(codigo, bdd) {
    const contenidoActual = JSON.stringify(bdd);
    const baseActual = JSON.parse(contenidoActual);
    const indiceVenta = baseActual.ventas
        .findIndex(
            (venta) => {

                return venta.codVent === codigo;
            }
        );
    return indiceVenta


}

interface BaseDeDatos {
    ventas: Venta [];
}
interface RespuestaBDD {
    mensaje: string,
    bdd: BaseDeDatos
}

interface Venta {
    codigo: string;
    detalle: string;
    producto: string;
    cantidad: string;
    proveedor: string;
}

interface OpcionesPreguntaMenuPrincipal{
    opcionMenu: 'Nueva venta' | 'Buscar venta realizada' | 'Borrar una venta realizada' | 'Modificar una venta realizada'
}

interface RespuestaUsuario {
    respuestaUsuario: OpcionesPreguntaMenuPrincipal,
    respuestaBDD: RespuestaBDD,
    venta?: Venta,
    codigoVenta? : string,
    nuevaVenta?: string
}


function preguntarMenuPrincipal() {
    return rxjs.from(inquirer.prompt(preguntasMenuPrincipal));
}
function preguntarDatosNuevaVenta() {
    return rxjs.from(inquirer.prompt(preguntasNuevaVenta));
}
function preguntarVentaABuscarPorCodigo() {
    return rxjs.from(inquirer.prompt(preguntaBuscarVentaPorCodigo));
}
function preguntarVentaAEliminarPorCodigo() {
    return rxjs.from(inquirer.prompt(preguntaBorrarVentaPorCodigo));
}
function preguntarVentaAActualizarPorCodigo() {
    return rxjs.from(inquirer.prompt(preguntasModificarVenta))
}

