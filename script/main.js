
class Producto{
    constructor(id, nombre, tipo, laboratorio, preciolista, stockdisponible){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.laboratorio = laboratorio;
        this.preciolista = preciolista;
        this.stockdisponible = stockdisponible;
    }

    precioventa(){
        return Math.round((this.preciolista * 121)) / 100;
    }
    venderProducto(){
        if (this.stockdisponible > 0) {
            this.stockdisponible = this.stockdisponible - 1;
        }else{
            console.log('No se cuenta con stock momentaneamente');
        }
    }
}


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


let productoarray = [];
let productoCarrito = [];
productoarray.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11);
let continua = prompt('Desea agregar un producto al carrito? y/n');

productoarray.forEach((el) => {console.log(`El medicamento "${el.nombre}" con código "${el.id}" es para el tipo de mascota: ${el.tipo}. Su precio final es de: $${el.precioventa()}.`)});
while (continua == 'y') {

    pedirCodigoYCargar();
    continua = prompt('Desea agregar un nuevo producto? y/n')
    
}

function pedirCodigoYCargar() {
    let productoAcomprar = prompt('Ingrese el código del producto a agregar al carrito');

    let encontrado = false;
    for (let index = 0; index < productoarray.length && encontrado == false; index++) {
        if (productoarray[index].id == productoAcomprar) {
            if (productoarray[index].stockdisponible > 0) {
                productoarray[index].venderProducto();
                productoCarrito.push(productoarray[index]);
                console.log('Agregado exitosamente.');
                encontrado = true;
            }else{
                console.log('Dicho producto no cuenta con stock.')
            }
        } else{
            if (index +1 == productoarray.length && encontrado == false) {
                console.log("Producto inexistente.")
            }
        }
    }
}


if (productoCarrito.length > 0 ) {
    console.log('Tu carrito contiene: ')
    let total = 0;
    for (let index = 0; index < productoCarrito.length; index++) {
        console.log(`Medicamento: ${productoCarrito[index].nombre} --> $ ${productoCarrito[index].precioventa()}`); 
        total = total + productoCarrito[index].precioventa();   
    }
    console.log(`El total es: $${total}`);
}else{
    console.log('Tu carrito contiene 0 productos.');
}
