const cardDiv = document.getElementById('cards'),
    tabla = document.querySelector(".modal-carrito"),
    contador = document.getElementById("contador-carrito"),
    listaProductos = document.getElementById("listaProductos"),
    precioTotal= document.getElementById("total"),
    finalizar = document.getElementById("comprar"),
    vaciar = document.getElementById("vaciar"),
    buscar = document.getElementById("buscar"),
    pCant= document.getElementsByClassName("cantidades")
    copyright = document.querySelector('.copyright')

let carrito = []
let stock = []

//cargo contenido al recargar el HTML
document.addEventListener('DOMContentLoaded',()=>{
    PedirStock()
    //si existe info en LS carrito, carrito va a ser igual al LS
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

//escucho los click dentro de la card que se arma dinamicamente
cardDiv.addEventListener('click',(e)=>{
    agregoAlCarrito(e)
})

//si se hace click en el boton vaciar se borra el carrito y se pinta
vaciar.addEventListener('click',()=>{
    carrito=[]
    pintarCarrito()
})

//si hago click en btn sumar o restar llamo a la funcion para cambiar las cantidades
tabla.addEventListener('click',(e)=>{
    btnSumarRestar (e)
})

//Recibe datos desde el input buscar
buscar.addEventListener('keyup',()=>{
    let input = buscarRopa(buscar.value)

    pintarDOM(input)
})

//Finaliza la compra
finalizar.addEventListener('click',()=>{
    //si existe info en LS carrito enviar a otra pagina
    if (carrito.length>0) {
        Swal.fire({
            title: 'Redireccionando',
            icon: 'info',
            showConfirmButton: false,
            timer: 2500
        })
        //Redireccionamiento tras 3 segundos
        setTimeout( function() { 
            window.location.href = "./datos-de-pago.html"; 
        }, 3000 )
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos para comprar',
            showConfirmButton: false,
            timer: 2500
        })
    }
    
    

})

//hago la consulta a la base local data.json
const PedirStock = async () =>{
    try {
        const res = await fetch("./data.json")
        stock = await res.json()
        pintarLista(stock)

        pintarDOM(stock)
    } catch (error) {
        console.log(error);
    }
}

//Pinto el DOM
function pintarDOM(stock){
    cardDiv.innerHTML=""
    stock.forEach(producto => {
    
    const {img,tipo,color,talle,precio,id} = producto

    let div = document.createElement('div')
    div.className =`card col-5 col-md-3 m-1 col-lg-2 shadow p-3 mb-5 bg-body rounded`
    div.innerHTML =`
            <img src=${img} class="card-img-top" alt="card-${tipo}-${color}">
            <div class="card-body d-flex flex-column justify-content-between align-items-center text-center">
                <h5 class="card-title tipo">${tipo.toUpperCase()} ${color.toUpperCase()}</h5>
                <p class="card-text talle">Talle ${talle}</p>
                <p class="card-text precio">$${precio}</p>
                <button class="btn btn-dark" id="${id}">Comprar</button>
            </div>
        </div>`;
        
    cardDiv.appendChild(div)
    
    });

    copyright.innerHTML = `© ${(new Date).getFullYear()} Copyright: <a class="text-reset fw-bold" href="#">Aguilar Enzo</a>`
}

//Agrergo al carrito segun el click
function agregoAlCarrito(e) {
    if (e.target.classList.contains('btn-dark')) {
        //el parentElement x2 lee todo a lo que se encuentre en el cardDiv
        arrayCarrito(e.target.parentElement.parentElement)

        //modificaStock(e.target.id)
    }
    e.stopPropagation()
}

//Voy armanado el array de carrito
function arrayCarrito(item){

    //armo el objeto de producto para agregarlo a carrito
    const producto = {
        id: item.querySelector('.btn-dark').id,
        tipo: item.querySelector('.tipo').textContent,
        precio: item.querySelector('.precio').textContent.slice(1),
        talle: item.querySelector('.talle').textContent.slice(6),
        cantidad: 1,
        img: item.querySelector('img').getAttribute('src')
    }

    //busca dentro del array carrito si el ID de carrito y de producto coinciden
    let indice = carrito.findIndex((elemento)=>{if(elemento.id === producto.id){return true}})
    
    // si da -1 lo pushea al carrito con 1 cantidad
    if (indice == -1) {
        carrito.push(producto)
    }
    //si da un numero disinto de -1 que seria el indice a la cantidad actual de ese indice le suma 1
    else{
        carrito[indice].cantidad += 1
    }

    Toastify({
        avatar: "./img/tilde-verde.png",
        text: "Producto agregado",
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

    pintarCarrito()
}

function pintarCarrito(){
    tabla.innerHTML="";
    Object.values(carrito).forEach(producto =>{

        let filas
        const {cantidad,img,tipo,talle,precio,id} = producto
        //creo una fila por cada objeto
        filas=`
            <tr>
                <th scope="row" class="d-flex flex-column align-items-center">
                    <img src=${img} class="card-img-top tabla_img" alt="carrito-${tipo}">
                    <div class="d-flex justify-content-around w-50 align-items-center">
                        <button class="btn btn-body p-1 restar" id="${id}">➖</button>
                        <p class="pt-3" id="cantidad-${id}">${cantidad}</p>
                        <button class="btn btn-body p-1 sumar" id="${id}">➕</button>
                    </div>
                </th>
                <td colspan="2">
                    ${tipo}
                    <br>
                    Talle: ${talle}
                </td>
                <td>$${precio}</td>
            </tr>
            `;

        tabla.innerHTML += filas
    })

    contadorYtotal()
}

function contadorYtotal() {
    contador.innerHTML="";
    let cont = 0;
    //uso el object.values para obtener los valores y poder usarlos
    for (const key of Object.values(carrito)) {
        cont = cont + key.cantidad
    }
    contador.innerHTML=`${cont}`

    precioTotal.innerHTML="";
    if (Object.values(carrito).length>0) {
        const total = Object.values(carrito).reduce((acumulador,elemento)=>acumulador + (elemento.precio * elemento.cantidad),0)
        precioTotal.innerHTML=`<p>Total $ ${total}</p>`
    }

    localStorage.setItem('carrito',JSON.stringify(carrito))
}

//sumo o resto cantidades
function btnSumarRestar(e){
    let indice = carrito.findIndex((elemento)=>{if(elemento.id === e.target.id){return true}})
    const cantidad = document.getElementById(`cantidad-${e.target.id}`)
    //sumo cantidades
    if (e.target.classList.contains('sumar')) {
        carrito[indice].cantidad += 1
        cantidad.textContent=""
        cantidad.textContent=`${carrito[indice].cantidad}`
        contadorYtotal()
    }
    //resto cantidades
    if (e.target.classList.contains('restar')) {
        carrito[indice].cantidad -= 1
        if (carrito[indice].cantidad === 0) {
            //elimino el producto donde coincida el indice
            carrito.splice(indice,1)
            pintarCarrito()
        }
        else{
            cantidad.textContent=""
            cantidad.textContent=`${carrito[indice].cantidad}`
            contadorYtotal()
        }
    }

    e.stopPropagation()
}

//Armo la lista de productos desplegable
function pintarLista(stock){
    let arrayTipo =[]

    stock.forEach(el => {
        //si en array tipo NO existe algun tipo lo pusheo si existe pasa de largo
        if (arrayTipo.includes(el.tipo)==false) {
            arrayTipo.push(el.tipo)
        }    
    });
    
    arrayTipo.forEach(tipos => {
        let li = document.createElement('li')
        let p = document.createElement('p')
        p.className=("dropdown-item")

        li.appendChild(p)
        p.innerText=` ${tipos.toUpperCase()} `
        listaProductos.appendChild(li)

        p.addEventListener('click',()=>{
            //armo un array nuevo filtrandolo por tipos
            let arrayNombres = stock.filter(elemento =>{
                return elemento.tipo.includes(tipos)
            })
            pintarDOM(arrayNombres)
        })
    });
}

//Buscar ropa
function buscarRopa(filtro){
    
    let buscar = stock.filter(elemento =>{
        return elemento.tipo.includes(filtro.toLowerCase()) || elemento.color.includes(filtro.toLowerCase()) || elemento.talle.includes(filtro.toUpperCase())
    })

    return buscar;
}