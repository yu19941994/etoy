<template>
  <div id="app">
    <router-view/>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    console.log(process.env.VUE_APP_API)
  },
}
</script>

<style lang="scss">
@import "./assets/all"
</style>
