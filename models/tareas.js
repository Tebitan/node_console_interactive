const { Tarea } = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    listadoCompleto() {
        console.log('\n');
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${ i + 1 }.`.green;
            const estado = (tarea.completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${ idx.green } ${ tarea.desc } :: ${ estado }`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        let contador = 0;

        this.listadoArr.forEach(tarea => {
            const estado = (tarea.completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            if (completadas) {
                if (tarea.completadoEn) {
                    contador++;
                    console.log(`${ (contador + '.').green } ${ tarea.desc } :: ${ tarea.completadoEn.green }`);
                }

            } else {
                if (!tarea.completadoEn) {
                    contador++;
                    console.log(`${ (contador + '.').green } ${ tarea.desc } :: ${ estado }`);
                }
            }
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();

            }
        });

        //las que no vengas en arreglo , las marco como no completadas
        this.listadoArr.forEach(tar => {
            if (!ids.includes(tar.id)) {
                const tarea = this._listado[tar.id];
                tarea.completadoEn = null;
            }
        });

    }

}

module.exports = Tareas;