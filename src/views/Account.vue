<template>
  <div id="account" class="account">
    <h1 @click="logOut(this)">Log out</h1>
    <h2>{{user}}</h2>
  </div>
</template>

<script>
import auth from './../utils/auth.js'
export default {
  data(){
    return {
      user: null
    }
  },
  methods:{
    logOut() {
      auth.logUserOut(this);
      this.$ebus.$emit('log')
    }
  },
  created(){
    this.user = JSON.parse(window.localStorage.getItem('user'))
  }
}
</script>

<style lang="scss" scoped>

</style>

