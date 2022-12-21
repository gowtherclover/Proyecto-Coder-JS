let usuario = 0

let stock =[

    {remera:[
        {tipo:"remera",color:"azul",talle:"L",precio:3500,cantidad:5},
        {tipo:"remera",color:"rojo",talle:"L",precio:3500,cantidad:5},
        {tipo:"remera",color:"negro",talle:"XL",precio:3500,cantidad:5},
        {tipo:"remera",color:"negro",talle:"M",precio:3500,cantidad:5},
    ]},
    {buzo:[
        {tipo:"buzo",color:"azul",talle:"L",precio:5200,cantidad:5},
        {tipo:"buzo",color:"rojo",talle:"L",precio:5200,cantidad:5},
        {tipo:"buzo",color:"negro",talle:"XL",precio:5200,cantidad:5},
        {tipo:"buzo",color:"negro",talle:"M",precio:5200,cantidad:5},
    ]},
    {jean:[
        {tipo:"jean",color:"azul",talle:"36",precio:6500,cantidad:5},
        {tipo:"jean",color:"rojo",talle:"50",precio:6500,cantidad:5},
        {tipo:"jean",color:"negro",talle:"48",precio:6500,cantidad:5},
        {tipo:"jean",color:"negro",talle:"44",precio:6500,cantidad:5},
    ]}
]

let total = 0

let op=true
let i = 1
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
                            while (true) {
                                let precio1 = parseFloat(prompt("Ingrese el valor para las remeras \n Valor actual $" + precioReme))
            
                                if(!isNaN(precio1)){
                                    precioReme = precio1
                                    console.log("Nuevo valor de las remeras $" + precioReme)
                                    break
                                }
                                else{
                                    console.log("El dato ingresado no es un numero")
                                    continue
                                }
                            }

                            break;

                        case 2:
                            while (true) {
                                let precio2 = parseFloat(prompt("Ingrese el valor para los buzos \n Valor actual $" + precioBuzos))
            
                                if(!isNaN(precio2)){
                                    precioBuzos = precio2
                                    console.log("Nuevo valor de los buzos $" + precioBuzos)
                                    break
                                }
                                else{
                                    console.log("El dato ingresado no es un numero")
                                    continue
                                }
                            }
                            
                            break;
                        
                        case 3:
                            while (true) {
                                let precio3 = parseFloat(prompt("Ingrese el valor para los jeans \n Valor actual $" + precioJeans))
            
                                if(!isNaN(precio3)){
                                    precioJeans = precio3
                                    console.log("Nuevo valor de los jeans $" + precioJeans)
                                    break
                                }
                                else{
                                    console.log("El dato ingresado no es un numero")
                                    continue
                                }
                            }    

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
        let stock = parseInt(prompt("Que desea comprar: \n 1. Remeras valor por unidad $" + precioReme +"\n 2. Buzos valor por unidad $"+precioBuzos +"\n 3. Jeans valor por unidad $"+precioJeans +"\n------------ \n 4. Consultar stock actual \n 5. Salir \n------------ \nTotal $" + total + "\n 6. Finalizar compra"))
    
        switch (stock) {
            case 1:
                while (true) {
                    let compraReme = prompt("Ingrese la cantidad de remeras a comprar \nStock actual "+remeras+"\nPara salir escriba 'volver' ")

                    if(!isNaN(compraReme) && compraReme<= remeras){
                        remeras = remeras - compraReme
                        console.log("Cantidad de remeras a comprar = " + compraReme + "\nTotal $"+compraReme * precioReme)
                        total = total + compraReme * precioReme
                        break
                    }
                    else if (compraReme == "volver"){
                        break   
                    }
                    
                    else{
                        console.log("El dato ingresado no es un numero o es mayor al stock disponible actual (cantidad "+remeras+")")
                        continue
                    }
                }
                
                break;
            case 2:
                while (true) {
                    let compraBuzos = prompt("Ingrese la cantidad de buzos a comprar \nStock actual "+buzos+"\nPara salir escriba 'volver' ")

                    if(!isNaN(compraBuzos) && compraBuzos<= buzos){
                        buzos = buzos - compraBuzos
                        console.log("Cantidad de buzos a comprar = " + compraBuzos + "\nTotal $"+compraBuzos * precioBuzos)
                        total = total + compraBuzos * precioBuzos
                        break
                    }
                    else if (compraBuzos == "volver"){
                        break   
                    }
                    else{
                        console.log("El dato ingresado no es un numero o es mayor al stock disponible actual (cantidad "+buzos+")")
                        continue
                    }
                }
                break;
            case 3:
                while (true) {
                    let compraJeans = prompt("Ingrese la cantidad de jeans a comprar \nStock actual "+jeans+"\nPara salir escriba 'volver' ")

                    if(!isNaN(compraJeans) && compraJeans<= jeans){
                        jeans = jeans - compraJeans
                        console.log("Cantidad de jeans a comprar = " + compraJeans+ "\nTotal $"+compraJeans * precioJeans)
                        total = total + compraJeans * precioJeans
                        break
                    }
                    else if (compraJeans == "volver"){
                        break   
                    }
                    else{
                        console.log("El dato ingresado no es un numero o es mayor al stock disponible actual (cantidad "+jeans+")")
                        continue
                    }
                }
                break
            case 4:
                console.log("Cantidades: \n Remeras " + remeras +"\n Buzos "+ buzos + "\n Jeans "+ jeans);
                break
            case 5:
                validador=false;
                break
            case 6:
                if (total != 0) {
                    console.log("Usted gasto un total de $" + total);
                    total = 0
                    break
                }
                else{
                    console.log("No tiene articulos para comprar");
                }
                break
            default:
                console.log("Opcion incorrecta");
                break;
        } 
    
    }while (validador == true);

}

function agregar(ropa) {
    while (true) {
        let agregarRopa = parseInt(prompt("Ingrese la cantidad que quiere almacenar en " + ropa))

        let posicion
        let item
        if (ropa=="remera") {
            posicion=0
            for (const key in stock[0]) {
                item = key
            }
        }
        else if (ropa=="buzo") {
            posicion=1
            for (const key in stock[1]) {
                item = key
            }
        }    
        else if (ropa=="jean") {
            posicion=2
            for (const key in stock[2]) {
                item = key
            }
        }

        if(!isNaN(agregarRopa) && agregarRopa>0){
            console.log(item);
            for (let i = 1; i <= agregarRopa; i++) {
                let talle = prompt("Ingrese el TALLE de "+ropa +": ")
                let color= prompt("Ingrese el COLOR de "+ropa +": ")
                let precio= prompt("Ingrese el PRECIO de "+ropa +": ")
                let cantidad= prompt("Cantidad de "+ropa+" iguales: ")
                
                stock[posicion] = new construir (ropa,
                    color,
                    talle,
                    precio,
                    cantidad)

                /* stock[posicion].item.push({
                    id:stock[posicion].item.length+1,
                    tipo:ropa,
                    color:color,
                    talle:talle,
                    precio:precio,
                    cantidad:cantidad
                })
                console.log(stock[posicion]); */
            }

            break
        }
        else{
            console.log("El dato ingresado no es un numero o es menor a cero")
            continue
        }
    }
}
function mostrarStock(){
    let R = 0
    let B = 0
    let J = 0
    for (let i = 0; i < stock.length; i++) {
        
        for (const key in stock[i]) {
            for (let index = 0; index < stock[i][key].length; index++) {
                if (stock[i][key][index].tipo=="remera") {
                    R=R+stock[i][key][index].cantidad
                }
                if (stock[i][key][index].tipo=="buzo") {
                    B=B+stock[i][key][index].cantidad
                }
                if (stock[i][key][index].tipo=="jean") {
                    J=J+stock[i][key][index].cantidad
                }
            }
        }
    }
    console.log(`Cantidades: \n Remeras ${R} \n Buzos ${B} \n Jeans ${J}`);
}
//constructora
function construir(tipo,color,talle,precio,cantidad){
    this.tipo= tipo
    this.color =color
    this.talle=talle
    this.precio=precio
    this.cantidad=cantidad
    console.log(stock);
}