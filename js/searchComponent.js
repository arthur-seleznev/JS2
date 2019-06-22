Vue.component('search', {
   data() {
       return {
           searchLine: '',
       }
   },

    template: `
        <form action="#" method="post" @submit.prevent="$root.$refs.products.catalogFilter(searchLine)" class="search-form">
            <input type="text" v-model="searchLine" class="search-field">
            <button class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
});