
let especiero1 = {
    id: 1,
    articulo: "ESPECIERO CON BASE GIRATORIA - SPICY",
    precio: 510,
    imagen: "./assets/especiero.jpeg",
}

let especiero2 = {
    id: 2,
    articulo: "ESPECIEROS X 4 APILABLES - SPICY",
    precio: 460,
    imagen: "./assets/especiero-2.jpeg",
}

let salero = {
    id: 3,
    articulo: "SALERO PIMENTERO - CÁPSULA",
    precio: 120,
    imagen: "./assets/salero.jpeg",
}

let especiero3 = {
    id: 4,
    articulo: "ESPECIERO CON BASE - CAPSULA",
    precio: 580,
    imagen: "./assets/especiero-3.jpeg"
}

let cuchara = {
    id: 5,
    articulo: "CUCHARA PARA PASTA - PASTEL",
    precio: 270,
    imagen: "./assets/cuchara.jpeg"
}

let espumadera = {
    id: 6,
    articulo: "ESPUMADERA - PASTEL",
    precio: 270,
    imagen: "./assets/espumadera.jpeg"
}

var productos = []

productos.push(especiero1)
productos.push(especiero2)
productos.push(salero)
productos.push(especiero3)
productos.push(cuchara)
productos.push(espumadera)

let productosFiltrados = productos;

function coutas(cantidad, articulo, id) {
    let producto = productos.find(x => x.articulo === articulo);
    let precio = producto.precio / cantidad;
    let plata = document.getElementById(id);
    plata.innerHTML = cantidad + ' coutas de $' + precio;
}

$('#productos').fadeIn();

$('#search').on('click', () => {
    productosFiltrados = productos.filter(x => x.articulo.includes($('#inputSearch').val().toUpperCase()))
    renderObjects();
})

var carrito = []

const agregar = (prod, id) => {
    const agregar = document.getElementById(id)
    console.log(agregar.placeholder)
    if (agregar.placeholder === 'añadir') {
        const filtrado = productos.find(x => x.articulo.includes(prod));
        carrito.push(filtrado);
        agregar.placeholder = 'Eliminar';
        agregar.src = 'assets/trash.svg';
    } else {
        carrito.splice(carrito.findIndex(x => x.articulo === prod))
        agregar.placeholder = 'añadir';
        agregar.src = 'assets/cart-plus.svg';
    }
    foo()
}

var foo = () => {
    let carro = document.getElementsByClassName('carro')[0]
    carro.innerHTML = ''
    carrito.map((bar) => {
        carro.innerHTML += `
        <li class="container">
            <div class="flex-row d-flex justify-content-between align-items-center">
                <img src="${bar.imagen}" alt="" height="90px" width="120px">
                <p style="font-size: 13px;">${bar.articulo}</p>
                <p style="font-size: 16px;">$${bar.precio}</p>
            </div>
        </li>
        <li><hr class="dropdown-divider"></li>
        `
    })
    if (carrito.length !== 0) {
        let total = 0;
        carrito.forEach(x => total += parseInt(x.precio))
        carro.innerHTML += `
        <li class="container">
            <div class="flex-row d-flex justify-content-end align-items-center">
                <p style="font-size: 13px; margin-right: 2%">TOTAL</p>
                <p style="font-size: 16px;">$${total}</p>
            </div>
        </li>
        <li class="container d-flex justify-content-end">
            <button type="button" class="btn agregar">Finalizar compra</button>
        </li>
        `;
    }
}

const renderObjects = () => {
    let prodDiv = document.getElementById('productos')
    prodDiv.innerHTML = '';
    let row = document.createElement('div');
    row.classList = 'row row-cols-3';
    productosFiltrados.forEach(x => {
        row.innerHTML += `
        <div class="col principal">
            <div class="card">
                <img src="${x.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${x.articulo}</h5>
                    <p class="card-text" id="${x.id}">$${x.precio}</p>
                    <p>Coutas:</p>
                    <div class="flex-row d-flex justify-content-between">
                        <div class="btn-toolbar">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-secondary"
                                    onclick="coutas(1, ${x.articulo}, ${x.id})">x1</button>
                                <button type="button" class="btn btn-secondary"
                                    onclick="coutas(3, ${x.articulo}, ${x.id})">x3</button>
                                <button type="button" class="btn btn-secondary"
                                    onclick="coutas(6, ${x.articulo}, ${x.id})">x6</button>
                            </div>
                        </div>
                        <input type="image" placeholder="añadir" src="assets/cart-plus.svg" onclick="agregar('${x.articulo}', '${x.id}-btn')" id="${x.id}-btn" height=100% width=10%/>
                    </div>
                </div>
            </div>
        </div>
        `;
    })
    prodDiv.appendChild(row)
}

renderObjects();