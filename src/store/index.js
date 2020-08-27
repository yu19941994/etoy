import Vue from 'vue';
import Vuex from 'vuex';
import productsModules from './product.js';
import cartsModules from './cart.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: true,
        pagination:{}
    },
    actions: {
        updateLoading(context, status){
            context.commit('LOADING', status);
        }
    },
    mutations: {
        LOADING(state, status){
            state.isLoading = status;
        },
        PAGINATION(state, payload) {
            state.pagination = payload;
        }
    },
    getters: {
        isLoading: state => state.isLoading,
        pagination: state => state.pagination
    },
    modules: {
        productsModules,
        cartsModules
    }
});