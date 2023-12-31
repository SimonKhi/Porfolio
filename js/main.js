const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const mensaje = document.getElementById('mensaje');
const btn = document.getElementById('enviar');
emailjs.init('bm5GA4zxbDd8lc9Hj');

// Expresiones para validar los campos del formulario
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,50}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    mensaje: /^./
};

const campos = {
    nombre: false,
    email: false,
    mensaje: false
};

// Comprobar el contenido del formulario con respecto a la expresión de cada input
const validarFormulario = (e) => {
    switch(e.target.name){
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case 'email':
            validarCampo(expresiones.correo, e.target, 'email');
        break;
        case 'mensaje':
            validarCampo(expresiones.mensaje, e.target, 'mensaje');
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`campo_${campo}`).classList.remove('incorrecto');
        document.querySelector(`#grupo_${campo} .input_error`).classList.remove('mensaje_error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`campo_${campo}`).classList.add('incorrecto');
        document.querySelector(`#grupo_${campo} .input_error`).classList.add('mensaje_error-activo');
        campos[campo] = false;
    }
}

// Realizar un evento cada vez que se use un input
nombre.addEventListener('keyup', validarFormulario); // Se ejecuta cada vez que se presiona una tecla en el input nombre
nombre.addEventListener('blur', validarFormulario); // Se ejecuta cuando nos salimos del input
email.addEventListener('keyup', validarFormulario);
email.addEventListener('blur', validarFormulario);
mensaje.addEventListener('keyup', validarFormulario);
mensaje.addEventListener('blur', validarFormulario);

function onSubmit(token) {
    if(token){
        btn.value = 'Enviando...';
        const serviceID = 'default_service';
        const templateID = 'template_9ef4fi7';
        emailjs.sendForm(serviceID, templateID, formulario).then(() => {
            btn.value = 'Mensaje Enviado';
            setTimeout(() => {btn.value = "Enviar"}, 5000);
            formulario.reset();
        }, (err) => {
            btn.value = 'Enviar';
            alert(JSON.stringify(err));
            console.log(err);
        });
    }
    grecaptcha.reset();
}

// Acción a ejecutar cuando se haga submit al formulario
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    // Cuando todos los campos esten llenos se despliega recaptcha
    if(campos.nombre && campos.email && campos.mensaje){ 
        grecaptcha.execute();
    }
});