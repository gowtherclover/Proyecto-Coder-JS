const 
    lista = document.querySelector('#lista'),
    tituloLista = document.querySelector('.titulo-lista')
    form = document.getElementById('formulario'),
    nombre = document.getElementById('firstName'),
    apellido = document.getElementById('lastName'),
    email = document.getElementById('email'),
    direccion = document.getElementById('address'),
    direccion2 = document.getElementById('address2'),
    provincia = document.getElementById('provincia'),
    CP = document.getElementById('CP'),
    metodoPago = document.getElementById('metodoPago')
    credit = document.getElementById('credit'),
    debit = document.getElementById('debit'),
    mercadoPago = document.getElementById('mercadoPago'),
    ccName = document.getElementById('ccName'),
    ccNumber = document.getElementById('ccNumber'),
    ccExpiration = document.getElementById('ccExpiration'),
    ccCVV = document.getElementById('ccCVV')

document.addEventListener('DOMContentLoaded',()=>{
        carrito=JSON.parse(localStorage.getItem('carrito'))
        pedirProvincias()
        pintarLista(carrito)
})

//busco los datos de la api de datos.gob para tener las provincias
const pedirProvincias = async () =>{
    try {
        const res = await fetch("https://apis.datos.gob.ar/georef/api/provincias?")
        data = await res.json()
        
        provincia.innerHTML=""
        provincia.innerHTML=`<option value="">Elige...</option>`
        
        data.provincias.forEach(el => {
            let lista
            lista=`
                <option>${el.nombre}</option>
                `
            provincia.innerHTML += lista
        });

    } catch (error) {
        console.log(error);
    }
}

//nombre
form[0].addEventListener('input',()=>{
    nombre.value == null || nombre.value == 0 || !isNaN(nombre.value) || /\d/.test(nombre.value) || /\W/.test(nombre.value) ? 
    (nombre.classList.remove('is-valid'),nombre.classList.add('is-invalid')):(nombre.classList.remove('is-invalid'),nombre.classList.add('is-valid'))
})
//apellido
form[1].addEventListener('input',()=>{
    apellido.value == null || apellido.value == 0 || !isNaN(apellido.value) || /\d/.test(apellido.value) || /\W/.test(apellido.value) ? 
    (apellido.classList.remove('is-valid'),apellido.classList.add('is-invalid')):(apellido.classList.remove('is-invalid'),apellido.classList.add('is-valid'))
})
//email
form[2].addEventListener('input',()=>{
    console.log((/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email.value)));
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email.value)? 
    (email.classList.remove('is-invalid'),email.classList.add('is-valid')):(email.classList.remove('is-valid'),email.classList.add('is-invalid'))
})
//direccion
form[3].addEventListener('input',()=>{
    direccion.value == null || direccion.value == 0 ? 
    (direccion.classList.remove('is-valid'),direccion.classList.add('is-invalid')):(direccion.classList.remove('is-invalid'),direccion.classList.add('is-valid'))
})
//provincia
form[5].addEventListener('change',()=>{
    indice= provincia.selectedIndex
    indice == null || indice == 0 ? (provincia.classList.remove('is-valid'),provincia.classList.add('is-invalid')):(provincia.classList.remove('is-invalid'),provincia.classList.add('is-valid'))
})
//Codigo postal
form[6].addEventListener('input',()=>{
    CP.value == null || CP.value == 0 || /\W/.test(CP.value) ? 
    (CP.classList.remove('is-valid'),CP.classList.add('is-invalid')):(CP.classList.remove('is-invalid'),CP.classList.add('is-valid'))
})
//Nombre de la tarjeta
form[10].addEventListener('input',()=>{
    ccName.value == null || ccName.value == 0 || !isNaN(ccName.value) || /\d/.test(ccName.value) || /\W/.test(ccName.value) ? 
    (ccName.classList.remove('is-valid'),ccName.classList.add('is-invalid')):(ccName.classList.remove('is-invalid'),ccName.classList.add('is-valid'))
})
//numero de la tarjeta
form[11].addEventListener('input',()=>{
    /^[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/.test(ccNumber.value) ? 
    (ccNumber.classList.remove('is-invalid'),ccNumber.classList.add('is-valid')):(ccNumber.classList.remove('is-valid'),ccNumber.classList.add('is-invalid'))
})
//vencimiento de la tarjeta
form[12].addEventListener('input',()=>{
    /^[0-9]{2}[/]?[0-9]{2}$/.test(ccExpiration.value) ? 
    (ccExpiration.classList.remove('is-invalid'),ccExpiration.classList.add('is-valid')):(ccExpiration.classList.remove('is-valid'),ccExpiration.classList.add('is-invalid'))
})
//Codigo de la tarjeta
form[13].addEventListener('input',()=>{
    /^[0-9]{3}$/.test(ccCVV.value) ? 
    (ccCVV.classList.remove('is-invalid'),ccCVV.classList.add('is-valid')):(ccCVV.classList.remove('is-valid'),ccCVV.classList.add('is-invalid'))
})

metodoPago.addEventListener('click',(e)=>{
    if (e.target.id=="credit") {
        debit.classList.remove('is-valid') 
        debit.classList.remove('is-invalid')
        mercadoPago.classList.remove('is-invalid')
        mercadoPago.classList.remove('is-valid')
        credit.classList.remove('is-invalid')
        credit.classList.add('is-valid')
    }
    if (e.target.id=="debit") {
        credit.classList.remove('is-valid')
        mercadoPago.classList.remove('is-valid')
        credit.classList.remove('is-invalid')
        mercadoPago.classList.remove('is-invalid')
        debit.classList.remove('is-invalid')
        debit.classList.add('is-valid')
    }
    if (e.target.id=="mercadoPago") {
        credit.classList.remove('is-valid')
        debit.classList.remove('is-valid')
        credit.classList.remove('is-invalid')
        debit.classList.remove('is-invalid')
        mercadoPago.classList.remove('is-invalid')
        mercadoPago.classList.add('is-valid')
    }
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    e.stopPropagation()
    validador(e)
})

//pinto la lista del carrito
function pintarLista(carrito) {
    lista.innerHTML=""
    tituloLista.innerHTML=""
    let total = 0
    let cont = 0
    carrito.forEach(el => {
        const {tipo,talle,precio,cantidad} = el
        filas= ` 
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${tipo}</h6>
                    <small class="text-muted">Talle ${talle} - ${cantidad} u.</small>
                </div>
                <span class="text-muted">$${precio}</span>
            </li>
            
        `
        lista.innerHTML += filas
        total = total + (precio*cantidad)


        cont = cont + cantidad
        tituloLista.innerHTML=`
            <span class="text-dark">Tu carrito</span>
            <span class="badge bg-dark rounded-pill" id="contador">${cont}</span>
        `
    });
    
    let suma=`
        <li class="list-group-item d-flex justify-content-between">
            <span>Total (ARG)</span>
            <strong>${total}</strong>
        </li>`
    lista.innerHTML += suma
}

//valido los datos ingresados
function validador(e){
    let validador = 0
    direccion2.classList.add('is-valid')

    Array.prototype.slice.call(form).forEach(el => {
        if (el.classList.contains('is-valid')) {
            validador +=1
        }
        else{
            el.classList.add('is-invalid')
            e.preventDefault()
            e.stopPropagation()
        }
    });
    
    if (validador == 12) {
        Swal.fire({
            position: 'center',
            title: 'Compra Finalizada',
            text:'Se le enviará la factura al mail',
            icon: 'success',
            showConfirmButton: false,
            timer: 3500
        })
        //Redireccionamiento tras 3 segundos
        setTimeout( function() { 
            form.reset()
            localStorage.removeItem('carrito')
            window.location.href = "./index.html"; 
        }, 3600 )
        
    }
    else{
        Toastify({
            avatar: "./img/tilde-rojo.png",
            text: "Dato inválido en el formulario",
            duration: 3000,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
                color:"#fff",
                background: "black",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    }

    
}


    /* valor = document.getElementById("campo").value;
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) 
    { return false;}

    if (input.value.trim()=== "") {
        e.preventDefault()
        e.stopPropagation()
        form.classList.add('was-validated')
    } */

// Example starter JavaScript for disabling form submissions if there are invalid fields
/* (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    //arma un array con todos los datos de form y los itera con for each
    Array.prototype.slice.call(forms).forEach(
        function (form) {
            form.addEventListener('submit', event =>{
                if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false) //el false es para el orden de propagacion
        }
    )
})() */