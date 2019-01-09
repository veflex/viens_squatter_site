<template>
    <nav id="nav" class="nav">
        <router-link :to="{name: 'home'}" ><img src="./../assets/img/Logo_final.svg" alt="logo viens squatter" class="logo"></router-link>
        <router-link :to="{name: 'squatter'}" tag="div" class="link">Squatter</router-link>
        <router-link :to="{name: 'recevoir'}" tag="div" class="link">Recevoir des Squatteurs</router-link>
        <router-link :to="{name: 'top'}" tag="div" class="link">TOP <br>Squatteur</router-link>
        <router-link v-if="!logged" :to="{name: 'connexion'}" tag="div" class="link">Connexion</router-link>
        <router-link v-if="logged" :to="{name: 'account'}" tag="div" class="link">Profil</router-link>
    </nav>
</template>

<script>
import auth from './../utils/auth.js'
export default {
    data(){
      return {
        logged: false
      }
    },
    methods: {
        isLogged(){
            this.logged = auth.isLoggedIn();
        }
    },
    created(){
        this.$ebus.$on('log', this.isLogged);
        this.isLogged();
    }
}
</script>

<style lang="scss" scoped>
    .nav{
        background: #273c75;
        border-right: 3px solid #b2224b;
        box-shadow: 10px 0px 24px #4d4d4dce;
        height: 100vh;
        left: 0;
        max-width: 200px;
        min-width: 200px;
        position: fixed;
        top: 0;
        width:13vw;
        z-index: 10;
    }
    .logo{
        margin-top: 40px;
        margin-bottom: 55px;
    }
    .link{
        align-items: center;
        background: #b2224b;
        border-radius: 5px;
        box-shadow: 0px 4px 20px 2px rgba(0, 0, 0, 0.65);
        color: white;
        cursor: pointer;
        display: flex;
        font-size: 25px;
        font-weight: bold;
        height: 80px;
        justify-content: center;
        margin-bottom: 20%;
        margin-left: -5%;
        text-align: center;
        width: 100%;
    }

    @media screen and (max-width: 768px) {
        .nav{
            left: -200px;
            box-shadow: none;
        }
    }
</style>

