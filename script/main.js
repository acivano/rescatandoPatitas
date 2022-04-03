function solicitudDatos() {
    let msg = 'Ingrese su nombre.';
    let nombre = prompt(msg);
    nombre = validaEntrada(nombre, msg);
    msg = 'Ingrese su apellido.';
    let apellido = prompt(msg);
    apellido = validaEntrada(apellido, msg);
    msg = 'Ingrese su edad.'
    let edad = parseInt(prompt(msg));
    edad = validaEdad(edad, msg);
    msg = 'Ingrese su celular.'
    let celular = prompt(msg);
    celular = validaEntrada(celular, msg);
    msg = 'Ingrese su comentario.';
    let comentario = prompt(msg);
    comentario = validaEntrada(comentario, msg);
    saludosAlUsuario(nombre, apellido, celular, comentario);
    location.replace("/index.html");
}

function saludosAlUsuario(nombre, apellido, celular, comentario){
    alert(`Hola ${nombre} ${apellido}. Hemos recibido el siguiente comentario: "${comentario}". Proximamente nos estaremos comunicando al siguiente número telefónico: ${celular} provisto por usted.`);
}

function validaEntrada(campo, msg){

    while (campo == null || campo == '') {
        campo = prompt(msg);
    }
    return campo;
}

function validaEdad(edad, msg){
    while (edad == null || edad == '' || edad < 0 || Number.isNaN(edad)) {
        if(edad < 0){
            alert('La edad no es válida.')
            edad = null;
        }
        edad = parseInt(prompt(msg));
    }
    return edad;
    
}

