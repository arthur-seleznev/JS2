Vue.component('products', {
    data(){
        return {
            productsUrl: '/catalogData.json',
            products: [],
            filtered: [],
            isFilterOn: false,
            imgCatalog: `https://placehold.it/200x150`,
        }
    },
    methods: {
        catalogFilter(value) {
            this.isFilterOn = true;
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getData(API + this.productsUrl)
            .then(data => {
                for (el of data) {
                    const product = Object.assign(el, {quantity: 1});
                    this.products.push(product);
                }
            });
    },
    template: `<div class="products">
        <product 
        v-for="product of products" 
        :key="product.id_product"
        :product="product"
        :img="imgCatalog">
        </product>
    </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item" v-if="!$root.$refs.products.isFilterOn || $root.$refs.products.filtered.includes(product)">
                <img :src="img" :alt="product.product_name">
                <div class="desc">
                    <h3>{{ product.product_name }}</h3>
                    <p>{{ product.price }}</p>
                    <div class="qty-selection">
                        <button class="btn-qty minus"
                                @click="product.quantity === 1 ? product.quantity = 1 : product.quantity--">-
                        </button>
                        <p class="qty-caption">{{ product.quantity }}</p>
                        <button class="btn-qty plus"
                                @click="product.quantity === 99 ? product.quantity = 99 : product.quantity++">+
                        </button>
                    </div>
                    <button class="buy-btn" @click="$root.$refs.cart.addToCart(product)">Купить</button>
                </div>
            </div>`
})