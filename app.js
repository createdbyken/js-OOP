class Product {
    //Se crea la clase Product con un metodo constructor con parametros para cada elemento de
    //del formulario. De esta forma el programa identifica cada propiedad que se va a ejercer
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

//Este es un segundo objeto de la interfaz (User Interface) de la cual va a responder conforme el programa cumple
//con las funciones. Tendra metodos de los cuales serán quitar, mover etc
class UI {

    //Este metodo accede al DOM directamente para alterar las funciones de agregar productos
    addProduct(product) {
        const productList = document.getElementById('product-list') //Accedemos a nuestro div para mostrar elementos
        const element = document.createElement('div')
        element.innerHTML = `
            <div style="border-radius: 7px;" class="card shadow-sm text-center mb-4">
                <div class="card-body">
                    <strong>Nombre</strong>: ${product.name} 
                    <strong>Precio</strong>: $${product.price} MXN
                    <strong>Año</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Eliminar</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        this.resetForm();
    }

    //Reinicia el formulario despues de hacer submit
    resetForm(){
        document.getElementById('product-form').reset();
    }

    //Metodo para eliminar algún producto
    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove(); //los parent element son para subir de nivel al div del card y poder eliminarlo
            this.showMessage('Producto Eliminado!', 'primary');
        }
    }

    //Y un metodo para mostrar mensajes
    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message))

        //mostrar mensaje en el DOM
        const container = document.querySelector('.container')
        const app = document.querySelector('#app')
        container.insertBefore(div, app); //Inserta el mensaje antes de mi #app 

        setTimeout(function() {
            document.querySelector('.alert').remove()
        }, 3000);
    }
}


//Eventos del DOM
document.getElementById('product-form')
    .addEventListener('submit', function (e) {
        const name = document.getElementById('name').value;    //De esta forma podemos capturar el valor de cada input al momento de dar click a submit esto sucede por el evento listener de la app
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        const product = new Product(name, price, year); //Guarda nuestros valores dentro de una constante haciendolo un objeto completo        
        const ui = new UI(); // Se crea el objeto para UI

        if(name === '' || price === '' || year === ''){
            return ui.showMessage('Faltan algunos datos', 'danger')
        }

        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Producto agregado!', 'success');

        e.preventDefault()
    })

    //Agregamos un event listener en donde lee en donde el usuario da click al botón de eliminar
    document.getElementById('product-list').addEventListener('click', function(e){
        const ui = new UI();
        ui.deleteProduct(e.target);

    })