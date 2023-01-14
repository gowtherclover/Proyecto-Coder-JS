let stock =[
    {id:1,tipo:"calza",img:"./img/calzas/calza-amarilla.png",color:"amarilla",talle:"S",precio:5200,cantidad:5},
    {id:2,tipo:"calza",img:"./img/calzas/calza-celeste.png",color:"celeste",talle:"M",precio:5200,cantidad:5},
    {id:3,tipo:"calza",img:"./img/calzas/calza-rosa.png",color:"rosa",talle:"XL",precio:5200,cantidad:5},
    {id:4,tipo:"calza",img:"./img/calzas/calza-negra.png",color:"negra",talle:"L",precio:5200,cantidad:5},
    {id:5,tipo:"top",img:"./img/tops/conjunto-amarillo.png",color:"amarillo",talle:"S",precio:6500,cantidad:5},
    {id:6,tipo:"top",img:"./img/tops/conjunto-azul.png",color:"azul",talle:"L",precio:6500,cantidad:5},
    {id:7,tipo:"top",img:"./img/tops/conjunto-lila.png",color:"lila",talle:"XL",precio:6500,cantidad:5},
    {id:8,tipo:"top",img:"./img/tops/conjunto-rojo.png",color:"rojo",talle:"M",precio:6500,cantidad:5},
]

//Creo las cards de cada objeto
const cardDiv = document.querySelector('#cards'),
    tabla = document.querySelector(".modal-carrito"),
    contador = document.getElementById("contador-carrito")
    finalizar = document.getElementById("comprar")

//si hay datos en el LS se agregan al carrito si no hay nada en LS el carrito queda vacio
//let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
if (localStorage.getItem("carrito")){
    carrito=JSON.parse(localStorage.getItem("carrito"))
    pintarCarrito(carrito)
}
else{
    carrito=[]
    contador.innerHTML="0"
}

stock.forEach(producto => {

    let div = document.createElement('div')
    div.className =`card col-12 col-md-3 m-1`
    div.innerHTML =`
            <img src=${producto.img} class="card-img-top" alt="card-${producto.tipo}-${producto.color}">
            <div class="card-body">
                <h5 class="card-title">${producto.tipo.toUpperCase()} ${producto.color.toUpperCase()}</h5>
                <p class="card-text"> Talle ${producto.talle}</p>
                <p class="card-text"> $${producto.precio}</p>
                <p class="card-text cantidades"> Cantidad disponible: ${producto.cantidad}</p>
                <button class="btn btn-primary" id="btn-${producto.id}">Comprar</button>
            </div>
        </div>`;

    cardDiv.appendChild(div)

    //agrego al carrito haciendo click en comprar cada item
    const btn = document.getElementById(`btn-${producto.id}`)

    btn.addEventListener('click',()=>{
        console.log(producto);
        console.log("---------------------------------------------------------------");
        console.log(carrito);
        //pusheo el objeto al array carrito
        cantCarrito(producto)
        //guardo en LS
        guardarLS(carrito)
        //llamo a la funcion para pintar el carrito
        pintarCarrito(carrito)
    
    })
});
    

for (const i of stock) {
    console.log(i);
}


//Modifico cantidad del producto a agregar
function cantCarrito(valor) {
    //busca dentro del array carrito si el ID de carrito y de valor coinciden
    let indice = carrito.findIndex((elemento)=>{
        if(elemento.id === valor.id){
            return true
        }
    })
    // si da -1 lo pushea al carrito con 1 cantidad
    if (indice == -1) {
        valor.cantidad = 1
        carrito.push(valor)
    }
    //si da un numero disinto de -1 que seria el indice a la cantidad actual de ese indice le suma 1
    else{
        carrito[indice].cantidad += 1
    }

    
}

//Pinto el carrito
function pintarCarrito(array) {
    let filas
    tabla.innerHTML="";

    for (const producto of array) {
        //creo una fila por cada objeto
        filas=`
            <tr>
                <th scope="row">${producto.cantidad}</th>
                <td><img src=${producto.img} class="card-img-top" alt="carrito-${producto.tipo}-${producto.color}" style="width:40%"></td>
                <td>${producto.tipo.toUpperCase()} ${producto.color.toUpperCase()}</td>
                <td>${producto.talle}</td>
                <td>$${producto.precio}</td>
            </tr>`;

        tabla.innerHTML += filas
    }

    contador.innerHTML="";
    let cont = 0;
    for (const key of JSON.parse(localStorage.getItem("carrito"))) {
        cont = cont + key.cantidad
    }
    contador.innerHTML=`${cont}`
        
}
//Guarda en el LocalStorage
function guardarLS(carrito) {
    localStorage.setItem("carrito",JSON.stringify(carrito))
}

//Finaliza la compra
finalizar.addEventListener('click',()=>
    localStorage.removeItem("carrito"),
)





