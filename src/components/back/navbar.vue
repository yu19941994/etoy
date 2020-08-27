<template>
    <nav class="navbar navbar-dark sticky-top bg-secondary flex-md-nowrap p-0 shadow">
    <router-link to="/"><a class="navbar-brand col-md-3 col-lg-2 mr-0 px-4 " href="#">ETOY拉庫</a></router-link>
    <ul class="navbar-nav px-3">
        <li class="nav-item px-2">
        <a class="nav-link text-white" href="#"
        @click.prevent="signout">登出</a>
        </li>
    </ul>
    </nav>
</template>

<script>
export default {
    name: 'Nabbar',
    methods: {
        signout(){
        const api = `${process.env.VUE_APP_API}/logout`;
        const vm = this;

        this.$http.post(api, vm.user).then((response => {
            console.log(response.data);
            if(response.data.success){
                vm.$router.push('/')
            }
        }))
    
        }
    }
}
</script>