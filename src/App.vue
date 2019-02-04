<template>
  <div id="app">
    <!-- <h1 @click="test">teeeeeeeeest</h1> -->
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav'
import auth from './utils/auth.js'


export default {
  methods:{
    test(){
      auth.deleteLocalToken();
      this.$router.push({ name: `squatter` });
      console.log(this.isLogged);
    }
  },
  components: {
    Nav
  } 
}
</script>

<style lang="scss">
  $blue: #273c75;
  $red: #b2224b;
  $grey: #dcdde1;
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  #app {
    user-select : none;

    height: auto;
    font-family: 'Roboto', sans-serif;
    padding-left: 200px;
    color: $blue;
    background: $grey;
  }
  .input {
    border: 0;
    border-bottom: 1px solid $blue;
    font-size: 20px;
    height: 32px;
    color: $blue;
    padding-left: 13px;
    margin-bottom: 15px;
    width: 100%;
    max-width: 320px;;
  }
  input:focus {
    outline: none
  }
  .shadow{
    box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
  }
  .sexe{
    height: 32px;
    padding-left: 13px;
    line-height: 32px;
    margin-bottom: 15px;
  }
  .success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  .error {
    color: #b2224b !important;
    background-color: #f8d7da !important;
    border-color: #b2224b !important;
  }
  .warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  }
  // /* width /
     ::-webkit-scrollbar {
        width: 10px;
    }
    // / Track /
     ::-webkit-scrollbar-track {
        background: white;
        // border-radius: 10px
    }
    // / Handle /

     ::-webkit-scrollbar-thumb {
        background: $red;
        // border-radius: 10px
    }
    // / Handle on hover */
     ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .title{
    background: #273c75;
    color: white;
    // text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
    margin-bottom: 2%;
    padding: 10px;
    font-size: 30px;
    height: 24%;
  }

    @media screen and (max-width: 1024px) {
		#app{
      padding: 0;
      h1{
        text-align: center
      }
    }
	}
  @media screen  and (max-width: 680px) {
    #app{
      height: auto;
    }
  }
</style>

