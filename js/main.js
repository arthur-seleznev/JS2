const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    data: {
        productsUrl: '/catalogData.json',
        products: [],
        filtered: [],
        searchLine: '',
        isFilterOn: false,
        imgCatalog: `https://placehold.it/200x150`,


        cartUrl: '/getBasket.json',
        cartItems: [],
        isCartVisible: false,
    },

    computed: {
        calcCartQty() {
            return this.cartItems.reduce((totalQty, item) => totalQty + item.quantity, 0);
        },

        calcCartPrice() {
            return this.cartItems.reduce((totalAmount, item) => totalAmount + item.quantity * item.price, 0);
        }
    },

    methods: {
        getData(url) {
            return fetch(url ? url : `${API}/${this.url}`)
                .then(result => result.json())
                .catch(error => console.log(error));
        },

        removeFromCart(item) {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
        },

        addToCart(item) {
            let find = this.cartItems.find(find => find.id_product === item.id_product)
            if (find) {
                find.quantity += item.quantity;
            } else {
                this.cartItems.push(item);
            }
        },

        catalogFilter(value) {
            this.isFilterOn = true;
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    mounted() {
        this.getData(API + this.productsUrl)
            .then(data => {
                for (el of data) {
                    const product = Object.assign(el, {quantity: 1});
                    this.products.push(product);
                }
            });

        this.getData(API + this.cartUrl)
            .then(data => {
                for (el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    }
});


// class List {
//     constructor(url, container) {
//         this.container = container;
//         this.url = url;
//         this.data = [];
//         this.products = [];
//         this._init();
//     }
//
//     getData(url) {
//         return fetch(url ? url : `${API}/${this.url}`)
//             .then(result => result.json())
//             .catch(error => console.log(error));
//     }
//
//     handleData(data) {
//         this.data = [...data];
//         this.render();
//         console.log(this.products);
//     }
//
//     getProduct(id) {
//         return this.products.find(item => item.id_product === id);
//     }
//
//     render() {
//         let block = document.querySelector(this.container);
//         for(let item of this.data) {
//             const product = new lists[this.constructor.name](item);
//             console.log(product);
//             this.products.push(product);
//             block.insertAdjacentHTML("beforeend", product.render());
//         }
//     }
//
//     _init() {
//         return false;
//     }
// }
//
// class ProductsList extends List{
//     constructor(cart, url = "catalogData.json", container = '.products'){
//         super(url, container);
//         this.cart = cart;
//         this.getData()
//             .then(data => this.handleData(data));
//     }
//
//     _init() {
//         document.querySelector(this.container).addEventListener("click", e => {
//             if (e.target.classList.contains("btn-qty")) {
//                 const qtyBlock = e.target.parentNode.querySelector(".qty-caption");
//                 let qty = +qtyBlock.textContent;
//                 if (e.target.classList.contains("minus")) {
//                     if(qty !== 1) qty--;
//                 }
//                 else {
//                     if(qty !== 99) qty++
//                 }
//                 qtyBlock.textContent = qty;
//             }
//             else if (e.target.classList.contains("buy-btn")) {
//                 this.cart.addItem(
//                     this.getProduct(+e.target.parentElement.parentElement.dataset["id"]),
//                     +e.target.parentElement.querySelector(".qty-caption").textContent
//                 )
//             }
//         })
//     }
//
//     totalAmount() {
//         return this.allProducts.reduce((x, y) => x + y.price, 0); // добавлен метод подсчета суммарной стоимости товаров в каталоге
//     }
//
// }
//
// class ProductItem {
//     constructor(product, img = `https://placehold.it/200x150`){
//         this.id_product = product.id_product;
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.img = img;
//     }
//     render(){
//         return `<div class="product-item" data-id="${this.id_product}">
//                  <img src="${this.img}" alt="${this.product_name}">
//                  <div class="desc">
//                      <h3>${this.product_name}</h3>
//                      <p>${this.price}</p>
//                      <div class="qty-selection">
//                         <button class="btn-qty minus">-</button>
//                         <p class="qty-caption">1</p>
//                         <button class="btn-qty plus">+</button>
//                      </div>
//                      <button class="buy-btn">Купить</button>
//                  </div>
//              </div>`
//     }
// }
// class Cart extends List{
//     constructor(url = "getBasket.json", container = ".cart"){
//         super(url, container)
//         this.discount = 0; // персональная скидка
//         this.getData()
//             .then(data => {this.handleData(data.contents)});
//     }
//
//     _init() {
//         document.querySelector(".btn-cart").addEventListener("click",() => {
//             document.querySelector(this.container).classList.toggle("hidden");
//         });
//         document.querySelector(".cart").addEventListener("click", (e) => {
//             if (e.target.classList.contains("plus")) {
//                 this.addItem(this.getProduct(+e.target.parentElement.parentElement.dataset["id"]));
//             }
//             else if (e.target.classList.contains("minus")) {
//                 this.removeItem(this.getProduct(+e.target.parentElement.parentElement.dataset["id"]));
//             }
//             else if (e.target.classList.contains("deleteAll")){
//                 this.removeItem(this.getProduct(+e.target.parentElement.dataset["id"]), true);
//             }
//         });
//
//
//     }
//
//     addItem(product, qty = 1) { //добавление товара в корзину из каталога, по умолчанию 1 штуки
//         let item = this.getProduct(product.id_product);
//         if(item) {
//             item.quantity += qty;
//             this._updateCart(item);
//         }
//         else {
//             item = new CartItem(product);
//             item.quantity = qty;
//             this.data = [item];
//             this.render();
//         }
//     }
//
//     removeItem(product, deleteFullQty = false) { // удаление товара из корзины, по умолчанию 1 штуки
//         let item = this.getProduct(product.id_product);
//         if (product.quantity === 1) {deleteFullQty = true}
//         if (deleteFullQty) {
//             document.querySelector(`.cart-product[data-id="${product.id_product}"]`).remove();
//             this.products.splice(this.products.indexOf(item), 1);
//             this._updateCart();
//         }
//         else {
//             item.quantity--;
//             this._updateCart(item);
//         }
//     }
//
//     render() {
//         document.querySelector(".cart-totals").remove();
//         super.render();
//         document.querySelector(".cart").insertAdjacentHTML("beforeend",
//             '<div class="cart-totals"></div>');
//         this._updateCart();
//     }
//
//     _updateCart(product) {
//         if (product) {
//             document.querySelector(`.cart-product[data-id="${product.id_product}"]`)
//                 .querySelector(".qty-caption").textContent = product.quantity;
//             document.querySelector(`.cart-product[data-id="${product.id_product}"]`)
//                 .querySelector(".cart-product-amount").textContent = product.quantity * product.price;
//         }
//
//         if (this.products.length) {
//             document.querySelector(`.cart-totals`).innerHTML =
//                 `<p>Всего товаров: <span class="cart-totals-qty">${this._calcTotalQty()}</span></p>
//                  <p>Общая сумма: <span class="cart-totals-amount">${this._calcTotalAmount()}</span></p>`
//         }
//         else {
//             document.querySelector(".cart-totals").innerHTML = "<p>Корзина пуста.</p>";
//         }
//
//     }
//
//     _calcTotalQty() { //посчитать суммарное количество товаров в корзине
//         return this.products.reduce((totalQty, product) => totalQty + product.quantity, 0);
//     }
//
//     _calcTotalAmount() { //посчитать суммарную стоимость товаров в корзине
//         return this.products.reduce((totalAmount, product) => totalAmount + product.quantity * product.price, 0)
//     }
//
//     applyDiscount(discount) { // применить скидку к суммарной стоимости корзины
//
//     }
// }
//
// class CartItem extends ProductItem{ //Класс товара для корзины, наследованный от класса товара для каталога
//     constructor(product, img = `https://placehold.it/200x150`) {
//         super(product, img);
//         this.quantity = product.quantity;
//     }
//
//     render() { //Метод render() будет переопределен, так как в корзине товар будет отображаться иначе
//         return `
//         <div class="cart-product" data-id="${this.id_product}">
//             <img src="${this.img}" alt="${this.product_name}" class="cart-img">
//             <p class="cart-product-name">${this.product_name}</p>
//             <p class="cart-product-price">${this.price}</p>
//             <div class="qty-selection">
//                 <button class="btn-qty minus">-</button>
//                 <p class="qty-caption">${this.quantity}</p>
//                 <button class="btn-qty plus">+</button>
//             </div>
//             <p class="cart-product-amount">${this.price*this.quantity}</p>
//             <button class="btn-qty deleteAll">X</button>
//         </div>`
//     }
// }
//
// class Validator {
//     constructor(form) {
//         this.form = form;
//         this.templates = {
//             name: /^[a-zа-яё]+$/i,
//             tel: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
//             mail: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
//         }
//         this.errors = {
//             name: "Используйте в имени только буквы",
//             tel: "Телефон должен быть указан в формате +7(000)000-0000",
//             mail: "Допустимые адреса должны быть вида mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru"
//         }
//         this.valid = false;
//         this._checkForm();
//     }
//
//     _checkForm() {
//         let errors = [...this.form.querySelectorAll(`.error`)];
//         for (let error of errors) {
//             error.remove();
//         }
//
//         let fields = [...this.form.getElementsByTagName("input")];
//         for (let field of fields) {
//             this._checkField(field);
//         }
//
//         if (![...this.form.querySelectorAll('.invalid')].length) {
//             this.valid = true;
//         }
//     }
//
//     _checkField(field) {
//         if (this.templates[field.name]) {
//             console.log(field.name);
//             if (!this.templates[field.name].test(field.value)) {
//                 field.classList.add("invalid");
//                 this._addErrMsg(field);
//                 this._watchField(field);
//             }
//         }
//     }
//
//     _addErrMsg(field) {
//         field.insertAdjacentHTML("afterend", `<div class="error">${this.errors[field.name]}</div>`);
//     }
//
//     _watchField(field) {
//         field.addEventListener('input', () => {
//             let error = field.nextSibling;
//             if (error.classList) {
//                 if (this.templates[field.name].test(field.value)) {
//                     field.classList.remove('invalid');
//                     field.classList.add('valid');
//                     if (error) {
//                         error.remove()
//                     }
//                 } else {
//                     field.classList.remove('valid');
//                     field.classList.add('invalid');
//                     if (!error) {
//                         this._addErrMsg(field);
//                     }
//                 }
//             }
//         })
//     }
// }
//
// const lists = {
//     Cart: CartItem,
//     ProductsList: ProductItem
// }
//
// const cart = new Cart();
// const products = new ProductsList(cart);
//
// window.onload = () => {
//     document.querySelector(".feedback-form").addEventListener('submit', (e) => {
//         let valid = new Validator(document.querySelector(".feedback-form"));
//         if(!valid.valid){
//             e.preventDefault();
//         }
//     })
// }




