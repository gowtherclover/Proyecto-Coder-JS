let usuario = 0

let stock =[
    {tipo:"remera",color:"azul",talle:"L",precio:3500,cantidad:5},
    {tipo:"remera",color:"rojo",talle:"L",precio:3500,cantidad:5},
    {tipo:"remera",color:"negro",talle:"XL",precio:3500,cantidad:5},
    {tipo:"remera",color:"negro",talle:"M",precio:3500,cantidad:5},
    {tipo:"buzo",color:"azul",talle:"L",precio:5200,cantidad:5},
    {tipo:"buzo",color:"rojo",talle:"L",precio:5200,cantidad:5},
    {tipo:"buzo",color:"negro",talle:"XL",precio:5200,cantidad:5},
    {tipo:"buzo",color:"negro",talle:"M",precio:5200,cantidad:5},
    {tipo:"jean",color:"azul",talle:"36",precio:6500,cantidad:5},
    {tipo:"jean",color:"rojo",talle:"50",precio:6500,cantidad:5},
    {tipo:"jean",color:"negro",talle:"48",precio:6500,cantidad:5},
    {tipo:"jean",color:"negro",talle:"44",precio:6500,cantidad:5},
]
/* for (const key of stock) {
    console.log((key.tipo[0]).toUpperCase()+key.tipo.slice(1));
}

for (const iterador of stock.filter(clave=>clave.tipo=="buzo")) {
        console.log(iterador);
}
console.log(stock.filter(clave=>clave.tipo=="buzo"));
 */

let total = 0

let op=true
let i = 1
//login de admin o cliente
do {
    usuario = parseInt(prompt("Seleccione el tipo de inicio de sesion \n 1. Admin \n 2. Cliente \n 3. Salir"));

    switch (usuario) {
        case 1:
            console.log("Ingreso como Admin");
            console.log("Puede ingresar stock o modificar precios");
            admin()
            break;
        
        case 2:
            console.log("Ingreso como Cliente");
            console.log("Puede comprar lo disponible en stock");
            cliente()
            break;

        case 3:
            console.log("Saliendo del menu");
            op=false
            break;
    
        default:
            console.log("Dato incorrecto, intentos restantes " + i + " de 3");
            i++
            if (i>3) {
                op=false
                break
            }
            
            break;
    }
}while(op==true)

function admin() {
    let validador = true
    do {
        let stock = parseInt(prompt("A que unidad desea agregarle cantidad: \n 1. Remeras \n 2. Buzos \n 3. Jeans \n------------ \n 4. Consultar stock actual \n 5. Modificar precios \n 6. Salir"))
    
        switch (stock) {
            //cantidad de remeras
            case 1:
                agregar("remera")
                
                break;
            //cantidad de buzos
            case 2:
                agregar("buzo")

                break;
            //cantidad de jeans
            case 3:
                agregar("jean")

                break
            //cantidades totales
            case 4:
                mostrarStock()

                break

            //modificacion de precios
            case 5:
                let valida=true
                    do {
                        let precios=parseInt(prompt("A que unidad desea modificarle su valor \n 1. Remeras \n 2. Buzos \n 3. Jeans \n 4. Volver atras"))
                        
                        switch (precios) {
                            case 1:

                                modificarPrecio("remera")

                                break;

                            case 2:
                                modificarPrecio("buzo")
                                
                                break;
                            
                            case 3:
                                modificarPrecio("jean")

                                break;
                            
                            case 4:
                                valida=false
                                break
                                
                            default:
                                console.log("Opcion incorrecta");
                                break;
                        }
                        
                    }while (valida==true)

                break

            case 6:
                validador=false;
                break

            default:
                console.log("Opcion incorrecta");
                break;
        } 
    
    }while (validador == true);
}

function cliente() {
    let validador = true
    do {
        let stock = parseInt(prompt(`Que desea comprar: \n 1. Remeras\n 2. Buzos\n 3. Jeans \n------------ \n 4. Consultar stock actual \n 5. Salir \n------------ \nTotal $${total}\n 6. Finalizar compra`))
    
        switch (stock) {
            case 1:
                modificaCantidad("remera")                
                break;
            case 2:
                modificaCantidad("buzo")

                break;
            case 3:
                modificaCantidad("jean")

                break
            case 4:
                mostrarStock()
                break
            case 5:
                validador=false;
                break
            case 6:
                if (total != 0) {
                    alert("Usted gasto un total de $" + total);
                    total = 0
                    break
                }
                else{
                    alert("No tiene articulos para comprar");
                }
                break
            default:
                console.log("Opcion incorrecta");
                break;
        } 
    
    }while (validador == true);

}
//agrega objetos
function agregar(ropa) {
    while (true) {
        let agregarRopa = parseInt(prompt("Ingrese la cantidad que quiere almacenar en " + ropa))

        if(!isNaN(agregarRopa) && agregarRopa>0){

            for (let i = 1; i <= agregarRopa; i++) {
                let talle = prompt("Ingrese el TALLE de "+ropa +": ")
                let color= prompt("Ingrese el COLOR de "+ropa +": ")
                let precio= parseInt (prompt(`Ingrese el PRECIO de ${ropa} ${color}:`))
                let cantidad= parseInt (prompt(`Cantidad de ${ropa} ${color} iguales: `))
                
                let agrega = new construir (ropa,
                    color,
                    talle,
                    precio,
                    cantidad)
                
                stock.push(agrega)
            }

            break
        }
        else{
            console.log("El dato ingresado no es un numero o es menor a cero")
            continue
        }
    }
}
//muestra stock total por item
function mostrarStock(){
    let R = 0
    let B = 0
    let J = 0
    let txtR= ""
    let txtB= ""
    let txtJ= ""
    for (const key of stock) {
        if (key.tipo=="remera") {
            txtR= txtR+`\nColor: ${key.color} Talle: ${key.talle} Precio: $${key.precio} Cantidad: ${key.cantidad}`
            R = R + key.cantidad
        }
        else if(key.tipo=="buzo"){
            txtB=txtB+`\nColor: ${key.color} Talle: ${key.talle} Precio: $${key.precio} Cantidad: ${key.cantidad}`
            B = B +key.cantidad
        }
        else if(key.tipo=="jean"){
            txtJ=txtJ+`\nColor: ${key.color} Talle: ${key.talle} Precio: $${key.precio} Cantidad: ${key.cantidad}`
            J = J + key.cantidad
        }
    }
    alert(`Cantidades:\n Remeras ${R} ${txtR} --------------------------------- \n Buzos ${B} ${txtB} ---------------------------------\n Jeans ${J} ${txtJ}`);
}
//constructora
function construir(tipo,color,talle,precio,cantidad){
    this.tipo= tipo
    this.color =color
    this.talle=talle
    this.precio=precio
    this.cantidad=cantidad
}
//Modifica el precio
function modificarPrecio(ropa){
    let txt =""
    let i=0
    //armo el texto para mostrar en el prompt
    for (const key of stock) {
        
        if (key.tipo=="remera" && key.tipo==ropa) {
            i++
            txt= txt+`\nItem nº${i} ${(key.tipo[0]).toUpperCase()+key.tipo.slice(1)} Color: ${key.color} Talle: ${key.talle} Precio: $${key.precio} Cantidad: ${key.cantidad}`
        }
        else if(key.tipo=="buzo" && key.tipo==ropa){
            i++
            txt=txt+`\nItem nº${i} ${(key.tipo[0]).toUpperCase()+key.tipo.slice(1)} Color: ${key.color} Talle: ${key.talle} Precio: $${key.precio} Cantidad: ${key.cantidad}`
        }
        else if(key.tipo=="jean" && key.tipo==ropa){
            i++
            txt=txt+`\nItem nº${i} ${(key.tipo[0]).toUpperCase()+key.tipo.slice(1)} Color: ${key.color} Talle: ${key.talle} Precio: $${key.precio} Cantidad: ${key.cantidad}`
        }
    }
    
    while (true) {
        let pregunta =parseInt(prompt(`A que item desea cambiarle su valor: \n ${txt}`))
        if(!isNaN(pregunta) && pregunta<=i){
            arr=stock.filter(clave=>clave.tipo==ropa)
            arrFijo=arr[pregunta-1]
            while(true){
                let precio1 = parseFloat(prompt(`Ingrese el valor para ${arrFijo.tipo} ${arrFijo.color} ${arrFijo.talle} \n Valor actual $${arrFijo.precio} `))
                
                if(!isNaN(precio1) && precio1>0){
                    for (const iterador of stock.filter(clave=>clave.tipo==ropa)) {
                        if (arrFijo==iterador) {
                            iterador.precio=precio1
                            console.log(`Nuevo valor de ${iterador.tipo} color ${iterador.color} talle ${iterador.talle} es ${iterador.precio}`)
                            break
                        }
                    }
                    break
                }
                else{
                    console.log("El dato ingresado no es un numero o es menor a cero")
                    continue
                }
            }
        }
        else{
            console.log("El dato ingresado no es un numero o no esta dentro del rango de items")
            continue
        }
        break
    }
}
//Sacar cantidades
function modificaCantidad(ropa){
    let txt =""
    let i=0
    //armo el texto para mostrar en el prompt
    for (const key of stock) {
        
        if (key.tipo=="remera" && key.tipo==ropa) {
            i++
            txt= txt+`\nItem nº${i} ${(key.tipo[0]).toUpperCase()+key.tipo.slice(1)} Color: ${key.color} Talle: ${key.talle} Precio: $${key.precio} Cantidad: ${key.cantidad}`
        }
        else if(key.tipo=="buzo" && key.tipo==ropa){
            i++
            txt=txt+`\nItem nº${i} ${(key.tipo[0]).toUpperCase()+key.tipo.slice(1)} Color: ${key.color} Talle: ${key.talle} Precio: $${key.precio} Cantidad: ${key.cantidad}`
        }
        else if(key.tipo=="jean" && key.tipo==ropa){
            i++
            txt=txt+`\nItem nº${i} ${(key.tipo[0]).toUpperCase()+key.tipo.slice(1)} Color: ${key.color} Talle: ${key.talle} Precio: $${key.precio} Cantidad: ${key.cantidad}`
        }
    }
    
    while (true) {
        let pregunta =parseInt(prompt(`Que item desea comprar: \n ${txt}`))
        arr=stock.filter(clave=>clave.tipo==ropa)

        if(!isNaN(pregunta) && pregunta<=i && arr[pregunta-1].cantidad>0){
            arrFijo=arr[pregunta-1]
            while(true){
                let cantidad = parseInt(prompt(`Cuantos desea comprar de ${arrFijo.tipo} ${arrFijo.color} talle ${arrFijo.talle} \nCantidad actual: ${arrFijo.cantidad}`))
                
                if(!isNaN(cantidad) && cantidad>0 && cantidad<=arr[pregunta-1].cantidad){
                    //itera en el arreglo filtrado de tipo de ropa
                    for (const iterador of stock.filter(clave=>clave.tipo==ropa)) {
                        //si el iterador es igual al arrFijo entra en la condicion
                        if (arrFijo==iterador) {
                            iterador.cantidad=iterador.cantidad - cantidad
                            total=total + (cantidad * iterador.precio)
                            alert(`Usted agregó al carrito ${cantidad} ${iterador.tipo} ${iterador.color} talle ${iterador.talle} por el precio de $${iterador.precio} c/u`)
                            break
                        }
                    }
                    break
                }
                else{
                    console.log("El dato ingresado no es un numero o es menor a cero es superior al stock")
                    continue
                }
            }
        }
        else{
            console.log("El dato ingresado no es un numero o no esta dentro del rango de items o no hay stock disponible")
            continue
        }
        break
    }
}