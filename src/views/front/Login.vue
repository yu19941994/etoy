<template>
  <div>
    <div class="d-flex justify-content-center mt-6 mb-3">
      <a href="#">
          <router-link to="/"><img src="../../assets/logo.png" alt="" width="300" class="img-fluid logo"></router-link>
      </a>
    </div>

    <div class="container d-flex justify-content-center mt-4">
    
    
      <form class="form-signin border border-black p-3" @submit.prevent="signin">  
          <h1 class="h3 mb-3 font-weight-normal text-center">後台登入</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" v-model="user.username"
          placeholder="Email address" required autofocus>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" v-model="user.password"
          placeholder="Password" required>
          <div class="checkbox my-3">
              <label>
                  <input type="checkbox" value="remember-me"> Remember me
              </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p class="mt-3 mb-3 text-muted copy-t">&copy; 2020 created by Yi-Hsien</p>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
        "username": "",
        "password": ""
        }
    }
  },

  methods: {
    signin(){
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      const vm = this;

      this.$http.post(api, vm.user).then((response => {
          if(response.data.success){
            vm.$router.push('/admin/products')
          }
      }))
    }
  }
}
</script>
