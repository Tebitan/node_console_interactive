const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿ Qué desea hacer ?',
    choices: [{
            value: '1',
            name: ` ${'1.'.green } Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.green }  Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.green } Listar tareas Completadas`
        },
        {
            value: '4',
            name: `${'4.'.green } Listar tareas Pendientes`
        },
        {
            value: '5',
            name: `${'5.'.green } Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.green } Borrar tarea`
        },
        {
            value: '0',
            name: `${'0.'.red} Salir`
        }
    ]
}];


const inputPausa = [{
    type: 'input',
    name: 'respuesta',
    message: `Presione ${ 'ENTER'.green } para continuar`
}];

const inquirerMenu = async() => {
    console.clear();
    console.log('==========================='.green);
    console.log(' Seleccione una opciòn '.white);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
};

const pausa = async() => {
    console.log('\n');
    const opcion = await inquirer.prompt(inputPausa);
    return opcion;
}

const leerInput = async(mensaje = '') => {
    const input = [{
        type: 'input',
        name: 'desc',
        message: mensaje,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;

        }
    }];

    const { desc } = await inquirer.prompt(input);
    return desc;
};


const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'.red
    });
    const pregunta = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }];

    const { id } = await inquirer.prompt(pregunta);
    return id;
};


const confirmar = async(message) => {
    const pregunta = {
        type: 'confirm',
        name: 'ok',
        message
    };

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
};

const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });


    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
};


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}