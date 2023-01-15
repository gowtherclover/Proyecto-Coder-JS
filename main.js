//Creo las cards de cada objeto
const cardDiv = document.querySelector('#cards'),
    tabla = document.querySelector(".modal-carrito"),
    contador = document.getElementById("contador-carrito")
    listaProductos = document.getElementById("listaProductos")
    precioTotal= document.getElementById("total")
    finalizar = document.getElementById("comprar")
    buscar = document.getElementById("buscar")

//si hay datos en el LS se agregan al carrito si no hay nada en LS el carrito queda vacio
//let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
let carrito = [];
let arrayTipo=[];
if (localStorage.getItem("carrito")){
    carrito=JSON.parse(localStorage.getItem("carrito"));
    stock=JSON.parse(localStorage.getItem("inventario"));
}
else{
    carrito=[]
    contador.innerHTML="0"
}

function pintarDOM(stock){
    cardDiv.innerHTML=""
    stock.forEach(producto => {

    let div = document.createElement('div')
    div.className =`card col-12 col-md-3 m-1 align-items-`
    div.innerHTML =`
            <img src=${producto.img} class="card-img-top" alt="card-${producto.tipo}-${producto.color}">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${producto.tipo.toUpperCase()} ${producto.color.toUpperCase()}</h5>
                <p class="card-text"> Talle ${producto.talle}</p>
                <p class="card-text"> $${producto.precio}</p>
                <p class="card-text cantidades"> Cantidad disponible: ${producto.cantidad}</p>
                <button class="btn btn-primary"  id="btn-${producto.id}">Comprar</button>
            </div>
        </div>`;
        
    cardDiv.appendChild(div)

    //agrego al carrito haciendo click en comprar cada item
    const btn = document.getElementById(`btn-${producto.id}`)
    const pCant= document.getElementsByClassName("cantidades")

    if (arrayTipo.includes(producto.tipo)==false) {
        arrayTipo.push(producto.tipo)
    }

    if (producto.cantidad == 0) {
        botonComprar(pCant,producto,btn,stock)
    }
    
    btn.addEventListener('click',()=>{
            //pusheo el objeto al array carrito
            modificaStock(producto,pCant,btn,stock)
            cantCarrito(producto)
            //llamo a la funcion para pintar el carrito
            pintarCarrito()
            //guardo en LS
            guardarLS()
        })
    });
}
//Armo la lista de productos desplegable
function pintarLista(){

    arrayTipo.forEach(tipos => {
        let li = document.createElement('li')
        let p = document.createElement('p')
        p.className=("dropdown-item")

        li.appendChild(p)
        p.innerText=` ${tipos.toUpperCase()} `
        listaProductos.appendChild(li)

        p.addEventListener('click',()=>{
            let arrayNombres = stock.filter(elemento =>{
                return elemento.tipo.includes(tipos)
            })
            pintarDOM(arrayNombres)
        })
    });
}

//Modifico la cantidad de stock
function modificaStock(producto,pCant,btn,stock) {

    let indiceStock = stock.findIndex((el)=>{if(el.id === producto.id){return true}})

    if (indiceStock >-1) {
        stock[indiceStock].cantidad -= 1
    }

    if (stock[indiceStock].cantidad > 0) {
        pCant[indiceStock].innerText=""
        pCant[indiceStock].innerText = `Cantidad disponible: ${stock[indiceStock].cantidad}`
    }
    else{
        botonComprar(pCant,producto,btn,stock)

    }
}

function botonComprar(pCant,producto,btn,stock) {

    let indiceStock = stock.findIndex((el)=>{if(el.id === producto.id){return true}})
    console.log(stock);
    pCant[indiceStock].innerText=""
    pCant[indiceStock].classList.add("text-danger")
    pCant[indiceStock].innerText = `No hay stock disponible`

    btn.classList.remove("btn-primary")
    btn.classList.add("btn-secondary")
    btn.setAttribute("disabled","")
}


//creo el carrito con un constructor para cuando modifique la cantidad no se cambie la de todos los array
function constructorCarrito(producto) {
    this.id=producto.id
    this.tipo=producto.tipo
    this.img=producto.img
    this.color=producto.color
    this.talle=producto.talle
    this.precio=producto.precio
    this.cantCarrito=producto.cantidad
    
}

//Modifico cantidad del producto a agregar
function cantCarrito(producto) {
    //busca dentro del array carrito si el ID de carrito y de valor coinciden
    let indice = carrito.findIndex((elemento)=>{if(elemento.id === producto.id){return true}})
    // si da -1 lo pushea al carrito con 1 cantidad
    if (indice == -1) {
        carrito.push(new constructorCarrito(producto))
        carrito[carrito.length - 1].cantCarrito = 1
    }
    //si da un numero disinto de -1 que seria el indice a la cantidad actual de ese indice le suma 1
    else{
        carrito[indice].cantCarrito += 1
    }
}

//Pinto el carrito
function pintarCarrito() {
    let filas
    tabla.innerHTML="";

    for (const producto of carrito) {
        //creo una fila por cada objeto
        filas=`
            <tr>
                <th scope="row">${producto.cantCarrito}</th>
                <td><img src=${producto.img} class="card-img-top" alt="carrito-${producto.tipo}-${producto.color}" style="width:40%"></td>
                <td>${producto.tipo.toUpperCase()} ${producto.color.toUpperCase()}</td>
                <td>${producto.talle}</td>
                <td>$${producto.precio}</td>
            </tr>`;

        tabla.innerHTML += filas
    }

    contador.innerHTML="";
    let cont = 0;
    for (const key of carrito) {
        cont = cont + key.cantCarrito
    }
    contador.innerHTML=`${cont}`

    precioTotal.innerHTML="";
    const total = carrito.reduce((acumulador,elemento)=>acumulador + (elemento.precio * elemento.cantCarrito),0)
    precioTotal.innerHTML=`<p>Total $ ${total}</p>`
}
//Guarda en el LocalStorage
function guardarLS() {
    localStorage.setItem("carrito",JSON.stringify(carrito))
    localStorage.setItem("inventario",JSON.stringify(stock))
}

//Finaliza la compra
finalizar.addEventListener('click',()=>
    localStorage.removeItem("carrito"),
    localStorage.removeItem("stock"),
)

//Buscar ropa
function buscarRopa(filtro){

    let buscar = stock.filter(elemento =>{
        return elemento.tipo.includes(filtro) || elemento.color.includes(filtro)
    })

    return buscar;
}

//Recibe datos desde el input buscar
buscar.addEventListener('keyup',()=>{
    let input = buscarRopa(buscar.value)

    pintarDOM(input)
})


pintarDOM(stock)
pintarLista()
pintarCarrito()


