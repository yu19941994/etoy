<template>
   <div>
        <Navbar></Navbar>
        <Alert></Alert>
        <div class="container-fluid">
        <div class="row">
            <Sidebar></Sidebar>

            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <router-view></router-view>
            </main>
        </div>
        </div>
   </div>
</template>

<script>
import Sidebar from '../components/back/sidebar';
import Navbar from '../components/back/navbar';
import Alert from '../components/AlertMessage';

export default {
    components: {
        Sidebar,
        Navbar,
        Alert
    }
}
</script>