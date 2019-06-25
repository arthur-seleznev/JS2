Vue.component('error', {
    data() {
        return {
            errorStr: ''
        }
    },
    methods: {
        setStr(text) {
            this.errorStr = text;
        }
    },
    template: `
        <div class="error-container" v-show="errorStr">
            <div class="error-modal">
                <p>{{errorStr}}</p>
                <button @click="setStr('')">Понятно...</button>
            </div>
        </div>
    `
});