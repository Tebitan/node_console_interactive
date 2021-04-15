const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


require('colors');



const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //imprime el menu 
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //crear opcion 
                const desc = await leerInput('Digite la Descripción de la tarea :  ')
                tareas.crearTarea(desc);
                break;
            case '2':
                //Listar opcion
                tareas.listadoCompleto();
                break;

            case '3':
                //Listar Completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                //Listar Pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':
                //Completado Pendientes 
                const idsTarea = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(idsTarea);


                break;

            case '6':
                //Borrar
                const idTarea = await listadoTareasBorrar(tareas.listadoArr);
                //preguntar si esta seguro

                if (idTarea !== '0') {
                    const isOk = await confirmar("¿ Está seguro ?");

                    if (isOk) {
                        tareas.borrarTarea(idTarea);
                        console.log('Tarea borrada correctamente');
                    }
                }

                break;

        }

        guardarDB(tareas.listadoArr);





        if (opt !== '0') await pausa();

    } while (opt !== '0');
}

main();