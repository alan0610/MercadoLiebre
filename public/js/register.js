//validaciones del Register
window.addEventListener('load',()=>{ //Problema en esta linea
    let errores = []
    const formulario = document.querySelector("form.reg-form");
    const nombre_apellido = document.querySelector(".nombre_apellido");
    const email = document.querySelector(".email");
    const nombre_usuario = document.querySelector(".nombre_usuario");
    const contraseña = document.querySelector(".contraseña");
    const images = document.querySelector(".file");
    formulario.addEventListener('submit', function (e) { //Problema en esta linea(no se pueden leer las propiedadess)
    if(nombre_apellido.value == ''){
        errores.push('El nombre no puede estar vacío');
        
    }else if(nombre_apellido.value.length < 2){
        errores.push('El nombre debe tener al menos 2 caracteres');
        
    };    
    if(email.value == ''){
        errores.push('El e-mail no puede estar vacio');
    }else if(!campoEmail.value.includes('@')){
        errores.push('El email tiene que tener un formato válido')
    }
    if (images.value == '') {
        errores.push('Debe seleccionar una imagen para el usuario');
    };
    if(contraseña.value == ''){
        errores.push('La contraseña no puede estar vacía')
    }else if(contraseña.value.length < 8){
        errores.push('La contraseña debe tener al menos 8 caracteres')
    }else{
        if(!minuscula.test(contraseña.value)) errores.push('La contraseña debe contener al menos una minúscula')
        if(!mayuscula.test(contraseña.value)) errores.push('La contraseña debe contener al menos una mayúscula')
        if(!numero.test(contraseña.value)) errores.push('La contraseña debe contener al menos un número')
        if(!caracterEspecial.test(contraseña.value)) errores.push('La contraseña debe contener al menos un caracter especial')
    }

    if (errores.length > 0) {
        e.preventDefault();
        let ulErrors = document.querySelector('.errors');
        ulErrors.classList.add('error-msg');
        ulErrors.innerHTML = '';
        for (let i = 0; i < errores.length; i++) {
            ulErrors.innerHTML += `<li >  ${errores[i]} </li>`;
        };
    }
}) ;
})
