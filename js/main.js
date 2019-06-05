class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.init();
    }
    init(){
        this._fetchProducts();
        this._render();
    }

    totalAmount() {
        return this.allProducts.reduce((x, y) => x + y.price, 0); // добавлен метод подсчета суммарной стоимости товаров в каталоге
    }

    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Keyboard', price: 55},
            {id: 4, title: 'Gamepad', price: 65},
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let item of this.data){
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn">Купить</button>
                 </div>
             </div>`
    }
}
class Cart {
    constructor(container = ".cart"){
        this.container = container;
        this.items = []; // массив товаров
        this.discount = 0; // персональная скидка

    }

    addItem(productItem, qty = 1) { //добавление товара в корзину из каталога, по умолчанию 1 штуки

    }

    removeItem(productItem, deleteFullQty = false) { // удаление товара из корзины, по умолчанию 1 штуки

    }

    calcTotalQty() { //посчитать суммарное количество товаров в корзине

    }

    calcTotalAmount() { //посчитать суммарную стоимость товаров в корзине

    }

    render() { // отрисовка корзины на странице

    }

    applyDiscount(discount) { // применить скидку к суммарной стоимости

    }
}

class CartItem extends ProductItem{ //Класс товара для корзины, наследованный от класса товара для каталога
    constructor(product, quantity) {
        super(product);
        this.quantity = quantity;
    }
    render() { //Метод render() будет переопределен, так как в корзине товар будет отображаться иначе

    }
}

const products = new ProductsList();
console.log(products.totalAmount());