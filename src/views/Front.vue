<template>
  <div class="Front">
    <Header></Header> 
    <router-view></router-view>
    <Cart></Cart>
    <Footer></Footer>
   
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/front/header';

import Footer from '../components/front/footer';
import Cart from '../components/front/cart';

export default {
  name: 'Front',
  components: {
    Header,
    Footer,
    Cart
  }
}
</script>
