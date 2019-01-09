<template>
  <div id="login" class="login">
    <h1>Login</h1>
    <msg :msg="msg" :class="css"/>
    <label for="id"></label>
    <input class="input" placeholder="Email ou pseudo:" name="id" type="text" v-model="user.id">
    <label for="email"></label>
    <input class="input" placeholder="Mot de passe:" type="password" v-model="user.password">
    <button @click="login">click</button>
  </div>
</template>

<script>
import msg from './CutomMsg'
export default {
  data(){
    return {
      user:{
        id: 'alex@lul.fr',
        password: 'alex1201'
      },
      msg: '',
      css: ''
    } 
  },
  methods:{
    login(){
      // const status = this.checkLogin();
      // if (status) {
        this.$store
          .dispatch("user/login", this.user)
          .then(res => {
            console.log(res);
            this.$router.push({ name: `account` });
            this.$ebus.$emit('log')
          })
          .catch(err => {
            this.msg = err.response.data,
            this.css = 'error'
          });
      // }
    }
  },
  created(){
    this.$ebus.$on('logError')
  },
  components:{
    msg
  }
}
</script>

<style lang="scss" scoped>

</style>

