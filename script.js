function Persona(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
}

Persona.prototype.saludar = function () {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
}

function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellido = apellidos;
    this.edad = edad;
    this.materiasInscritas = [];
    this.calificaciones = {};
}

Alumno.prototype.inscribirMateria = function (materia) {
    this.materiasInscritas.push(materia);
}

Alumno.prototype.asignarCalificacion = function (materia, calificacion) {
    this.calificaciones[materia] = calificacion;
}

const grupos = {};
let sumaCalificaciones = 0;
let promedioAlumnos = [];

function altaAlumnoYAsignarGrupo(grupos) {
    let nombre = prompt("¿Cuál es tu nombre?");
    let apellidos = prompt("¿Cuáles son tus apellidos?");
    let edad = parseInt(prompt("¿Cuál es tu edad?"));

    const alumno = new Alumno(nombre, apellidos, edad);

    let materiasCantidad = parseInt(prompt("¿Cuántas materias deseas inscribir?"));
    let sumaCalificaciones = 0;

    for (let i = 0; i < materiasCantidad; i++) {
        let materia = prompt(`Introduce el nombre de la materia ${i + 1}:`);
        alumno.inscribirMateria(materia);

        let calificacion = parseFloat(prompt(`Introduce la calificación para ${materia}:`));
        alumno.asignarCalificacion(materia, calificacion);
        sumaCalificaciones += calificacion;
    }

    let grupoElegido = prompt("¿En qué grupo deseas inscribirte? (A, B o C)").toUpperCase();

    if (["A", "B", "C"].includes(grupoElegido)) {
        crearGrupoYAsignarAlumnos(`Grupo ${grupoElegido}`, [alumno], grupos);
        console.log(`Alumno inscrito en el Grupo ${grupoElegido}`);
    } else {
        console.log("Grupo no válido. Alumno no inscrito en ningún grupo.");
    }

    let promedio = sumaCalificaciones / materiasCantidad;
    promedioAlumnos.push({ alumno, promedio });

    return alumno;
}


function crearGrupoYAsignarAlumnos(nombreGrupo, alumnos) {
    if (!grupos[nombreGrupo]) {
        grupos[nombreGrupo] = [];
    }

    for (let i = 0; i < alumnos.length; i++) {
        grupos[nombreGrupo].push(alumnos[i]);
    }
}

function busquedaPorNombre() {
    const nombreABuscar = prompt("Ingrese el nombre del alumno a buscar:");
    const resultados = buscarAlumnoPorNombre(nombreABuscar);
    mostrarResultados(resultados);
}

function busquedaPorApellido() {
    const apellidoABuscar = prompt("Ingrese el apellido del alumno a buscar:");
    const resultados = buscarAlumnoPorApellido(apellidoABuscar);
    mostrarResultados(resultados);
}

function busquedaPorPromedio() {
    const promedioABuscar = prompt("Ingrese el nombre o apellido del alumno a buscar:");
    const resultados = buscarAlumnoPorPromedio(promedioABuscar);
    mostrarResultados(resultados);
}

function buscarAlumnoPorNombre(nombre) {
    const resultados = [];

    for (const nombreGrupo in grupos) {
        const grupo = grupos[nombreGrupo];

        const alumnoEncontrado = grupo.find(alumno => alumno.nombre.toLowerCase() === nombre.toLowerCase());

        if (alumnoEncontrado) {
            const promedio = promedioAlumnos.find(p => p.alumno === alumnoEncontrado);
            resultados.push({
                grupo: nombreGrupo,
                alumno: alumnoEncontrado,
                promedio: promedio ? promedio.promedio : null,
            });
        }
    }

    return resultados;
}

function buscarAlumnoPorApellido(apellido) {
    const resultados = [];

    for (const nombreGrupo in grupos) {
        const grupo = grupos[nombreGrupo];

        const alumnoEncontrado = grupo.find(alumno => alumno.apellido.toLowerCase() === apellido.toLowerCase());

        if (alumnoEncontrado) {
            const promedio = promedioAlumnos.find(p => p.alumno === alumnoEncontrado);
            resultados.push({
                grupo: nombreGrupo,
                alumno: alumnoEncontrado,
                promedio: promedio ? promedio.promedio : null,
            });
        }
    }
    return resultados;
}

function buscarAlumnoPorPromedio(nombreOApellido) {
    const resultados = [];

    for (const nombreGrupo in grupos) {
        const grupo = grupos[nombreGrupo];

        const alumnoEncontrado = grupo.find(alumno => alumno.nombre.toLowerCase() === nombreOApellido.toLowerCase() || alumno.apellido.toLowerCase() === nombreOApellido.toLowerCase());

        if (alumnoEncontrado) {
            const promedio = promedioAlumnos.find(p => p.alumno === alumnoEncontrado);
            resultados.push({
                grupo: nombreGrupo,
                alumno: alumnoEncontrado,
                promedio: promedio ? promedio.promedio : null,
            });
        }
    }

    return resultados;
}

function mostrarResultados(resultados) {
    if (resultados.length > 0) {
        console.log(`Alumno(s) encontrado(s):`);
        resultados.forEach(resultado => {
            console.log(`- En el Grupo ${resultado.grupo}: ${resultado.alumno.nombre} ${resultado.alumno.apellido} - Promedio: ${resultado.promedio}`);
        });
    } else {
        console.log(`No se encontraron alumnos con esa búsqueda en ningún grupo.`);
    }
}


function obtenerPromedioGrupo(nombreGrupo) {
    const grupo = grupos[`Grupo ${nombreGrupo}`];

    if (!grupo || grupo.length === 0) {
        return null;
    }

    let sumaCalificacionesGrupo = 0;
    let totalAlumnos = 0;

    for (const alumno of grupo) {
        const calificaciones = alumno.calificaciones;
        for (const materia in calificaciones) {
            sumaCalificacionesGrupo += calificaciones[materia];
            totalAlumnos++;
        }
    }

    if (totalAlumnos === 0) {
        return null;
    }

    const promedioGrupo = sumaCalificacionesGrupo / totalAlumnos;
    return promedioGrupo;
}

function busquedaPorPromedioGrupal() {
    const nombreGrupo = prompt("Ingrese el nombre del grupo para obtener el promedio:");

    if (!grupos[`Grupo ${nombreGrupo}`]) {
        console.log(``);
        return;
    }

    const promedioGrupo = obtenerPromedioGrupo(nombreGrupo);
    console.log(`El promedio del Grupo ${nombreGrupo} es: ${promedioGrupo}`);

    busquedaPorPromedioGrupal();
}


function ordenarPorCalificación() {
    const listaAscendente = obtenerListaAlumnosPorCalificacion('ascendente');

    const listaDescendente = obtenerListaAlumnosPorCalificacion('descendente');

    console.log('Lista de alumnos ordenada ascendente por calificación:');
    console.log(listaAscendente);

    console.log('Lista de alumnos ordenada descendente por calificación:');
    console.log(listaDescendente);
}

function obtenerListaAlumnosPorCalificacion(orden) {
    const listaAlumnos = [];

    for (const nombreGrupo in grupos) {
        const grupo = grupos[nombreGrupo];

        for (const alumno of grupo) {
            const calificaciones = Object.values(alumno.calificaciones);
            const promedio = calificaciones.length > 0 ? calificaciones.reduce((a, b) => a + b) / calificaciones.length : 0;

            listaAlumnos.push({
                grupo: nombreGrupo,
                alumno: `${alumno.nombre} ${alumno.apellido}`,
                calificación: promedio,
            });
        }
    }

    if (orden === 'ascendente') {
        listaAlumnos.sort((a, b) => a.calificación - b.calificación);
    } else if (orden === 'descendente') {
        listaAlumnos.sort((a, b) => b.calificación - a.calificación);
    }

    return listaAlumnos;
}

console.log(grupos);
