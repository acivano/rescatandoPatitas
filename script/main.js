// Declaración de clases
class Producto{
    constructor(id, nombre, tipo, laboratorio, precioventa, stockdisponible, imgUrl){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.laboratorio = laboratorio;
        this.precioventa = precioventa;
        this.stockdisponible = stockdisponible;
        this.imgUrl = imgUrl;
    }
}
class ProductoCarrito{
    constructor(id, nombre, tipo, laboratorio, precioVenta, cantidad, imgUrl){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.laboratorio = laboratorio;
        this.precioVenta = precioVenta;
        this.cantidad = cantidad;
        this.imgUrl = imgUrl;
    }
}
// Armado de Productos (Momentanemente)
const producto1 = new Producto(   "0001",     'Power Comprimido Gato 2 a 3kg Perro 2,5 a 5KG',	    'Perro',     'Power',	158.25,    10   )
const producto2 = new Producto(   "0002",     'Power Comprimido Perro 10 a 20 KG Gato 6 a 12 KG',	'Gato',     'Power',	236.40,    15   )
const producto3 = new Producto(   "0003",     'Nexgard 4 a 10 KG',	'Gato',      'Nexgard',	1234.49,    0    )
const producto4 = new Producto(   "0004",     'Comfortis Gato 2,8 a 5,4 KG / Perro 4 a 9 KG',	'Gato',     'Comfortis',	250.50,    20   )
const producto5 = new Producto(   "0005",     'Bravecto Comprimido 4,5 a 10 Kg',	'Pero',      'Bravecto',	    320.00,    0   )
const producto6 = new Producto(   "0006",     'Bravecto Comprimido 20 a 40 Kg',	'Perro',     'Bravecto',	    330.00,    0   )
const producto7 = new Producto(   "0007",     'Frontline Plus 2 a 10 KG x 1 pip.',	'Gato',      'Frontline',	360.00,    15   )
const producto8 = new Producto(   "0008",     'Bayer Advantix 4 a 10 KG',	    'Perro',     'Bayer',	1100.00,    50      )
const producto9 = new Producto(   "0009",     'Power Ultra 11 a 20 KG',  'Gato',      'Power',	    1020.00,    20   )
const producto10 = new Producto(  "0010",    'Bayer Advocate Perro 10 a 25 KG',	    'Perro',     'Bayer',	    1000.50,   10  )
const producto11 = new Producto(  "0011",    'Frontline Spray x 100 ML',   'Gato',      'Frontline',	610.00,   1     )

//Variables
let nodopadre = document.getElementById("contenedorPadre");
let productoarray = [];
let productoCarrito = [];
let contenedorProductos = document.getElementById("listaCarrito");
let precioTotalCarrito = document.getElementById("precioTotalCarrito");
let cantidadEnCarrito = document.getElementById("cantidadEnCarrito");
let buttonIniciarCompra = document.getElementById("iniciarCompraBtn");
let totalCarrito = 0;
//productoarray.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11);

const urlProductos = '../script/productos.json'; 
const obtenerProductos = async ()=> {
    
    try {
        let response = await fetch(urlProductos);
        productoarray = await response.json();
        completarmercado(productoarray);

    } catch (error) {
        console.log(error);
    }

}



//Carga de productos
function redondeo(numero) {
    return (Math.round((numero * 100)) / 100).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP"
    });; 
};
function completarmercado(productoarray) {
    for (const producto of productoarray) {
        if(producto.stockdisponible > 0){
            let nodo = document.createElement("div");
            nodo.className = "d-flex justify-content-center";
            nodo.innerHTML = `<div class="seccion_datos">
                                <div class="card-body d-flex flex-column align-content-center justify-content-center">
                                    <img class="img-fluid" src="${producto.imgUrl}" alt="Producto1">
                                    <p class="card-text text-center mt-1 altotexto">${producto.nombre}</p>
                                    <h3 class="montoDonacion text-center mt-1">${redondeo(producto.precioventa)}</h3>
                                    <form class="">
                                        <div class="form-floating mb-3">
                                            <input type="number" class="form-control focusColor text-center cantidadMenu" id="cantidad${producto.id}" placeholder="Cantidad" value="1" min="1" max="10" required>
                                            <label for="cantidad${producto.id}">Cantidad: </label>
                                        </div>
                                    </form>
                                    <h6 id="idProducto" class="display-none">${producto.id}</h6>
                                    <button onclick="guardar('${producto.id}')" class="botonPersonalizado mt-1">Agregar</button>
                                    
                                </div>
                            </div>`;
            nodopadre.appendChild(nodo);
        }
        
    };
}
function leerContenidoProducto(idProd){
    let id;
    let nombre;
    let tipo;
    let laboratorio;
    let cantidad;
    let precioVenta;
    let imgUrl;
    productoarray.forEach(elem => {
        if (elem.id === idProd) {   
            id = elem.id;
            nombre = elem.nombre;
            tipo = elem.tipo;
            laboratorio = elem.laboratorio;
            let cantidadProducto = `cantidad${id}`;
            cantidad = parseInt(document.getElementById(cantidadProducto).value);
            document.getElementById(cantidadProducto).value = 1;
            precioVenta = elem.precioventa;
            imgUrl = elem.imgUrl;            
        }
    });
    const productoACarrito = new ProductoCarrito(id, nombre, tipo, laboratorio, precioVenta, cantidad, imgUrl);
    agregarProducto(productoACarrito);
    
}
function agregarProducto(informacionProducto) {
    let listaNueva = [];
    if (localStorage.getItem("Productos") != null) {
        listaNueva = (JSON.parse(localStorage.getItem("Productos")));
        const existe = listaNueva.some(producto => producto.id == informacionProducto.id);
        if (existe){
            listaNueva.forEach(producto => {
                producto.id === informacionProducto.id && (producto.cantidad += parseInt(informacionProducto.cantidad));
            });
        }else{
            listaNueva.push(informacionProducto);
        };
        localStorage.setItem("Productos",JSON.stringify(listaNueva));
    } else {
        productoCarrito.push(informacionProducto);
        localStorage.setItem("Productos",JSON.stringify(productoCarrito));
    }
    Toastify({
        text: "Producto agregado con éxito",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "toastyExito",
        style: {
        background: "green",
        }
    }).showToast();
    return informacionProducto;
}
const imprimirDatos = () => {    
    blanquearCarrito();
    totalCarrito = 0;
    if (verificarStorage() != undefined){
        verificarStorage().forEach(producto => {  
            const item = document.createElement('div');
            item.classList.add('d-flex', 'justify-content-evenly', 'mb-4');
            item.innerHTML += `
                    <img class="imgCarrito" src="${producto.imgUrl}" alt="Producto1">
                        <div class="d-flex flex-column columnaNombreCarrito">
                            <p class="card-text text-start mt-1 card-text-carrito">${producto.nombre}</p>
                            <div class="d-flex flex-row justify-content-between align-items-end">
                                <p class="montoCarrito text-start mt-1 w-50">${redondeo(producto.precioVenta * producto.cantidad)}</p>
                                <div>
                                    <button class="botonPersonalizadoTrash" onclick="eliminarElementoCarrito('${producto.id}')"> <i class="bi bi-trash"></i></button> 
                                </div>   
                            </div>
                            <div class="form-floating mb-3 w-100 align-self-center">
                                <input type="number" class="form-control focusColor text-center cantidadCarrito" id="cantidadCarrito${producto.id}" placeholder="Cantidad" value="${producto.cantidad}" min="1" max="10" readonly>
                            </div>
                        </div>
            `;
            contenedorProductos.classList.remove("carritoVacio");
            contenedorProductos.appendChild(item);
            totalCarrito = totalCarrito + (producto.precioVenta * producto.cantidad);
        });  
        precioTotalCarrito.innerHTML = redondeo(totalCarrito);
        cantidadEnCarrito.innerHTML = verificarStorage().length;
        if (verificarStorage().length == 0) {
            const carritoVacio = document.createElement('div');
            carritoVacio.innerHTML = '<h5 class="text-center">No hay productos en el carrito.</h5>';
            contenedorProductos.classList.add("carritoVacio");
            contenedorProductos.appendChild(carritoVacio);
        }
    }
}
function eliminarElementoCarrito(id) {
    let listaVieja = JSON.parse(localStorage.getItem("Productos"));
    let listaFiltrada = listaVieja.filter(obj => obj.id != id);
    localStorage.setItem("Productos", JSON.stringify(listaFiltrada));
    Toastify({
        text: "Eliminado con éxito",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        className: "toastyExito",
        style: {
        background: "green",
        }
    }).showToast();
    imprimirDatos();
}
const verificarStorage = () => {
    let lista = JSON.parse(localStorage.getItem("Productos")) ?? [];
    return lista;
};
const blanquearCarrito = () => {
    while (contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.lastChild);
    }
};
const guardar = (id) => {
    leerContenidoProducto(id); 
    localStorage.setItem("Productos", JSON.stringify(verificarStorage() ?? JSON.stringify(productoCarrito)));
    imprimirDatos();
}

//Escucha eventos
buttonIniciarCompra.addEventListener("click", () => {
    swal("Esta funcionalidad no está disponible.", {
        buttons: false,
        timer: 3000,
    });
});
obtenerProductos();
imprimirDatos();



