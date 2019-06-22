Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            isCartVisible: false,
            imgCart: `https://placehold.it/50x100`
        }
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
        addToCart(product) {
            this.$parent.getData(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity += product.quantity;
                        } else {
                            this.cartItems.push(Object.assign({}, product));
                        }
                    } else {
                        console.log('error!')
                    }
                })
        },
        removeFromCart(product) {
            this.$parent.getData(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                    } else {
                        console.log('error!')
                    }
                })
        },
    },
    mounted() {
        this.$parent.getData(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
    <div v-show="isCartVisible" class="cart">
            <cart-item 
            v-for="item of cartItems" 
            :key="item.id_product"
            :img="imgCart"
            :cart-item="item"
            @remove="removeFromCart"></cart-item>
            <div class="empty-cart" v-if="!cartItems.length">Корзина пуста</div>
            <div class="cart-totals" v-else>
                <p>Всего товаров: {{ calcCartQty }}<br>
                Общая стоимость: {{ calcCartPrice }}</p>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-product" >
                    <img :src="img" alt="cartItem.product_name" class="cart-img">
                    <p class="cart-product-name">{{ cartItem.product_name }}</p>
                    <p class="cart-product-price">{{ cartItem.price }}</p>
                    <div class="qty-selection">
                        <button class="btn-qty minus" @click="cartItem.quantity === 1 ? cartItem.quantity = 1 : cartItem.quantity--">-
                        </button>
                        <p class="qty-caption">{{ cartItem.quantity }}</p>
                        <button class="btn-qty plus" @click="cartItem.quantity++">+</button>
                    </div>
                    <p class="cart-product-amount">{{ cartItem.price*cartItem.quantity }}</p>
                    <button class="btn-qty deleteAll" @click="$emit('remove', cartItem)">X</button>
            </div>`
})