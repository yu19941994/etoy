<template>
    <div>
        <div class="d-flex justify-content-center mt-2 mb-2">
            <a href="#">
                <router-link to="/"><img src="../../assets/logo.png" alt="" width="300" class="img-fluid logo"></router-link>
            </a>
        </div>
        <nav class="header">
            <div class="container d-flex justify-content-center flex-wrap mb-md-2 ">   
                <router-link to="/">
                <a class="nav-link text-secondary px-4 mx-2 mx-lg-5"
                :class="{'active': choose === 'index'}" @click="choose='index'">
                    <b>關於拉庫</b></a>
                </router-link>
                <router-link to="/customerorders">
                <a class="nav-link text-secondary px-4 mx-2 mx-lg-5"
                :class="{'active': choose === 'about'}" @click="choose='about'">
                    <b>拉庫玩具</b></a>
                </router-link>
                <router-link to="/ticket">
                <a class="nav-link text-secondary px-4 mx-2 mx-lg-5"
                :class="{'active': choose === 'ticket'}" @click="choose='ticket'">
                    <b>好康優惠</b></a>
                </router-link>
                <router-link to="/login">
                <a class="nav-link text-secondary px-4 mx-2 mx-lg-5"
                :class="{'active': choose === 'backend'}" @click="choose='backend'">
                    <b>拉庫後台</b></a>
                </router-link>
                   
            
            
            </div>
        </nav>
       
    </div>
</template>

<script>
export default {
    data(){
        return{
            choose: ''
        }
    }
}
</script>