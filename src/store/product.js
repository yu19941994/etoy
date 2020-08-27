
import axios from 'axios';

export default({
    strict: true,
    // state 屬於模組區域變數
    // actions、mutations、getters 屬於全域變數
    namespaced: true, //這樣可以讓所有 actions、mutations、getters 都改成區域變數
    state: {
        products:[],
        categories:{}
    },
    actions: {
        getProducts(context, page=1) {
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/products/?page=${page}`;
            context.commit('LOADING', true, { root: true });
            axios.get(api).then((response) => {
                context.commit('PRODUCTS', response.data.products);
                context.commit('CATEGORIES', response.data.products);
                context.commit('PAGINATION', response.data.pagination, { root: true });
                context.commit('LOADING', false, { root: true });
            })
        },
    },
    mutations: {
       PRODUCTS(state, payload){
           state.products = payload;
       },
       CATEGORIES(state, payload){
           const categories = new Set();
           payload.forEach((item) => {
               categories.add(item.category);
           });
           state.categories = Array.from(categories);
       }
    },
    getters: {
        categories(state) {
            return state.categories;
        },
        products(state) {
            return state.products;
        }
    }
});