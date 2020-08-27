import axios from 'axios';

export default ({
    strict: true,
    // state 屬於模組區域變數
    // actions、mutations、getters 屬於全域變數
    namespaced: true, 
    state:{
        carts: { carts: [] }
    },
    actions: {
        getCart(context) {
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            axios.get(api).then((response) => {
                context.commit('CARTS', response.data.data);

            });
        },
        addtoCart(context,{id, qty}) {
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const cart = {
                product_id: id,
                qty: qty
            }
            context.commit('LOADING', true, { root: true });
            axios.post(api, { data: cart }).then((response) => {
                context.commit('LOADING', false, { root: true });
                context.dispatch('getCart');
            })
        },
        removeCartItem(context,id) {
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            axios.delete(api).then((response) => {
                context.dispatch('getCart');
            });
        }
    },
    mutations: {
        CARTS(state, payload){
            state.carts = payload;
        }
    },
    getters: {
        carts(state){
            return state.carts;
        }
    }
})