<template>
  <div id="login" class="login">
    <h2 class="title">Se connecter</h2>
    <msg :msg="msg" :class="css" :reset="reset"/>
    <label for="id"></label>
    <input class="input" placeholder="Email ou pseudo:" name="id" type="text" v-model="user.id">
    <label for="email"></label>
    <input class="input" placeholder="Mot de passe:" type="password" v-model="user.password">
    <button @click="login" class="connexion">Connexion</button>
  </div>
</template>

<script>
import msg from './CutomMsg'
export default {
  data(){
    return {
      user:{
        id: 'flexflax',
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
    },
    reset(){
      this.msg='';
      this.css= ''
    }
  },
  created(){
    this.$ebus.$on('logError')
  },
  updated(){
    console.log(this.msg);
  },
  components:{
    msg
  }
}
</script>

<style lang="scss" scoped>
  .login{
    width: 40%;
    min-width: 330px;
    border: 2px solid #273c75;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    h2{
        align-self: flex-start;
        width: 100%;
    }
  }
  .connexion{
        padding: 15px 20px;
        border-radius: 5px;
        background: #b2224b;
        min-width: 150px;
        border: 2px solid transparent;
        color: white;
        font-size: 23px;
        font-weight: 500;
        box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.6);
        cursor: pointer;
        &:hover{
            background: #FFF;
            border: 2px solid #b2224b;
            color: #b2224b
        }
    }
</style>

