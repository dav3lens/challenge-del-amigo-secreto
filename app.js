//variables
let amigos = [];
let numeroDeAmigos = 0;
let numeroMaximoDeAmigos = 5;
let mostrarListaAmigos = document.querySelector('#listaDeAmigos');
const botonSortear = document.getElementById('sortear');
//Contenido original del botón (texto e imagen)
const botonSortearOriginal = botonSortear.innerHTML;

//Funcios solo mayusculas
function convertirAMayusculas(input) {
    input.value = input.value.toUpperCase();
}

// Permitir presionar enter para agregar amigo o sortear si el botón está desactivado
document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const botonAgregar = document.getElementById('agregar');
        if (!botonAgregar.disabled) {
            agregarAmigo();
        }
        // Si el botón está deshabilitado, no hace nada.
    }
});

document.getElementById('amigo').focus();
//Funcion para agregar un amigo
function agregarAmigo() {
    let nombre = document.getElementById('amigo').value.trim();
    if (nombre === '') {
        alert('Ingresa un nombre');
        return;
    }
    if (amigos.includes(nombre)) {
        alert('El amigo ya está en la lista');
        limpiarCampo();
        document.getElementById('amigo').focus();
        return;
    }
    if (numeroDeAmigos >= numeroMaximoDeAmigos) {
        alert('Has alcanzado el número máximo de amigos');
        limpiarCampo();
        return;
    }

    //Agregar el nombre a la lista de amigos
    amigos.push(nombre);
    //Actualizar el número de amigos
    numeroDeAmigos++;
    //Mensajes de instrucciones
    mensajes();
    //Limpiar el campo de texto
    limpiarCampo();
    if (!document.getElementById('amigo').disabled) {
    document.getElementById('amigo').focus();
    }
    desactivarCampoYBoton();
    mostrarAmigos();
}

    //desactivar campo de texto y botón de agregar
    function desactivarCampoYBoton() {
        if (numeroDeAmigos >= numeroMaximoDeAmigos) {
        document.querySelector("#amigo").disabled = true;
        document.querySelector("#agregar").disabled = true;
        // Habilita y enfoca el botón sortear
        botonSortear.disabled = false;
        botonSortear.focus();
        alert(`Este es el último amigo que puedes agregar, haz alcanzado tu número máximo de amigos que es: ${numeroMaximoDeAmigos}`);
        return;
    }   
        
}

//Funcion para limpiar el campo de texto
function limpiarCampo() {
    document.querySelector('#amigo').value = '';
}

//Funcion sortear amigos
function sortearAmigo() {
    //Debemos contar con el número maximo de amigos para poder sortear
    if (amigos.length < numeroMaximoDeAmigos) {
        alert('Debes agregar al menos 5 amigos para sortear');
        return;
    }
    //Generar un número aleatorio entre 0 y el número de amigos
    let amigoSecreto = Math.floor(Math.random() * amigos.length);
    //Seleccionar un amigo al azar
    let amigoSeleccionado = amigos[amigoSecreto];
    //Obtener el elemento con id 'resultado'
    let resultado = document.getElementById('resultado');
    // Mostrar el resultado en el elemento con id 'resultado'
    resultado.textContent = `Tu amigo secreto es: ${amigoSeleccionado}`;
    //Cambiar el texto del botón a "Nuevo sorteo"
    botonSortear.textContent = 'Nuevo sorteo';
    botonSortear.onclick = reiniciarSorteo;
}

//Funcion para reiniciar el sorteo
function reiniciarSorteo() {
    amigos = [];
    numeroDeAmigos = 0;
    document.getElementById('amigo').disabled = false;
    document.getElementById('agregar').disabled = false;
    document.getElementById('amigo').value = '';
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').textContent = '';
    document.getElementById('instrucciones').textContent = 'Digite el nombre de sus amigos';
   // Restaura el contenido original (texto e imagen) del botón
    botonSortear.innerHTML = botonSortearOriginal;
    botonSortear.onclick = sortearAmigo;
}

//Funcion para mostrar la lista de amigos
function mostrarAmigos() {
    let listaNombreAmigos = document.getElementById('listaAmigos');
    listaNombreAmigos.innerHTML = '';
    amigos.forEach((amigos, index) => {
        let nuevoElemento = document.createElement('li');
        nuevoElemento.textContent = `${index + 1}. ${amigos}`;
        listaNombreAmigos.appendChild(nuevoElemento);
    });
}

function mensajes(){
// Cambia el texto de la instrucción si hay al menos un amigo
    if (numeroDeAmigos === 1) {
        document.getElementById('instrucciones').textContent = 'Perfecto, sigue agregando amigos hasta completar la lista';
    }

    if (numeroDeAmigos === numeroMaximoDeAmigos - 1) {
        document.getElementById('instrucciones').textContent = 'Genial, solo puedes agregar a un amigo más';
    }

    if (numeroDeAmigos === numeroMaximoDeAmigos) {
        document.getElementById('instrucciones').textContent = 'Excelente, ahora da click para conocer a tu amigo secreto';
    }
}