// Declaración de clases
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

//Variables
let nodopadre = document.getElementById("contenedorPadre");
let productoarray = [];
let laboratoriosarray = [];
let tipoMascotasarray = [];
let productoCarrito = [];
let contenedorProductos = document.getElementById("listaCarrito");
let precioTotalCarrito = document.getElementById("precioTotalCarrito");
let cantidadEnCarrito = document.getElementById("cantidadEnCarrito");
let buttonIniciarCompra = document.getElementById("iniciarCompraBtn");
let limpiarFormProductos = document.getElementById("limpiarFormProductos");
let buscarProductos = document.getElementById("buscarProductos");
let tipo_mascota = document.getElementById("tipo_mascota");
let laboratorio = document.getElementById("laboratorio");

let totalCarrito = 0;

//Obtengo los productos del .json -> se obtendrían de un WS
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
//Obtengo los laboratorios del .json -> se obtendrían de un WS
const urlLaboratorios = '../script/laboratorios.json'; 
const obtenerLaboratorios = async ()=> {
    
    try {
        let response = await fetch(urlLaboratorios);
        laboratoriosarray = await response.json();
        cargarLaboratorios(laboratoriosarray);


    } catch (error) {
        console.log(error);
    }

}
//Obtengo los tipo de mascotas del .json  -> se obtendrían de un WS
const urlTipoMascotas = '../script/tipo_mascotas.json'; 
const obtenerTipoMascotas = async ()=> {
    
    try {
        let response = await fetch(urlTipoMascotas);
        tipoMascotasarray = await response.json();
        cargarMascotas(tipoMascotasarray);
    } catch (error) {
        console.log(error);
    }
}
//completo el select de tipo mascotas
function cargarMascotas(tipoMacotasArreglo) {
    tipoMacotasArreglo.forEach(element => {
        let tipoMascotasNuevo = document.createElement("option");
        tipoMascotasNuevo.setAttribute("value", element);
        let text = document.createTextNode(element);
        tipoMascotasNuevo.appendChild(text);
        tipo_mascota.appendChild(tipoMascotasNuevo);
    });
}

//completo el select de laboratorios
function cargarLaboratorios(laboratoriosArreglo) {
    laboratoriosArreglo.forEach(element => {
        let laboratoriosNuevo = document.createElement("option");
        laboratoriosNuevo.setAttribute("value", element);
        let text = document.createTextNode(element);
        laboratoriosNuevo.appendChild(text);
        laboratorio.appendChild(laboratoriosNuevo);
    });
}
//Formateo de los campos "importe"
function redondeo(numero) {
    return (Math.round((numero * 100)) / 100).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP"
    });; 
};
//Completo los productos.
function completarmercado(listaProductos) {
    blanquearMercado();
    if (listaProductos.length > 0) {
        for (const producto of listaProductos) {
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
                                        <button onclick="agregar('${producto.id}')" class="botonPersonalizado mt-1">Agregar</button>
                                        
                                    </div>
                                </div>`;
                nodopadre.classList = '';
                nodopadre.classList = 'd-flex flex-column align-content-center justify-content-start gap-4 flex-lg-row flex-lg-wrap mt-5';
                nodopadre.appendChild(nodo);
            }
            
        };
    }else{
        const sinproductos = document.createElement('div');
        sinproductos.innerHTML = '<h5 class="text-center">No se encontraron productos.</h5>';
        nodopadre.classList = '';
        nodopadre.classList.add("sinProducto");

        nodopadre.appendChild(sinproductos);
    };
}

function leerContenidoProducto(idProd){
    let id, nombre, tipo, laboratorio, cantidad, precioVenta, imgUrl;
    
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
        gravity: "bottom", 
        position: "center", 
        stopOnFocus: true,
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
const blanquearMercado = () =>{
    while (nodopadre.firstChild) {
        nodopadre.removeChild(nodopadre.lastChild);
    }
};
const agregar = (id) => {
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

limpiarFormProductos.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("laboratorio").value = "";
    document.getElementById("tipo_mascota").value = "";
    document.getElementById("nombreProducto").value = "";
    obtenerProductos();
});

buscarProductos.addEventListener("click", (e) => {
    e.preventDefault();
    let nombreProducto = document.getElementById("nombreProducto").value.trim().toLowerCase();
    let tipo_mascotaValor = tipo_mascota.value || null;
    let laboratorioValor = laboratorio.value || null;

    const productoFiltrado = [];
    productoarray.forEach(element => {
        if ((element.nombre).toLowerCase().includes(nombreProducto) &&  (element.tipo == tipo_mascotaValor || tipo_mascotaValor == null) && (element.laboratorio == laboratorioValor || laboratorioValor == null) ){
            productoFiltrado.push(element);
        } 
    });    
    completarmercado(productoFiltrado);
})

//Cargar Pantalla
obtenerLaboratorios();
obtenerTipoMascotas();
obtenerProductos();
imprimirDatos();



